var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Send all mentor and mentee questionnaire responses to chatgpt to generate matches
router.post("/", async function (req, res, next) {
  try {
    const mentorResponses = await getQuestionnaireResponses("mentors");
    const menteeResponses = await getQuestionnaireResponses("mentees");
    const matchResults = await generateMatches(
      mentorResponses,
      menteeResponses
    );

    res.json({ matchResults });

    // insert match results into database mentor_mentee table

    // for (let match of matchResults.matches) {
    //   const { mentor_id, mentee_id, compatibility_score, description } = match;

    //   const query =
    //     "INSERT INTO mentor_mentee (mentor_id, mentee_id, compatibility_score, compatibility_description) " +
    //     `VALUES ("${mentor_id}", "${mentee_id}", "${compatibility_score}", "${description}")`;

    //   await db(query);
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const getQuestionnaireResponses = async (tableName) => {
  try {
    const responses = await db(
      `SELECT id, q1, q2, q3, q4, q5, q6, q7 FROM ${tableName};`
    );

    return responses.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generateMatches = async (mentorResponses, menteeResponses) => {
  const formatDataSet = {
    // Create a questions table in the database for better scalability
    questions: {
      mentors: {
        q1: "Tell us about your career experience in tech and what technologies are you proficient in?",
        q2: "What are you most passionate about in your career?",
        q3: "What do you believe are the most important qualities of a successful mentor-mentee relationship?",
        q4: "What are you hoping to get out of being a mentor?",
        q5: "What would an ideal mentee profile look like for you?",
        q6: "What was your career before your time at CodeOp?",
        q7: "Are there any parts of your identity that might make you somebody’s role model? (eg: gender, ethnicity, sexual orientation, cultural background)?",
      },

      mentees: {
        q1: "What are your career goals? Is there a specific role in tech that you are interested in?",
        q2: "What would be your ideal mentor profile?",
        q3: "What do you believe are the most important qualities of a successful mentor-mentee relationship?",
        q4: "Are there any parts of your identity that you would like to see reflected in a mentor? (eg: gender, ethnicity, sexual orientation, cultural background)",
        q5: "What skills do you want to develop?",
        q6: "What was your career before joining CodeOp?",
        q7: "What do you hope to achieve through mentorship?",
      },
    },
    mentorResponses: mentorResponses,
    menteeResponses: menteeResponses,
  };

  try {
    const schemaExample = {
      matches: [
        {
          mentor_id: 2,
          mentee_id: 1,
          compatibility_score: 85,
          description: "Example description about compatibility.",
        },
      ],
      unmatched: {
        mentors: [1, 3],
      },
    };

    // ***** WARNING: Do not change the prompt. It is formatted to work with the chatgpt model... unless you want to change the model. *****
    const prompt = `
Based on the provided data for ${menteeResponses.length} mentees and ${
      mentorResponses.length
    } mentors, I need you to:

1. Analyze the responses and match each mentee to one mentor for a software engineering bootcamp.
2. Determine their compatibility using the given questions and answers.
3. Generate a compatibility score ranging from 1 to 100.
4. Craft a description, that's between 400-500 characters, explaining their compatibility.
5. Make sure every mentee is paired with only one mentor.
6. Crucially, include any unmatched mentor's ID in the 'unmatched mentors' section.
7. Provide the results in the following JSON structure: ${JSON.stringify(
      schemaExample
    )}
8. Do not include anything outside of the curly braces of the JSON object.
9. Ensure the returned results do not contain the original question answers.

It's essential to follow these guidelines strictly.
`;

    // const schema = {
    //   matches: [
    //     {
    //       mentor_id: "mentor_id",
    //       mentee_id: "mentee_id",
    //       compatibility_score: "compatibility_score an integer from 1-100",
    //       description: "description a string with a maximum of 500 characters",
    //     },
    //   ],
    //   unmatched: {
    //     mentors: [
    //       "An simple array of just ids of mentors that were not matched with a mentee. Neither question answers or a description of why they were not matched are not required.",
    //     ],
    //   },
    // };

    // const prompt = `return mentor and mentee matches for ${JSON.stringify(
    //   formatDataSet
    // )}. I want one mentor per mentee at a software engineering bootcamp. I want to match based on a compatibility score with a value from 1-100 and I want you to write a description of why they are compatible with a maximum of 500 characters. Don't include unmatched mentors in matches. I want you to give me the results in JSON with this format ${schema}. Since mentees should only be matched once,  the IDs of all unmatched mentors should be added to the unmatched mentors array. The question answers do not need to be included in the results.`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful mentor/mentee matcher." },
        { role: "user", content: prompt },
      ],
    });

    let parsedData;
    console.log(
      `This is all of my data ${response.data.choices[0].message.content}`
    );

    try {
      parsedData = JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
      console.error("Error parsing JSON: ", error);
      return;
    }

    return parsedData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TO DO
// BUG: escape ' in questionnaire responses
// BUG: escape " in questionnaire responses
// BUG: escape \ in questionnaire responses
// BUG: escape \n in questionnaire responses
// BUG: escape \r in questionnaire responses

module.exports = router;

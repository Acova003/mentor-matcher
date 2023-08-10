var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const openai = require("openai");

// .env imports
//
const apiKey = process.env.VITE_OPEN_AI_API_KEY;

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

const getQuestionnaireResponses = async (tableName) => {
  try {
    const responses = await db(
      `SELECT questionnaire_responses FROM ${tableName};`
    );
    return responses.data.map((entry) => entry.questionnaire_responses);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const generatePrompt = (mentorResponses, menteeResponses) => {
  const prompt = `Mentor: ${mentorResponses.join(
    "\nMentor: "
  )}\n\nMentee: ${menteeResponses.join("\nMentee: ")}`;
  return prompt;
};

const generateMatches = async (mentorResponses, menteeResponses) => {
  console.log();
  try {
    const prompt = `return mentor and mentee matches for ${generatePrompt(
      mentorResponses,
      menteeResponses
    )}. I want one mentor per mentee and one mentee per mentor at a software engineering bootcamp. I want to match based on the following criteria: I want a compatibility score with a value from 1-100 and a description of why their compatible with a maximum of 500 characters.`;

    const schema = {
      // mentee (student) id as key
      mentee_id: {
        // mentor id as key
        mentor_id: "number",
        // compatibility score as key
        compatibility_score: "number",
        // description of why they're compatible as key
        description: "string",
      },
    };

    const response = await openai.Completion.create({
      model: "gpt-3.5-turbo-0613",
      messages: [
        { role: "system", content: "You are a helpful mentor/mentee matcher." },
        { role: "user", content: prompt },
      ],
      functions: [{ name: "set_match_results", parameters: schema }],
      function_call: { name: "set_match_results" },
    });

    const generatedText =
      response.data.choices[0].message.function_call.arguments;
    const matchResults = JSON.parse(generatedText);

    return matchResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = router;

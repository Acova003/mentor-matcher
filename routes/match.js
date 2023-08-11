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
    console.log(responses.data.map((entry) => entry.questionnaire_responses));
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
  testPrompt = {
    mentors: [
      {
        mentor_id: 1,
        questions: [
          "Tell us about your programming experience.",
          "What technologies are you proficient in?",
          "How do you approach code optimization?",
          "What's your mentoring style?",
          // Add more questions
        ],
        answers: [
          "I have 10 years of experience in Java development.",
          "I'm proficient in Python, Django, and SQL.",
          "I focus on algorithm efficiency and minimizing database queries.",
          "I believe in hands-on, project-based learning.",
          // Add more answers
        ],
      },
      {
        mentor_id: 2,
        questions: [
          "Tell us about your programming experience.",
          "What technologies are you proficient in?",
          "How do you approach code optimization?",
          "What's your mentoring style?",
          // Add more questions
        ],
        answers: [
          "I have 5 years of experience in web development.",
          "I'm proficient in JavaScript, React, and Node.js.",
          "I prioritize clean code and reducing redundant operations.",
          "I prefer guiding mentees through real-world projects.",
          // Add more answers
        ],
      },
      // Add more mentors
    ],
    mentees: [
      {
        mentee_id: 1,
        questions: [
          "What are your goals in learning programming?",
          "Do you have any experience with version control?",
          "What projects have you worked on before?",
          "How do you handle debugging complex issues?",
          // Add more questions
        ],
        answers: [
          "I want to become a full-stack developer.",
          "Yes, I'm familiar with Git and GitHub.",
          "I've built a basic e-commerce website using React.",
          "I break down the problem and use debugging tools step by step.",
          // Add more answers
        ],
      },
      {
        mentee_id: 2,
        questions: [
          "What are your goals in learning programming?",
          "Do you have any experience with version control?",
          "What projects have you worked on before?",
          "How do you handle debugging complex issues?",
          // Add more questions
        ],
        answers: [
          "I aim to specialize in mobile app development.",
          "I've used Git for personal projects.",
          "I've created mobile apps using Flutter.",
          "I consult documentation and seek help from online communities.",
          // Add more answers
        ],
      },
      // Add more mentees
    ],
  };

  try {
    // const prompt = `return mentor and mentee matches for ${generatePrompt(
    //   mentorResponses,
    //   menteeResponses
    // )}. I want one mentor per mentee and one mentee per mentor at a software engineering bootcamp. I want to match based on the following criteria: I want a compatibility score with a value from 1-100 and a description of why their compatible with a maximum of 500 characters.`;

    const prompt = `return mentor and mentee matches for ${JSON.stringify(
      testPrompt
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

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful mentor/mentee matcher." },
        { role: "user", content: prompt },
      ],
      //   functions: [{ name: "set_match_results", parameters: schema }],
      //   function_call: { name: "set_match_results" },
    });

    const generatedText = response.data.choices[0].message.content;
    const matchResults = JSON.parse(generatedText);

    return matchResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = router;

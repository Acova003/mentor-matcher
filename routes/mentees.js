var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// const mysql = require("mysql2/promise");

const getAllMentees = async (req, res) => {
  try {
    const results = await db("SELECT * FROM mentees;");
    if (!results.data.length) {
      res.status(404).send({ msg: "There are no mentees. Please add one" });
    } else {
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

/* GET all mentees */
router.get("/", function (req, res, next) {
  getAllMentees(req, res);
});

// POST a new mentee

router.post("/", async function (req, res, next) {
  try {
    const { full_name, email, q1, q2, q3, q4, q5, q6, q7 } = req.body;

    const query =
      "INSERT INTO mentees (full_name, email, q1, q2, q3, q4, q5, q6, q7) " +
      `VALUES ("${full_name}", "${email}", "${q1}", "${q2}", "${q3}", "${q4}", "${q5}", "${q6}", "${q7}")`;

    const results = await db(query);
    res.status(200).send({ message: "Successfully added a mentee" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// router.post("/", async function (req, res, next) {
//   try {
//     const questionnaireResponses = JSON.stringify(
//       req.body.questionnaire_responses
//     );

//     const results = await db.execute(
//       "INSERT INTO mentees (full_name, email, questionnaire_responses) VALUES (?, ?, ?);",
//       [req.body.full_name, req.body.email, questionnaireResponses]
//     );

//     console.log(results); // Add this line to log the results

//     res.status(200).send({ message: "Successfully added a mentee" });
//   } catch (err) {
//     // res.status(500).send(err);
//     console.log(err);
//   }
// });

/* Get mentee by id */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const results = await db(`SELECT * FROM mentees WHERE id = ${id};`);
    if (!results.data.length) {
      res.status(404).send({ msg: "Mentee not found" });
    } else {
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/* PUT Update mentee by id */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { full_name, email, questionnaire_responses } = req.body;

  try {
    const results = await db(
      `UPDATE mentees SET full_name = "${full_name}", email = "${email}", questionnaire_responses = "${questionnaire_responses}" WHERE id = ${id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* DELETE mentee by id */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const results = await db(`DELETE FROM mentees WHERE id = ${id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// To do
// Add more error handling

module.exports = router;

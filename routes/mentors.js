const express = require("express");
const router = express.Router();
const db = require("../model/helper");

const getAllMentors = async (req, res) => {
  try {
    const results = await db("SELECT * FROM mentors;");
    if (!results.data.length) {
      res.status(404).send({ msg: "There are no mentors. Please add one" });
    } else {
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", function (req, res, next) {
  getAllMentors(req, res);
});

/* POST add one mentor */
router.post("/", async function (req, res, next) {
  try {
    const { full_name, email, q1, q2, q3, q4, q5, q6, q7 } = req.body;

    const query =
      "INSERT INTO mentors (full_name, email, q1, q2, q3, q4, q5, q6, q7) " +
      `VALUES ("${full_name}", "${email}", "${q1}", "${q2}", "${q3}", "${q4}", "${q5}", "${q6}", "${q7}")`;

    const results = await db(query);
    res.status(200).send({ message: "Successfully added a mentor" });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Get mentor by id */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const results = await db(`SELECT * FROM mentors WHERE id = ${id};`);
    if (!results.data.length) {
      res.status(404).send({ msg: "Mentor not found" });
    } else {
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/* PUT Updatementor by id */
router.put("/:id", async function (req, res, next) {
  const id = req.params.id;
  const { full_name, email, questionnaire_responses } = req.body;

  try {
    const results = await db(
      `UPDATE mentors SET full_name = "${full_name}", email = "${email}", questionnaire_responses = "${questionnaire_responses}" WHERE id = ${id};`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* DELETE mentor by id */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const results = await db(`DELETE FROM mentors WHERE id = ${id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

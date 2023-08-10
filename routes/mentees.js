var express = require("express");
var router = express.Router();
const db = require("../model/helper");

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

/* POST add one mentee */
router.post("/", async function (req, res, next) {
  try {
    const results = await db(
      `INSERT INTO mentees (is_current_student, full_name, email, password, profile_pic) VALUES (${req.body.is_current_student}, "${req.body.full_name}", "${req.body.email}", "${req.body.password}", "${req.body.profile_pic}");`
    );
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
  const { is_current_student, full_name, email, password, profile_pic } =
    req.body;

  try {
    const results = await db(
      `UPDATE mentees SET is_current_student = ${is_current_student}, full_name = "${full_name}", email = "${email}", password = "${password}", profile_pic = "${profile_pic}" WHERE id = ${id};`
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

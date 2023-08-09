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

module.exports = router;

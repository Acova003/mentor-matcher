var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const getAllMentors = async (req, res) => {
  try {
    const results = await db("SELECT * FROM mentors;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
};

/* GET all mentors */
router.get("/", function (req, res, next) {
  getAllMentors(req, res);
});

module.exports = router;

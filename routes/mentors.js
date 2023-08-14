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
    const {
      first_name,
      last_name,
      email,
      linkedin_url,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
    } = req.body;

    const query =
      "INSERT INTO mentors (first_name, last_name, email, linkedin_url, q1, q2, q3, q4, q5, q6, q7) " +
      `VALUES ("${first_name}", "${last_name}", "${email}", "${linkedin_url}, "${q1}", "${q2}", "${q3}", "${q4}", "${q5}", "${q6}", "${q7}")`;

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
  const {
    first_name,
    last_name,
    email,
    linkedin_url,
    q1,
    q2,
    q3,
    q4,
    q5,
    q6,
    q7,
  } = req.body;

  try {
    const results = await db(
      `UPDATE mentors SET first_name = "${first_name}", last_name = "${last_name}", email = "${email}", linkedin_url = "${linkedin_url}", q1 = "${q1}", q2 = "${q2}", q2 = "${q2}", q3 = "${q3}" , q4 = "${q4}", q5 = "${q5}", q6 = "${q6}", q7 = "${q7}" WHERE id = ${id};`
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
    await db(`DELETE FROM mentor_mentee WHERE mentor_id = ${id};`);
    const results = await db(`DELETE FROM mentors WHERE id = ${id};`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required if using SSL to connect to Heroku Postgres
  },
});

client
  .connect()
  .then(() => console.log("Connected to Heroku Postgres database"))
  .catch((err) =>
    console.error("Error connecting to Heroku Postgres database", err)
  );

const getAllMentors = async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM mentors;");
    if (!results.rows.length) {
      res.status(404).send({ msg: "There are no mentors. Please add one" });
    } else {
      res.send(results.rows);
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
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";

    const values = [
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
    ];

    await client.query(query, values);
    res.status(200).send({ message: "Successfully added a mentor" });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Get mentor by id */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const results = await client.query("SELECT * FROM mentors WHERE id = $1;", [
      id,
    ]);
    if (!results.rows.length) {
      res.status(404).send({ msg: "Mentor not found" });
    } else {
      res.send(results.rows);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/* PUT Update mentor by id */
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
    const query =
      "UPDATE mentors SET first_name = $1, last_name = $2, email = $3, linkedin_url = $4, q1 = $5, q2 = $6, q2 = $6, q3 = $7 , q4 = $8, q5 = $9, q6 = $10, q7 = $11 WHERE id = $12;";
    const values = [
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
      id,
    ];

    await client.query(query, values);
    res.send("Mentor updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

/* DELETE mentor by id */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    await client.query("DELETE FROM mentors WHERE id = $1;", [id]);
    res.send("Mentor deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

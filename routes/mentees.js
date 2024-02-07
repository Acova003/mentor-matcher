var express = require("express");
var router = express.Router();
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

const getAllMentees = async (req, res) => {
  try {
    const results = await client.query("SELECT * FROM mentees;");
    if (!results.rows.length) {
      res.status(404).send({ msg: "There are no mentees. Please add one" });
    } else {
      res.send(results.rows);
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
      "INSERT INTO mentees (first_name, last_name, email, linkedin_url, q1, q2, q3, q4, q5, q6, q7) " +
      `VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

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
    res.status(200).send({ message: "Successfully added a mentee" });
  } catch (err) {
    res.status(500).send(err);
  }
});

/* Get mentee by id */
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    const results = await client.query(`SELECT * FROM mentees WHERE id = $1;`, [
      id,
    ]);
    if (!results.rows.length) {
      res.status(404).send({ msg: "Mentee not found" });
    } else {
      res.send(results.rows);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/* PUT Update mentee by id */
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
      "UPDATE mentees SET first_name = $1, last_name = $2, email = $3, linkedin_url = $4, q1 = $5, q2 = $6, q2 = $6, q3 = $7 , q4 = $8, q5 = $9, q6 = $10, q7 = $11 WHERE id = $12;";
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
    res.send("Mentee updated successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

/* DELETE mentee by id */
router.delete("/:id", async function (req, res, next) {
  const id = req.params.id;
  try {
    await client.query("DELETE FROM mentees WHERE id = $1;", [id]);
    res.send("Mentee deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
});

// To do
// Add more error handling

module.exports = router;

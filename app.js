const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var menteesRouter = require("./routes/mentees");
var mentorsRouter = require("./routes/mentors");
var matchRouter = require("./routes/match");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/mentees", menteesRouter);
app.use("/api/mentors", mentorsRouter);
app.use("/api/generate-matches", matchRouter);

module.exports = app;

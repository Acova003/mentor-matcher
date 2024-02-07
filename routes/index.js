const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
var router = express.Router();

// Use CORS middleware
app.use(cors());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "client", "build")));

// Define routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app object
module.exports = app;

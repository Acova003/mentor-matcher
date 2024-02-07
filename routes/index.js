const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// Use CORS middleware
app.use(cors());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "client", "build")));

// Define routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Define other routes as needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

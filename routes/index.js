const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "client", "build")));

// Serve the index.html file as the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

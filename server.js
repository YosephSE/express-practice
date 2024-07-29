const express = require("express");
require("dotenv").config();
const path = require('path')
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.listen(PORT, () => console.log(`serving on port ${PORT}`));

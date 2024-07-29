const express = require("express");
require("dotenv").config();
const path = require('path')
const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`serving on port ${PORT}`));

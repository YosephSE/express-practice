const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const posts = require("./routes/posts");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/posts", posts);

app.listen(PORT, () => console.log(`serving on port ${PORT}`));

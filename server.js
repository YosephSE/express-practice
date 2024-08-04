const express = require("express");

const posts = require("./routes/posts");
const users = require("./routes/users");
const path = require("path");
const app = express();


app.use(express.json());
app.use("/api/posts", posts);
app.use("/api/users", users);

app.listen(process.env.PORT, () => console.log(`serving on port ${process.env.PORT}`));

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const posts = require("./routes/posts");




app.use("/api/posts", posts);

app.listen(PORT, () => console.log(`serving on port ${PORT}`));

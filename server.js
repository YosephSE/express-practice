const express = require("express");
// require("dotenv").config();
const path = require("path");
const app = express();
const PORT = process.env.PORT;

let posts = [
  {
    id: 1,
    text: "Post 1",
  },
  {
    id: 2,
    text: "Post 2",
  },
  {
    id: 3,
    text: "Post 3",
  },
  {
    id: 4,
    text: "Post 4",
  },
];

app.get("/api/posts", (req, res) => {
  const limit = req.query.limit || posts.length;

  console.log(limit);
  res.json(posts.slice(0, limit));
});

app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (posts.find((post) => post.id === id)) {
    return res.status(200).json(posts.find((post) => post.id === id));
  }
  res.status(404).json({ msg: "No post found" });
});

app.listen(PORT, () => console.log(`serving on port ${PORT}`));

const express = require("express");
const router = express.Router();
const connection = require("../mysql");

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

router.get("/", (req, res) => {
  console.log(req.query.limit);
  connection.query("SELECT * FROM posts", function (err, results) {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  connection.query("SELECT * FROM posts", function (err, posts) {
    if (err) throw err;
    if (posts.find((post) => post.id === id)) {
      return res.status(200).json(posts.find((post) => post.id === id));
    }
    res.status(404).json({ msg: "No post found" });
  });
});

module.exports = router;
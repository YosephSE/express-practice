const express = require("express");
const router = express.Router();
const connection = require("../mysql");

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

router.post("/add", (req, res) => {
  console.log(req.body);
  const { user, title, content } = req.body;

  connection.query(
    "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
    [user, title, content],
    (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ msg: "Error inserting data" });
      } else {
        res.status(201).json({ msg: "Success" });
      }
    }
  );
});

router.put("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const title = "PUT TITLE";
  const content = "PUT CONTENT";
  connection.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Unable to update post");
      }
      res.status(200).json({ msg: "Successfully Updated" });
    }
  );
});

module.exports = router;

const connection = require("../mysql");

const allPosts = (req, res) => {
  console.log(req.query.limit);
  connection.query("SELECT * FROM posts", function (err, results) {
    if (err) throw err;
    res.json(results);
  });
};

const singlePost = (req, res) => {
  const id = parseInt(req.params.id);
  connection.query("SELECT * FROM posts", function (err, posts) {
    if (err) throw err;
    if (posts.find((post) => post.id === id)) {
      return res.status(200).json(posts.find((post) => post.id === id));
    }
    res.status(404).json({ msg: "No post found" });
  });
};

const addPost = (req, res) => {
  console.log(req.body);
  const { user, title, content } = req.body;
  const time = new Date().getTime();

  connection.query(
    "INSERT INTO posts (user_id, title, content, publication_date) VALUES (?, ?, ?, ?)",
    [user, title, content, time],
    (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ msg: "Error inserting data" });
      } else {
        res.status(201).json({ msg: "Success" });
      }
    }
  );
};

const editPost = (req, res) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  connection.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Unable to update post");
      }
      res.status(201).json({ msg: "Successfully Updated" });
    }
  );
};

const deletePost = (req, res) => {
  const id = Number(req.params.id);
  connection.query("DELETE FROM posts WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Unable to delete post");
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(200).json({ msg: "Successfully deleted" });
  });
};

module.exports = { addPost, deletePost, singlePost, editPost, allPosts };

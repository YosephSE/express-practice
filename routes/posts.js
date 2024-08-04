const express = require("express");
const router = express.Router();

const {
  addPost,
  deletePost,
  singlePost,
  allPosts,
  editPost,
} = require("../controllers/postControllers");

router.get("/", allPosts);

router.get("/:id", singlePost);

router.post("/add", addPost);

router.put("/edit/:id", editPost);

router.delete("/delete/:id", deletePost);

module.exports = router;

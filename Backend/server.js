const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb+srv://jagtapkrishna987:5kA0Jaosy92EruIU@community.nilj4fs.mongodb.net/community_mindfullme?retryWrites=true&w=majority&appName=community")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Comment Schema
const commentSchema = new mongoose.Schema({
  name: String,
  text: String,
  time: Date,
  imageUrl: String, // optional: profile image for commenter
});

// Post Schema
const postSchema = new mongoose.Schema(
  {
    name: String,
    text: String,
    imageUrl: String, // profile image of poster
    tags: [String],
    likes: { type: Number, default: 0 },
    comments: { type: [commentSchema], default: [] },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

// Get all posts
app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const post = new Post({
      name: req.body.name,
      text: req.body.text,
      tags: req.body.tags || [],
      imageUrl: req.body.imageUrl || "", // store image
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Like a post
app.patch("/posts/:id/like", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Unable to like post" });
  }
});

// Add a comment to a post
app.post("/posts/:id/comment", async (req, res) => {
  try {
    const { name, text, imageUrl } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = { name, text, time: new Date(), imageUrl };
    post.comments.push(newComment);
    post.commentsCount = post.comments.length;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Unable to add comment" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

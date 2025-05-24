const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load env vars

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

// Connect to MongoDB Atlas (No deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Optional: Exit if DB fails
  });

// Schemas
const ReplySchema = new mongoose.Schema({
  name: String,
  text: String,
  imageUrl: String,
  userId: String,
  time: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: String,
  text: String,
  imageUrl: String,
  userId: String,
  time: { type: Date, default: Date.now },
  replies: [ReplySchema],
});

const PostSchema = new mongoose.Schema({
  name: String,
  text: String,
  tags: [String],
  imageUrl: String,
  userId: String,
  likes: [String],
  comments: [CommentSchema],
  savedBy: [String], 
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

// Routes

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const postsWithCounts = posts.map(post => ({
      ...post.toObject(),
      commentsCount: post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0),
      likes: post.likes.length,
    }));
    res.json(postsWithCounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create post
app.post('/api/posts', async (req, res) => {
  try {
    const { name, text, tags, imageUrl, userId } = req.body;
    const post = new Post({ name, text, tags: tags || [], imageUrl, userId, likes: [], comments: [] });
    await post.save();
    const postObject = post.toObject();
    postObject.commentsCount = 0;
    postObject.likes = 0;
    res.json(postObject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like toggle
app.patch('/api/posts/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const liked = post.likes.includes(userId);
    post.likes = liked ? post.likes.filter(id => id !== userId) : [...post.likes, userId];

    await post.save();

    const postObject = post.toObject();
    postObject.likes = post.likes.length;
    postObject.commentsCount = post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
    res.json(postObject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// Add comment
app.post('/api/posts/:id/comment', async (req, res) => {
  try {
    const { name, text, imageUrl, userId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ name, text, imageUrl, userId, replies: [] });
    await post.save();

    const postObject = post.toObject();
    postObject.likes = post.likes.length;
    postObject.commentsCount = post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
    res.json(postObject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Add reply
app.post('/api/posts/:postId/comments/:commentId/reply', async (req, res) => {
  try {
    const { name, text, imageUrl, userId } = req.body;
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.replies.push({ name, text, imageUrl, userId });
    await post.save();

    const postObject = post.toObject();
    postObject.likes = post.likes.length;
    postObject.commentsCount = post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
    res.json(postObject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add reply' });
  }
});

// Update post
app.patch('/api/posts/:id', async (req, res) => {
  try {
    const { userId, text, tags } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    if (text !== undefined) post.text = text;
    if (tags !== undefined) post.tags = tags;

    await post.save();

    const postObject = post.toObject();
    postObject.likes = post.likes.length;
    postObject.commentsCount = post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
    res.json(postObject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req, res) => {
  try {
    // Support userId from body (axios default) or query (fetch, etc)
    const userId = req.body?.userId || req.query?.userId;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (post.userId !== userId) return res.status(403).json({ error: 'Unauthorized' });

    // Use deleteOne() instead of remove() as remove() is deprecated
    await post.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});





app.patch('/api/posts/:id/save', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'User ID required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const alreadySaved = post.savedBy.includes(userId);
    if (alreadySaved) {
      post.savedBy = post.savedBy.filter(id => id !== userId);
    } else {
      post.savedBy.push(userId);
    }
    await post.save();

    const postObject = post.toObject();
    postObject.likes = post.likes.length;
    postObject.commentsCount = post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);
    postObject.savedBy = post.savedBy;
    res.json(postObject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle save' });
  }
});

// Get all posts saved by a user
app.get('/api/posts/saved/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ savedBy: req.params.userId }).sort({ createdAt: -1 });
    const postsWithCounts = posts.map(post => ({
      ...post.toObject(),
      commentsCount: post.comments.reduce((acc, c) => acc + 1 + c.replies.length, 0),
      likes: post.likes.length,
      savedBy: post.savedBy,
    }));
    res.json(postsWithCounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved posts' });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
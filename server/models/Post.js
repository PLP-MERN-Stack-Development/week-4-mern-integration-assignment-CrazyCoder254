const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    excerpt: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
    isPublished: { type: Boolean, default: false },
    featuredImage: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);

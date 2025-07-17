const Post = require('../models/Post');

// @desc Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create post
exports.createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      excerpt = '',
      tags = '',
      isPublished = false,
    } = req.body;

    const tagArray = typeof tags === 'string'
      ? tags.split(',').map(tag => tag.trim())
      : [];

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags: tagArray,
      isPublished: isPublished === 'true' || isPublished === true,
      author: req.user._id,
      featuredImage: req.file ? `/uploads/${req.file.filename}` : '',
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('🚨 CREATE POST ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};


// @desc Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.category = req.body.category || post.category;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add comment to a post (no author)
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      text,
    };

    post.comments.push(comment);
    await post.save();

    // No need to re-fetch or populate, just return the latest comment
    const newComment = post.comments[post.comments.length - 1];
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};

// @desc Search posts
exports.searchPosts = async (req, res) => {
  const { q } = req.query;

  try {
    const posts = await Post.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') },
      ],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments.author', 'name');

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json(post.comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Failed to get comments' });
  }
};


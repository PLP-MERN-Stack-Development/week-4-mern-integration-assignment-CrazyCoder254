const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
  getComments
} = require('../controllers/postController');

router.get('/:id/comments', getComments);  // ✅ GET comments
router.post('/:id/comments', protect, addComment);  // ✅ POST comment
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.post('/', protect, upload.single('image'), createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);



module.exports = router;

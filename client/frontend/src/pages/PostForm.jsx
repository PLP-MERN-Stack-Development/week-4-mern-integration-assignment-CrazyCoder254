import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    excerpt: '',
  });

  // ✅ Hardcoded categories from frontend
  const categories = [
    { _id: 'tech', name: 'Technology' },
    { _id: 'health', name: 'Health' },
    { _id: 'travel', name: 'Travel' },
    { _id: 'education', name: 'Education' },
    { _id: 'food', name: 'Food' },
  ];

  const [image, setImage] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        const p = res.data;
        setPost({
          title: p.title,
          content: p.content,
          category: p.category,
          tags: p.tags.join(','),
          excerpt: p.excerpt,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(post).forEach(([key, value]) => formData.append(key, value));
    if (image) formData.append('image', image);

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/posts/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/posts', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Auth token:', token);
      }

      navigate('/');
    } catch (err) {
      console.error('Error saving post:', err);
      alert('Failed to submit. Make sure you are logged in.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Post' : 'Create Post'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={post.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          className="w-full border p-2 rounded h-40"
          value={post.content}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="excerpt"
          placeholder="Excerpt"
          className="w-full border p-2 rounded"
          value={post.excerpt}
          onChange={handleChange}
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          className="w-full border p-2 rounded"
          value={post.tags}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border p-2 rounded"
          value={post.category}
          onChange={handleChange}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {id ? 'Update Post' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;

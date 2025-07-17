import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post._id} className="p-4 border rounded shadow hover:bg-gray-50 transition">
            <Link to={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.excerpt}</p>
              {post.featuredImage && (
                <img
                  src={`http://localhost:5000${post.featuredImage}`}
                  alt={post.title}
                  className="w-full max-h-60 object-cover mt-2 rounded"
                />
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;

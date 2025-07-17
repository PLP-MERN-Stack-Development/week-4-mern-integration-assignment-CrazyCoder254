import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load post', err);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading post...</p>;
  if (!post) return <p className="text-center mt-10 text-red-500">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {post.featuredImage && (
        <img
          src={`http://localhost:5000${post.featuredImage}`}
          alt="Post"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.createdAt).toLocaleDateString()} | {post.category?.name}
      </p>

      <div className="prose prose-lg mb-8">
        <p>{post.content}</p>
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="mb-6">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Comment Section */}
      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostDetails;

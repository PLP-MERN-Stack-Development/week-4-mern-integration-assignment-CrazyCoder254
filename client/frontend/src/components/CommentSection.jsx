import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [user, setUser] = useState(null); // Dummy auth for now

  const fetchComments = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/posts/${postId}/comments`);
    setComments(res.data || []);
  } catch (err) {
    console.error('Error fetching comments:', err);
  }
};


  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored on login
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setText('');
      setComments([...comments, res.data]);
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [postId]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>

      {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}

      <ul className="space-y-4 mb-4">
        {comments.map((comment) => (
          <li key={comment._id} className="bg-white p-3 rounded shadow">
            <p className="text-sm text-gray-600">
              <strong>{comment.author?.name || 'Anonymous'}:</strong> {comment.text}
            </p>
          </li>
        ))}
      </ul>

      {user ? (
        <form onSubmit={submitComment} className="mt-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
            required
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 italic">Login to leave a comment.</p>
      )}
    </div>
  );
};

export default CommentSection;

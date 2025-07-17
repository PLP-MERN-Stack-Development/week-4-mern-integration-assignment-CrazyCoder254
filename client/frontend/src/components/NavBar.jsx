import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 mb-6">
      <div className="max-w-5xl mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">My Blog</Link>
        <Link to="/create" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          + New Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4 mb-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Blogify</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <Link to="/create" className="text-gray-600 hover:text-blue-600">Create Post</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

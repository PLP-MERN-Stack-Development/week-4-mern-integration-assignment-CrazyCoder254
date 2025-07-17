import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';
import PostForm from './pages/PostForm';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div className="space-x-4">
          <Link to="/">Home</Link>
          {user && <Link to="/create">Create Post</Link>}
        </div>
        <div className="space-x-4">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>{user.name}</span>
              <button onClick={logout} className="ml-2 underline">Logout</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

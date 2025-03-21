import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Mock authentication service
const authenticateUser = async (username: string, password: string) => {
  return new Promise<{ success: boolean; token?: string; message: string }>((resolve) => {
    setTimeout(() => {
      if (username === 'admin@example.com' && password === 'adminpassword') {
        resolve({ success: true, token: 'mock-admin-token', message: 'Admin login successful' });
      } else if (username === 'user' && password === 'password') {
        resolve({ success: true, token: 'mock-user-token', message: 'User login successful' });
      } else {
        resolve({ success: false, message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const response = await authenticateUser(username, password);

    if (response.success) {
      localStorage.setItem('isAuthenticated', 'true');
      if (username === 'admin@example.com') {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin'); // Redirect to Admin Page
      } else {
        localStorage.setItem('isAdmin', 'false');
        navigate('/home'); // Redirect to Home Page
      }
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  };

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://drdo-backend-production.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Login successful, token:', data.token);
        setError('');
        navigate('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#056CA5] to-[#002B62] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <img src={logo} alt="DRDO-SSPL Logo" className="w-36 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-800">
          DRDO-SSPL
        </h2>
        <h3 className="text-xs font-semibold text-gray-800 mb-6">
          Grant-in-Aid Conferences/Seminars
          <div className='font-bold text-xl mt-2'>LogIn</div>
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#046BA4]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#046BA4]"
            required
          />
          <button
            type="submit"
            className="bg-[#046BA4] text-white font-medium py-2 rounded-full hover:bg-[#002B62] transition duration-300"
          >
            Log In
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;

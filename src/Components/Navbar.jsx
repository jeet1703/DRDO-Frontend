import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth tokens or session data here if needed
     // redirect to login page
    localStorage.removeItem('token'); // Clear token
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between">
      <div className="flex items-center text-black">
        <img src={logo} alt="Logo" className="w-12 h-12" />
        <h1 className="text-xl font-bold  ml-3">SSPL-DRDO Portal</h1>
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate('/home')}
          className=" font-medium hover:underline"
        >
          Home
        </button>
        <button
          onClick={() => navigate('/form')}
          className=" font-medium hover:underline"
        >
          Add Data
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className=" font-medium hover:underline"
        >
          View Data
        </button>
        <button
          onClick={handleLogout}
          className="text-red-600 font-medium hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

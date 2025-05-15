import React from 'react';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#056CA5] to-[#002B62] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Log In</h2>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#046BA4]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#046BA4]"
          />
          <button
            type="submit"
            className="bg-[#046BA4] text-white font-medium py-2 rounded-full hover:bg-[#002B62] transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

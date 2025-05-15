import React from 'react';
import logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#056CA5] to-[#002B62]">
      <img src={logo} alt="Logo" className="w-44 h-44 mb-6" />
      <h4 className="text-xl font-semibold text-white m-2 ">Log In</h4>
      <form className="flex flex-col items-center">
        <input type="email" placeholder="Email Address" className="text-center justify-center border p-1.5  m-2 rounded-md" />
        <input type="password" placeholder="Password" className="text-center border p-1.5  m-2 rounded-md" />
        <button type="submit" className="bg-[#046BA4] text-white p-2 px-8 my-8 rounded-full hover:bg-[#002B62] shadow-md shadow-[#002B62] hover:shadow-inner hover:shadow-[#06090c] transition-shadow duration-300">LogIn</button>
      </form>
    </div>
  );
};

export default Login;

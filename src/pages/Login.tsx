// File: frontend/src/pages/Login.tsx
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Username" className="border p-2 w-64" />
        <input type="password" placeholder="Password" className="border p-2 w-64" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
};
export default Login;
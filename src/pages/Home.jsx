// pages/Home.jsx
import React from "react";
import banner from "../assets/banner.jpg";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { AddIcon } from "../Components/icons/AddIcon";
import { PrintIcon } from "../Components/icons/PrintIcon";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
  <Navbar />

  {/* Hero Section */}
  <div className="flex-grow relative w-full h-[calc(100vh-150px)] bg-gradient-to-r from-[#02447C] to-[#046BA4] text-white flex flex-col items-center justify-center text-center shadow-md px-4">
    <h2 className="text-4xl font-bold mb-4">Welcome to DRDO ER / IPR Portal</h2>
    <p className="text-lg text-blue-100 mb-6">Securely manage and view internal records</p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        to="/form"
        className="bg-white text-[#046BA4] font-semibold py-2 px-6 rounded-full hover:bg-[#E6F4FA] transition"
      >
        Enter Data
      </Link>
      <Link
        to="/dashboard"
        className="bg-white text-[#046BA4] font-semibold py-2 px-6 rounded-full hover:bg-[#E6F4FA] transition"
      >
        View Data
      </Link>
    </div>
  </div>

  <Footer />
</div>

  );
};

export default Home;

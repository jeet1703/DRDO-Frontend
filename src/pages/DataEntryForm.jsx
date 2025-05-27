// src/pages/DataEntryForm.jsx
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const DataEntryForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    domainExpert: '',
    institute: '',
    dateOfSanction: '',
    status: '',
    cost: '',
    referenceNo: '',
    recommendation: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Submitted:', formData);
  //   alert('Form submitted successfully!');
  //   // Add API call here if needed
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('https://drdo-backend-production.up.railway.app/api/form/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      // Reset form after successful submit
      setFormData({
        projectTitle: '',
        domainExpert: '',
        institute: '',
        dateOfSanction: '',
        status: '',
        cost: '',
        referenceNo: '',
        recommendation: '',
      });
    } else {
      const errorData = await response.json();
      alert('Error: ' + (errorData.error || 'Failed to submit form'));
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
};


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="p-8 max-w-3xl mx-auto flex-grow">
        <h2 className="text-2xl font-semibold mb-6 text-[#02447C]">Enter New ER&IPR Project Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={formData.projectTitle}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="domainExpert"
            placeholder="Name of Domain Expert"
            value={formData.domainExpert}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="institute"
            placeholder="Institute/University"
            value={formData.institute}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="date"
            name="dateOfSanction"
            placeholder="Date of Sanction"
            value={formData.dateOfSanction}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="status"
            placeholder="Status (Ongoing/Completed)"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="cost"
            placeholder="Cost (with/without Extension)"
            value={formData.cost}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="referenceNo"
            placeholder="Reference Number"
            value={formData.referenceNo}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="recommendation"
            placeholder="Recommendation"
            value={formData.recommendation}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-[#02447C] text-white px-4 py-2 rounded hover:bg-[#035a8c] transition"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default DataEntryForm;
  
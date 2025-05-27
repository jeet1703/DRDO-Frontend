import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const DataEntryForm = () => {
  const [formData, setFormData] = useState({
    nomenclature: '',
    piName: '',
    coordinatingScientist: '',
    researchVertical: '',
    cost: '',
    sanctionedDate: '',
    durationAndPDC: '',
    labContact: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        setFormData({
          nomenclature: '',
          piName: '',
          coordinatingScientist: '',
          researchVertical: '',
          cost: '',
          sanctionedDate: '',
          durationAndPDC: '',
          labContact: '',
          status: '',
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
        <h2 className="text-2xl font-semibold mb-6 text-[#02447C]">Enter New DIA-KCOE Project Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="nomenclature" placeholder="Nomenclature" value={formData.nomenclature} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="piName" placeholder="Academia/Institute PI Name" value={formData.piName} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="coordinatingScientist" placeholder="Coordinating Lab Scientist" value={formData.coordinatingScientist} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="researchVertical" placeholder="Research Vertical" value={formData.researchVertical} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="cost" placeholder="Cost (in Lakhs)" value={formData.cost} onChange={handleChange} className="border p-2 w-full" />
          <input type="date" name="sanctionedDate" placeholder="Sanctioned Date" value={formData.sanctionedDate} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="durationAndPDC" placeholder="Duration & PDC" value={formData.durationAndPDC} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="labContact" placeholder="Lab/Contact Person" value={formData.labContact} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="status" placeholder="Status (Ongoing/Completed)" value={formData.status} onChange={handleChange} className="border p-2 w-full" />
          <button type="submit" className="bg-[#02447C] text-white px-4 py-2 rounded hover:bg-[#035a8c] transition">
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default DataEntryForm;

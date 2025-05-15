// File: frontend/src/pages/DataEntryForm.tsx
import React from 'react';

const DataEntryForm = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Enter Record</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Field 1" className="border p-2 w-full" />
        <input type="text" placeholder="Field 2" className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Submit</button>
      </form>
    </div>
  );
};

export default DataEntryForm;
// File: frontend/src/pages/Dashboard.tsx
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">Submitted Records</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Field 1</th>
            <th className="border p-2">Field 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Value 1</td>
            <td className="border p-2">Value 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

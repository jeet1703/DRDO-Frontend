// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`https://drdo-sspl-backend-production.up.railway.app/api/dashboard/`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, status: newStatus } : proj
      )
    );

    const project = projects.find((p) => p.id === id);
    fetch(`https://drdo-sspl-backend-production.up.railway.app/api/dashboard/update/${project.letterNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.error("Status update failed:", err));
  };

  const handleCommentsChange = (id, newComment) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, commentsGivenBy: newComment } : proj
      )
    );
  };

  const handleSendComment = (id) => {
    const project = projects.find((p) => p.id === id);
    if (project.commentsGivenBy?.trim() === "") {
      alert("Please enter a comment before sending.");
      return;
    }

    fetch(`https://drdo-sspl-backend-production.up.railway.app/api/dashboard/update/${project.letterNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentsGivenBy: project.commentsGivenBy }),
    })
      .then((res) => res.json())
      .then(() => {
        alert(`Comment sent for subject "${project.subject}":\n${project.commentsGivenBy}`);
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === id ? { ...proj, commentsGivenBy: "" } : proj
          )
        );
      })
      .catch((err) => console.error("Comment update failed:", err));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="p-8 flex-grow max-w-full overflow-x-auto">
        <h2 className="text-3xl font-semibold mb-6 text-[#02447C]">
          Grant-in-Aid Conferences / Seminars
        </h2>

        <table className="w-full border text-sm bg-white shadow table-auto min-w-[1000px]">
          <thead className="bg-[#02447C] text-white">
            <tr>
              <th className="border p-2">S.No.</th>
              <th className="border p-2">Date of Opened</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Letter No.</th>
              <th className="border p-2">Dated</th>
              <th className="border p-2">Comments given by</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Amount Sanction (in ₹)</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="hover:bg-blue-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{project.dateOfOpened}</td>
                <td className="border p-2">{project.subject}</td>
                <td className="border p-2">{project.letterNo}</td>
                <td className="border p-2">{project.dated}</td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={project.commentsGivenBy || ""}
                      onChange={(e) =>
                        handleCommentsChange(project.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 w-full"
                      placeholder="Add comment"
                    />
                    <button
                      onClick={() => handleSendComment(project.id)}
                      className="bg-[#02447C] text-white px-3 rounded hover:bg-[#035a8c] transition"
                    >
                      Send
                    </button>
                  </div>
                </td>
                <td className="border p-2">
                  <select
                    value={project.status}
                    onChange={(e) =>
                      handleStatusChange(project.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="Recommended">Recommended</option>
                    <option value="Non-recommended">Non-recommended</option>
                  </select>
                </td>
                <td className="border p-2">{project.amountSanction}</td>
                <td className="border p-2 text-center text-gray-400">–</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

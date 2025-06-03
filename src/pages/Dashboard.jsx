import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { BASE_URL } from "../Config";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [site, setSite] = useState("drdo_portal");

  useEffect(() => {
    const storedSite = localStorage.getItem("site") || "drdo_portal";
    setSite(storedSite);

    // Corrected: dynamically fetch from dashboard path with storedSite
    fetch(`${BASE_URL}/api/dashboard/${storedSite}/`)
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
    if (!project) return;

    // Corrected: use /api/dashboard/<site>/update
    fetch(`${BASE_URL}/api/dashboard/${site}/update/${project.referenceNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Status update failed:", err));
  };

  const handleSendComment = (id) => {
    const project = projects.find((p) => p.id === id);
    if (!project || project.comments.trim() === "") {
      alert("Please enter a comment before sending.");
      return;
    }

    fetch(`${BASE_URL}/api/dashboard/${site}/update/${project.referenceNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: project.comments }),
    })
      .then((res) => res.json())
      .then(() => {
        alert(
          `Comment sent for "${project.nomenclature}":\n${project.comments}`
        );
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === id ? { ...proj, comments: "" } : proj
          )
        );
      })
      .catch((err) => console.error("Comment update failed:", err));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="p-8 flex-grow max-w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#02447C]">
          Submitted DIA-KCOE Project Records
        </h2>
        <table className="w-full border text-sm bg-white shadow table-auto min-w-[1100px]">
          <thead className="bg-[#02447C] text-white">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Nomenclature</th>
              <th className="border p-2">Academia/Institute</th>
              <th className="border p-2">PI Name</th>
              <th className="border p-2">Coordinating Lab Scientist</th>
              <th className="border p-2">Research Vertical</th>
              <th className="border p-2">Cost in Lakhs</th>
              <th className="border p-2">Sanctioned Date</th>
              <th className="border p-2">Duration & PDC</th>
              <th className="border p-2">Stake Holding Lab/Contact</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Comments</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id} className="hover:bg-blue-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{project.nomenclature}</td>
                <td className="border p-2">{project.institute}</td>
                <td className="border p-2">{project.domainExpert}</td>
                <td className="border p-2">{project.recommendation}</td>
                <td className="border p-2">{project.researchVertical}</td>
                <td className="border p-2">{project.cost}</td>
                <td className="border p-2">{project.dateOfSanction}</td>
                <td className="border p-2">{project.durationPDC}</td>
                <td className="border p-2">{project.stakeHolderLab}</td>
                <td className="border p-2">
                  <select
                    value={project.status}
                    onChange={(e) =>
                      handleStatusChange(project.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="In Process">In Process</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="border p-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={project.comments}
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
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => alert(`Viewing ${project.nomenclature}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => alert(`Deleting ${project.nomenclature}`)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
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

// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { BASE_URL } from "../Config"; // Ensure you have BASE_URL defined correctly
import { usePDF } from "react-to-pdf";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [site, setSite] = useState("drdo_portal");
  const [comments, setComments] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const { toPDF, targetRef } = usePDF({
    filename: "project-report.pdf",
    page: { margin: 20, format: "A4" },
  });

  useEffect(() => {
    const storedSite = localStorage.getItem("site") || "drdo_portal";
    setSite(storedSite);

    fetch(`${BASE_URL}/api/dashboard/${storedSite}/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        const initComments = {};
        data.forEach((proj) => {
          initComments[proj.id] = proj.comments || "";
        });
        setComments(initComments);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setProjects(updated);

    if (isFiltered) {
      setFilteredProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    }

    const project = projects.find((p) => p.id === id);
    if (!project) return;

    fetch(`${BASE_URL}/api/dashboard/${site}/update/${project.referenceNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => console.error("Status update failed:", err));
  };

  const handleCommentChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendComment = (id) => {
    const project = projects.find((p) => p.id === id);
    if (!project || !comments[id]?.trim()) {
      alert("Please enter a comment before sending.");
      return;
    }

    fetch(`${BASE_URL}/api/dashboard/${site}/update/${project.referenceNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: comments[id] }),
    })
      .then((res) => res.json())
      .then(() => {
        alert(`Comment sent for "${project.nomenclature || project.projectTitle}"`);
        setProjects((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, comments: comments[id] } : p
          )
        );
        if (isFiltered) {
          setFilteredProjects((prev) =>
            prev.map((p) =>
              p.id === id ? { ...p, comments: comments[id] } : p
            )
          );
        }
        setComments((prev) => ({ ...prev, [id]: "" }));
      })
      .catch((err) => console.error("Comment update failed:", err));
  };

  const filterProjectsByDate = () => {
    if (!dateRange.start || !dateRange.end) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(dateRange.start);
    const end = new Date(dateRange.end);

    if (start > end) {
      alert("Start date cannot be after end date.");
      return;
    }

    const filtered = projects.filter((p) => {
      const projDate = new Date(p.createdAt || p.dateOfSanction);
      return projDate >= start && projDate <= end;
    });

    setFilteredProjects(filtered);
    setIsFiltered(true);
  };

  const resetDateFilter = () => {
    setDateRange({ start: "", end: "" });
    setIsFiltered(false);
    setFilteredProjects([]);
  };

  const generatePdf = (project) => {
    setSelectedProject(project);
    setTimeout(() => toPDF(), 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="p-8 flex-grow max-w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#02447C]">
          Submitted Project Records
        </h2>

        {/* Date Filter */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label>From:</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>To:</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={filterProjectsByDate}
            className="bg-[#02447C] text-white px-4 py-1 rounded hover:bg-[#035a8c] transition"
          >
            Filter
          </button>
          {isFiltered && (
            <button
              onClick={resetDateFilter}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600 transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* Table */}
        <table className="w-full border text-sm bg-white shadow table-auto min-w-[1100px]">
          <thead className="bg-[#02447C] text-white">
            <tr>
              <th className="border p-2">S.No.</th>
              <th className="border p-2">Project Title</th>
              <th className="border p-2">Domain Expert</th>
              <th className="border p-2">Institute</th>
              <th className="border p-2">Sanction Date</th>
              <th className="border p-2">Cost</th>
              <th className="border p-2">Ref No.</th>
              <th className="border p-2">Recommendation</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Comments</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isFiltered ? filteredProjects : projects).map((project, index) => (
              <tr key={project.id} className="hover:bg-blue-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{project.projectTitle || project.nomenclature}</td>
                <td className="border p-2">{project.domainExpert}</td>
                <td className="border p-2">{project.institute}</td>
                <td className="border p-2">{project.dateOfSanction}</td>
                <td className="border p-2">{project.cost}</td>
                <td className="border p-2">{project.referenceNo}</td>
                <td className="border p-2">{project.recommendation}</td>
                <td className="border p-2">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="In Process">In Process</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="border p-2">
                  <div className="flex flex-col gap-1">
                    {project.comments && (
                      <div className="text-xs p-1 bg-gray-100 rounded">{project.comments}</div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={comments[project.id] || ""}
                        onChange={(e) => handleCommentChange(project.id, e.target.value)}
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
                  </div>
                </td>
                <td className="border p-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => generatePdf(project)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                    >
                      PDF
                    </button>
                    <button
                      onClick={() => alert(`Viewing ${project.projectTitle || project.nomenclature}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => alert(`Deleting ${project.projectTitle || project.nomenclature}`)}
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

        {/* Hidden PDF content */}
        <div ref={targetRef} style={{ position: "absolute", left: "-9999px", width: "210mm" }} className="p-8 bg-white">
          {selectedProject && (
            <div className="space-y-4">
              <h1 className="text-xl font-bold text-center">Project Report</h1>
              <p><strong>Title:</strong> {selectedProject.projectTitle || selectedProject.nomenclature}</p>
              <p><strong>Institute:</strong> {selectedProject.institute}</p>
              <p><strong>Domain Expert:</strong> {selectedProject.domainExpert}</p>
              <p><strong>Date of Sanction:</strong> {selectedProject.dateOfSanction}</p>
              <p><strong>Cost:</strong> {selectedProject.cost}</p>
              <p><strong>Reference No.:</strong> {selectedProject.referenceNo}</p>
              <p><strong>Status:</strong> {selectedProject.status}</p>
              <p><strong>Comments:</strong> {selectedProject.comments}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

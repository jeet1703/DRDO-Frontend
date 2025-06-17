import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { BASE_URL } from "../Config";
import { usePDF } from 'react-to-pdf';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [site, setSite] = useState("drdo_portal");
  const [comments, setComments] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  
  const { toPDF, targetRef } = usePDF({
    filename: 'project-report.pdf',
    page: {
      margin: 20,
      format: 'A4'
    }
  });

  useEffect(() => {
    const storedSite = localStorage.getItem("site") || "drdo_portal";
    setSite(storedSite);

    fetch(`${BASE_URL}/api/dashboard/${storedSite}/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        const commentsInit = {};
        data.forEach(project => {
          commentsInit[project.id] = project.comments || "";
        });
        setComments(commentsInit);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedProjects = projects.map((proj) =>
      proj.id === id ? { ...proj, status: newStatus } : proj
    );
    setProjects(updatedProjects);

    if (isFiltered) {
      const updatedFilteredProjects = filteredProjects.map((proj) =>
        proj.id === id ? { ...proj, status: newStatus } : proj
      );
      setFilteredProjects(updatedFilteredProjects);
    }

    const project = projects.find((p) => p.id === id);
    if (!project) return;

    fetch(`${BASE_URL}/api/dashboard/${site}/update/${project.referenceNo}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .catch((err) => console.error("Status update failed:", err));
  };

  const handleCommentChange = (id, value) => {
    setComments(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSendComment = (id) => {
    const project = projects.find((p) => p.id === id);
    if (!project || !comments[id] || comments[id].trim() === "") {
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
        alert(`Comment sent for "${project.nomenclature}":\n${comments[id]}`);
        const updatedProjects = projects.map(proj =>
          proj.id === id ? { ...proj, comments: comments[id] } : proj
        );
        setProjects(updatedProjects);

        if (isFiltered) {
          const updatedFilteredProjects = filteredProjects.map(proj =>
            proj.id === id ? { ...proj, comments: comments[id] } : proj
          );
          setFilteredProjects(updatedFilteredProjects);
        }

        setComments(prev => ({
          ...prev,
          [id]: ""
        }));
      })
      .catch((err) => console.error("Comment update failed:", err));
  };

  const filterProjectsByDate = () => {
    if (!dateRange.start || !dateRange.end) {
      alert('Please select both start and end dates');
      return;
    }

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    if (startDate > endDate) {
      alert('Start date cannot be after end date');
      return;
    }

    const filtered = projects.filter(project => {
      const projectDate = new Date(project.createdAt || project.dateOfSanction);
      return projectDate >= startDate && projectDate <= endDate;
    });

    setFilteredProjects(filtered);
    setIsFiltered(true);
  };

  const resetDateFilter = () => {
    setDateRange({ start: '', end: '' });
    setIsFiltered(false);
    setFilteredProjects([]);
  };

  const generatePdf = (project) => {
    setSelectedProject(project);
    setTimeout(() => {
      toPDF();
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="p-8 flex-grow max-w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4 text-[#02447C]">
          Submitted DIA-KCOE Project Records
        </h2>
        
        {/* Date Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label>From:</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <label>To:</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
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
            {(isFiltered ? filteredProjects : projects).map((project, index) => (
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
                  <div className="flex flex-col gap-1">
                    {project.comments && (
                      <div className="text-xs p-1 bg-gray-100 rounded">
                        {project.comments}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={comments[project.id] || ""}
                        onChange={(e) =>
                          handleCommentChange(project.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Add new comment"
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

        {/* PDF Template (positioned off-screen) */}
        <div 
          ref={targetRef} 
          style={{ position: 'absolute', left: '-9999px', width: '210mm' }}
          className="p-8 bg-white"
        >
          {selectedProject && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-[#02447C]">PROJECT REPORT</h1>
                <h2 className="text-xl font-semibold">{selectedProject.nomenclature}</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <p className="font-semibold">Reference Number:</p>
                  <p>{selectedProject.referenceNo || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Status:</p>
                  <p>{selectedProject.status}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Academia/Institute:</p>
                  <p>{selectedProject.institute || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">PI Name:</p>
                  <p>{selectedProject.domainExpert || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Coordinating Lab Scientist:</p>
                  <p>{selectedProject.recommendation || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Research Vertical:</p>
                  <p>{selectedProject.researchVertical || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Cost (in Lakhs):</p>
                  <p>{selectedProject.cost || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Sanctioned Date:</p>
                  <p>{selectedProject.dateOfSanction || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Duration & PDC:</p>
                  <p>{selectedProject.durationPDC || 'N/A'}</p>
                </div>
                <div className="border-b pb-2">
                  <p className="font-semibold">Stake Holding Lab/Contact:</p>
                  <p>{selectedProject.stakeHolderLab || 'N/A'}</p>
                </div>
              </div>

              {selectedProject.comments && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold border-b pb-1">Comments:</h3>
                  <p className="whitespace-pre-line mt-2">{selectedProject.comments}</p>
                </div>
              )}

              <div className="mt-8 text-sm text-gray-500 text-right">
                <p>Generated on: {new Date().toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
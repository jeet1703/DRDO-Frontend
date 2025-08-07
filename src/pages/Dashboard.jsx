  // src/pages/Dashboard.jsx
  import React, { useState, useEffect } from "react";
  import Navbar from "../Components/Navbar";
  import Footer from "../Components/Footer";
  import { BASE_URL } from "../Config";
  import { usePDF } from "react-to-pdf";

  const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [site, setSite] = useState("drdo_portal");
    const [comments, setComments] = useState({});
    const [selectedProject, setSelectedProject] = useState(null);

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
          console.log("Fetched projects:", data);
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
  const newComment = comments[id]?.trim();

  if (!project || !newComment) {
    alert("Please enter a comment before sending.");
    return;
  }

  fetch(`${BASE_URL}/api/dashboard/${site}/add-comment/${project.referenceNo}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comment: newComment }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`Comment saved for "${project.nomenclature || project.projectTitle}"`);

      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, comments: data.comments } : p
        )
      );

      // Clear input field
      setComments((prev) => ({ ...prev, [id]: "" }));
    })
    .catch((err) => {
      console.error("Failed to save comment:", err);
    });
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

          {/* Table */}
          <table className="w-full border text-sm bg-white shadow table-auto min-w-[1100px]">
            <thead className="bg-[#02447C] text-white">
              <tr>
                <th className="border p-2">S.No.</th>
                <th className="border p-2">Project Title</th>
                <th className="border p-2">Domain Expert</th>
                <th className="border p-2">Institute</th>
                <th className="border p-2">Sanction Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Cost</th>
                <th className="border p-2">Ref No.</th>
                <th className="border p-2">Recommendation</th>
                <th className="border p-2">Status</th>
                {/* <th className="border p-2">Comments</th> */}
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr key={project.id} className="hover:bg-blue-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{project.projectTitle}</td>
                  <td className="border p-2">{project.domainExpert}</td>
                  <td className="border p-2">{project.institute}</td>
                  <td className="border p-2">{project.dateOfSanction}</td>
                  <td className="border p-2">{project.status}</td>
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
                    {/* <div className="flex flex-col gap-1">
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
                    </div> */}
                  </td>
                  <td className="border p-2">
                    <div className="flex gap-2 justify-center">
                      {/* Optional action buttons */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Hidden PDF content */}
          <div
            ref={targetRef}
            style={{ position: "absolute", left: "-9999px", width: "210mm" }}
            className="p-8 bg-white"
          >
            {selectedProject && (
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-center">Project Report</h1>
                <p><strong>Title:</strong> {selectedProject.projectTitle}</p>
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

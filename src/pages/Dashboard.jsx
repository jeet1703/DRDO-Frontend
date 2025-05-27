  // src/pages/Dashboard.jsx
  // import React, { useState } from "react";
  import React, { useState, useEffect } from "react";

  import Navbar from "../Components/Navbar";
  import Footer from "../Components/Footer";

  const Dashboard = () => {
    // const initialProjects = [
    //   {
    //     id: 1,
    //     projectTitle: "Design and Development of GAF HEAT for 18 30 40 Through SSP WER MAS",
    //     domainExpert: "Dr. Subhash Chander",
    //     institute: "Department of Physics, IIT Roorkee",
    //     dateOfSanction: "27-Sep-2012",
    //     cost: "₹22,05,059",
    //     referenceNo: "20MPERIP/28/20",
    //     recommendation: "Recommended by SSPL",
    //     status: "In Process",
    //     comments: "",
    //   },
    //   {
    //     id: 2,
    //     projectTitle: "Development of sensors for detection and suppression of ...",
    //     domainExpert: "Dr. Anoop Kumar Shukla",
    //     institute: "Amity Institute of Applied Science, Amity University, UP",
    //     dateOfSanction: "13-Dec-2021",
    //     cost: "₹17,75,855",
    //     referenceNo: "EBIPR/965",
    //     recommendation: "Recommended by SP",
    //     status: "In Process",
    //     comments: "",
    //   },
    //   {
    //     id: 3,
    //     projectTitle: "Infra-Red Detector using Graphene with SiNWs for Night Vision Devices",
    //     domainExpert: "Dr. Avinash Kumar",
    //     institute: "Amity University, UP",
    //     dateOfSanction: "16-Nov-2023",
    //     cost: "₹58,00,744",
    //     referenceNo: "ERIP/ER/20/23080099",
    //     recommendation: "Recommended by SSPL",
    //     status: "In Process",
    //     comments: "",
    //   },
    // ];

    // const [projects, setProjects] = useState(initialProjects); 
    const [projects, setProjects] = useState([]);  // Initially empty, will be loaded from backend
    // Fetch records from backend on component mount
    useEffect(() => {
      fetch(`https://drdo-backend-production.up.railway.app/api/dashboard/`)
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
      fetch(`https://drdo-backend-production.up.railway.app/api/dashboard/update/${project.referenceNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((res) => res.json())
        .catch((err) => console.error("Status update failed:", err));

    };

    const handleCommentsChange = (id, newComment) => {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === id ? { ...proj, comments: newComment } : proj
        )
      );
    };

    // const handleSendComment = (id) => {
    //   const project = projects.find((p) => p.id === id);
    //   if (project.comments.trim() === "") {
    //     alert("Please enter a comment before sending.");
    //     return;
    //   }
    //   alert(`Comment sent for project "${project.projectTitle}":\n${project.comments}`);
    //   // Clear comment after send
    //   setProjects((prev) =>
    //     prev.map((proj) =>
    //       proj.id === id ? { ...proj, comments: "" } : proj
    //     )
    //   );
    // };
    const handleSendComment = (id) => {
      const project = projects.find((p) => p.id === id);
      if (project.comments.trim() === "") {
        alert("Please enter a comment before sending.");
        return;
      }

      fetch(`https://drdo-backend-production.up.railway.app/api/dashboard/update/${project.referenceNo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: project.comments }),
      })
        .then((res) => res.json())
        .then(() => {
          alert(`Comment sent for project "${project.projectTitle}":\n${project.comments}`);
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
            Submitted ER&IPR Project Records
          </h2>
          <table className="w-full border text-sm bg-white shadow table-auto min-w-[900px]">
            <thead className="bg-[#02447C] text-white">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Project Title</th>
                <th className="border p-2">Domain Expert</th>
                <th className="border p-2">Institute</th>
                <th className="border p-2">Date of Sanction</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Cost</th>
                <th className="border p-2">Ref No.</th>
                <th className="border p-2">Recommendation</th>
                <th className="border p-2">Comments</th>
                <th className="border p-2">Action</th>
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

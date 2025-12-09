import React, { useEffect, useState } from "react";
import API from "../api";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data || []);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    };
    load();
  }, []);

  return (
    <div className="container section">
      <h2 className="section-title">Our Projects</h2>

      <div className="grid">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            API_BASE={API_BASE}
          />
        ))}
      </div>
    </div>
  );
}

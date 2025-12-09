import React, { useEffect, useState } from "react";
import API from "../api";

// Helper component to display key counts prominently
function DashboardStatCard({ title, count, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-count">{count}</div>
        <div className="stat-title">{title}</div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [p, c, ct, s] = await Promise.all([
        API.get("/projects"),
        API.get("/clients"),
        API.get("/contacts"),
        API.get("/subscribers"),
      ]);

      setProjects(p.data || []);
      setClients(c.data || []);
      setContacts(ct.data || []);
      setSubs(s.data || []);
    } catch (e) {
      console.error("Fetch error:", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const removeItem = async (type, id) => {
    if (!window.confirm("Delete item?")) return;
    await API.delete(`/${type}/${id}`);
    fetchAll();
  };

  const handleUpload = async (endpoint, formData) => {
    try {
      await API.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchAll();
    } catch (e) {
      alert("Upload failed");
      console.error(e);
    }
  };

  return (
    <div className="admin-root">
      <div className="container section admin">
        <h2 className="admin-title">Dashboard Overview 📊</h2>

        {loading && <div className="loader">Loading...</div>}
        
        {/* STATS AREA (Always 4 columns) */}
        <div className="stats-grid">
          <DashboardStatCard title="Projects" count={projects.length} icon="🧩" />
          <DashboardStatCard title="Clients" count={clients.length} icon="🧑‍🤝‍🧑" />
          <DashboardStatCard title="Messages" count={contacts.length} icon="📧" />
          <DashboardStatCard title="Subscribers" count={subs.length} icon="📰" />
        </div>
        
        <hr className="admin-divider" />
        
        <h2 className="admin-title" style={{marginTop: '40px'}}>Content Management</h2>

        {/* MANAGEMENT FORMS (Stacked: Project followed by Client) */}
        <div className="admin-stack">
            {/* PROJECT MANAGEMENT */}
            <div className="admin-card">
              <h3>Add New Project</h3>
              <ProjectForm onCreate={(f) => handleUpload("/projects", f)} />

              <h4>Existing Projects ({projects.length})</h4>
              {projects.length === 0 && <p className="empty-state-list">No projects found.</p>}
              {projects.map((p) => (
                <AdminItem
                  key={p._id}
                  title={p.name}
                  subtitle={p.description}
                  onDelete={() => removeItem("projects", p._id)}
                />
              ))}
            </div>

            {/* CLIENT MANAGEMENT */}
            <div className="admin-card">
              <h3>Add New Client</h3>
              <ClientForm onCreate={(f) => handleUpload("/clients", f)} />

              <h4>Client Testimonials ({clients.length})</h4>
              {clients.length === 0 && <p className="empty-state-list">No clients found.</p>}
              {clients.map((c) => (
                <AdminItem
                  key={c._id}
                  title={c.name}
                  subtitle={`${c.designation} - ${c.description?.slice(0, 80)}...`}
                  onDelete={() => removeItem("clients", c._id)}
                />
              ))}
            </div>
        </div>
        
        <hr className="admin-divider" />
        
        <h2 className="admin-title" style={{marginTop: '40px'}}>Records and Leads</h2>

        {/* RECORDS (Side-by-side: Contacts and Subscribers) */}
        <div className="admin-grid">

          {/* CONTACTS */}
          <div className="admin-card">
            <h3>Contact Messages ({contacts.length})</h3>
            {contacts.length === 0 && <p className="empty-state-list">No messages.</p>}
            {contacts.map((ct) => (
              <div key={ct._id} className="admin-item compact">
                <div>
                  <strong>{ct.fullName}</strong>
                  <p className="contact-details">{ct.email} | {ct.mobile}</p>
                  <p className="contact-message">{ct.message?.slice(0, 60)}...</p>
                </div>
                <button className="btn danger small-btn" onClick={() => removeItem("contacts", ct._id)}>Delete</button>
              </div>
            ))}
          </div>

          {/* SUBSCRIBERS */}
          <div className="admin-card">
            <h3>Newsletter Subscribers ({subs.length})</h3>
            {subs.length === 0 && <p className="empty-state-list">No subscribers.</p>}
            {subs.map((s) => (
              <div key={s._id} className="admin-item">
                <div>{s.email}</div>
                <button className="btn danger small-btn" onClick={() => removeItem("subscribers", s._id)}>Delete</button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* Shared Item Component */
function AdminItem({ title, subtitle, onDelete }) {
  return (
    <div className="admin-item">
      <div>
        <strong>{title}</strong>
        <p>{subtitle}</p>
      </div>
      <button className="btn danger" onClick={onDelete}>Delete</button>
    </div>
  );
}

/* Project Form */
function ProjectForm({ onCreate }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", desc);
    if (file) fd.append("image", file);

    onCreate(fd);

    setName(""); setDesc(""); setFile(null);
    e.target.reset();
  };

  return (
    // Removed form-stack-project class, as vertical alignment is no longer needed
    <form onSubmit={submit} className="form-stack"> 
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" required />
      {/* Set specific row count for textarea now that vertical alignment is not required */}
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" rows="4" required /> 
      
      {/* File Input Enhancement */}
      <div className="file-input-wrapper">
        <label htmlFor="project-file" className="custom-file-label">
            {file ? `File: ${file.name.slice(0, 25)}...` : "Choose Project Thumbnail"}
        </label>
        <input 
          type="file" 
          id="project-file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>
      {/* End File Input Enhancement */}

      <button className="btn">Add Project</button>
    </form>
  );
}

/* Client Form */
function ClientForm({ onCreate }) {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    fd.append("designation", designation);
    fd.append("description", desc);
    if (file) fd.append("image", file);

    onCreate(fd);

    setName(""); setDesignation(""); setDesc(""); setFile(null);
    e.target.reset();
  };

  return (
    <form onSubmit={submit} className="form-stack">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client Name" required />
      <input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="Designation" />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" rows="4" />
      
      {/* File Input Enhancement */}
      <div className="file-input-wrapper">
        <label htmlFor="client-file" className="custom-file-label">
            {file ? `File: ${file.name.slice(0, 25)}...` : "Choose Client Avatar"}
        </label>
        <input 
          type="file" 
          id="client-file" 
          accept="image/*" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>
      {/* End File Input Enhancement */}

      <button className="btn">Add Client</button>
    </form>
  );
}
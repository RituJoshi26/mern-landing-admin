import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import ContactPage from "./pages/ContactPage";
import ClientsPage from "./pages/ClientsPage";
import ProjectsPage from "./pages/ProjectsPage";


export default function App() {
  return (
    <div className="app">
      <Topbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
      </Routes>
      <SiteFooter />
    </div>
  );
}

// App.jsx (Only the Topbar component shown for clarity)

function Topbar() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand">
          <img src="" alt="" className="brand-logo" />
          <span className="brand-name">Consultique</span>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/contact">Contact</Link>
          {/* REMOVED .btn, ADDED .nav-admin-link */}
          <Link to="/admin" className="nav-admin-link">Admin</Link> 
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} Consultique</div>
        <div className="footer-links">
          <a href="#!">Privacy</a>
          <a href="#!">Terms</a>
        </div>
      </div>
    </footer>
  );
}

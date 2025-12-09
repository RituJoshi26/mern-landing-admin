import React from "react";

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Consultique</h2>
      <ul>
        <li onClick={() => scrollTo("home")}>Home</li>
        <li onClick={() => scrollTo("about")}>About</li>
        <li onClick={() => scrollTo("projects")}>Projects</li>
        <li onClick={() => scrollTo("clients")}>Clients</li>
        <li onClick={() => scrollTo("contact")} className="btn-nav">
          Contact
        </li>
      </ul>
    </nav>
  );
}

import React, { useEffect, useState } from "react";
import API from "../api";


import ProjectCard from "../components/ProjectCard";
import ClientCard from "../components/ClientCard";
import ContactForm from "../components/ContactForm";
import Newsletter from "../components/Newsletter";

export default function Landing() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));

    API.get("/clients")
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <main className="landing-root">
      <Hero />

      {/* PROJECTS SECTION */}
      <section id="projects" className="section container">
        <h2 className="section-title">Our Projects</h2>
        <p className="section-sub">Selected work that we are proud of</p>

        <div className="grid">
          {projects.map((p) => (
            <ProjectCard key={p._id} API_BASE={API_BASE} project={p} />
          ))}

          {projects.length === 0 && (
            <EmptyPlaceholder text="No projects yet. Add from admin." />
          )}
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section id="clients" className="section container alt">
        <h2 className="section-title">Happy Clients</h2>
        <p className="section-sub">What our clients say</p>

        <div className="grid grid-sm">
          {clients.map((c) => (
            <ClientCard key={c._id} API_BASE={API_BASE} client={c} />
          ))}

          {clients.length === 0 && (
            <EmptyPlaceholder text="No client testimonials yet." />
          )}
        </div>
      </section>

      {/* CONTACT + NEWSLETTER */}
      <section id="contact" className="container section contact-area">
        <div className="columns">
          <div className="col info">
            <h3>Get in touch</h3>
            <p>
              Have a project in mind or want to collaborate? We are just one
              message away. Fill the form and we'll get back to you.
            </p>

            <div className="contact-cards">
              <div className="mini-card">
                <div className="mc-title">Address</div>
                <div>123 Consulting Lane, Suite 4, YourCity</div>
              </div>

              <div className="mini-card">
                <div className="mc-title">Email</div>
                <div>hello@consultique.example</div>
              </div>

              <div className="mini-card">
                <div className="mc-title">Phone</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>

            <Newsletter />
          </div>

          <div className="col form-col">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

/* ✅ HERO COMPONENT */
function Hero() {
  return (
    <section className="hero container">
      <div className="hero-left">
        <h1>Consultation, Design & Marketing</h1>

        <p>
          We help businesses craft beautiful digital experiences and build
          products that scale. Strategy-led, design-driven, results-focused.
        </p>

        <div className="hero-ctas">
          <a href="#projects" className="btn">
            Our Projects
          </a>

          <a href="#contact" className="btn btn-outline">
            Contact Us
          </a>
        </div>
      </div>

      {/* <div className="hero-right">
        <div className="hero-card">
          <h4>Request a Free Consultation</h4>

          <form className="mini-form" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Name" />
            <input placeholder="Email" />
            <button className="btn small">Request</button>
          </form>
        </div>

        <div className="hero-image" aria-hidden />
      </div> */}
    </section>
  );
}

/* ✅ EMPTY STATE */
function EmptyPlaceholder({ text }) {
  return <div className="empty">{text}</div>;
}

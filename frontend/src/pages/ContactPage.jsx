import React from "react";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="container section">
      <h2 className="section-title">Contact</h2>
      <p className="section-sub">Drop a message and we'll respond within 24 hours.</p>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <ContactForm />
      </div>
    </div>
  );
}

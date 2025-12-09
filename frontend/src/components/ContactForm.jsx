import React, { useState } from "react";
import API from "../api";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await API.post("/contacts", form);
      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        mobile: "",
        city: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <h3>Contact Form</h3>

      {/* Grid for two-column fields */}
      <div className="grid-form"> 
        <input
          required
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          required
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) =>
            setForm({ ...form, mobile: e.target.value })
          }
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />
      </div>

      {/* Full-width Message Field */}
      <textarea
        required
        className="message-field" // Added specific class
        placeholder="Your Message..."
        rows="4"
        value={form.message}
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      {/* Action button and status feedback */}
      <div className="form-actions">
        <button className="btn" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
        <div className="form-status">
          {status === "success" && <span className="success">🎉 Message Sent Successfully!</span>}
          {status === "error" && <span className="error">⚠️ Submission Failed. Please try again.</span>}
        </div>
      </div>
    </form>
  );
}
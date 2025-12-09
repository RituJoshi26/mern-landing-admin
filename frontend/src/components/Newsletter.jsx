import React, { useState } from "react";
import API from "../api";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e?.preventDefault();
    setMsg("loading");
    try {
      await API.post("/subscribers", { email });
      setMsg("success");
      setEmail("");
    } catch (err) {
      setMsg(err?.response?.data?.error || "error");
    }
  };

  return (
    <form className="newsletter card" onSubmit={submit}>
      <h4 className="small">Newsletter</h4>
      <div className="newsletter-inner">
        <input required type="email" placeholder="Your email address" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn" type="submit">Subscribe</button>
      </div>
      <div className="muted small">
        {msg === "loading" && "Subscribing…"}
        {msg === "success" && "Subscribed — thank you!"}
        {msg && msg !== "loading" && msg !== "success" && msg !== "error" && <span>{msg}</span>}
        {msg === "error" && <span className="error">Something went wrong</span>}
      </div>
    </form>
  );
}

import React, { useEffect, useState } from "react";
import API from "../api";
import ClientCard from "../components/ClientCard";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get("/clients");
        setClients(res.data || []);
      } catch (e) {
        console.error("Failed to load clients", e);
      }
    };
    load();
  }, []);

  return (
    <div className="container section">
      <h2 className="section-title">Happy Clients</h2>

      <div className="grid">
        {clients.map((client) => (
          <ClientCard
            key={client._id}
            client={client}
            API_BASE={API_BASE}
          />
        ))}
      </div>
    </div>
  );
}

import React from "react";

export default function ClientCard({ client, API_BASE }) {
  const img = client.imageUrl ? (API_BASE + client.imageUrl) : null;
  return (
    <article className="card client-card">
      <div className="client-top">
        <div className="avatar" style={{ backgroundImage: img ? `url(${img})` : undefined }}>
          {!img && <span className="avatar-initial">{client.name?.charAt(0)}</span>}
        </div>
        <div>
          <strong>{client.name}</strong>
          <div className="muted small">{client.designation}</div>
        </div>
      </div>
      <p className="muted">{client.description}</p>
    </article>
  );
}

import React from "react";

export default function ProjectCard({ project, API_BASE }) {
  const imagePath = project.imageUrl || project.image || "";
  const imgSrc = imagePath ? API_BASE + imagePath : null;

  return (
    <article className="card project-card">
      <div
        className="thumbnail"
        style={{
          backgroundImage: imgSrc ? `url(${imgSrc})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        {!imgSrc && <div className="placeholder">Image</div>}
      </div>

      <div className="card-body">
        <h4>{project.name}</h4>
        <p className="muted small">{project.description?.slice(0, 160)}</p>
        <div className="card-actions">
          <button className="btn small" disabled>
            Read More
          </button>
        </div>
      </div>
    </article>
  );
}

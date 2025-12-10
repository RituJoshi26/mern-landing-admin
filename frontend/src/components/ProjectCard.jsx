// import React from "react";

// export default function ProjectCard({ project, API_BASE }) {
//   const imgSrc = project.imageUrl ? (API_BASE + project.imageUrl) : null;
//   return (
//     <article className="card project-card">
//       <div className="thumbnail" style={{ backgroundImage: imgSrc ? `url(${imgSrc})` : undefined }}>
//         {!imgSrc && <div className="placeholder">Image</div>}
//       </div>
//       <div className="card-body">
//         <h4>{project.name}</h4>
//         <p className="muted small">{project.description?.slice(0, 160)}</p>
//         <div className="card-actions">
//           <button className="btn small" disabled>Read More</button>
//         </div>
//       </div>
//     </article>
//   );
// }


// src/components/ProjectCard.jsx
import React, { useState } from "react";

export default function ProjectCard({ project, API_BASE }) {
  const [failed, setFailed] = useState(false);

  // canonicalize API_BASE (remove trailing slash)
  const BASE = (API_BASE || "").replace(/\/$/, "");

  // Derive image URL:
  // 1) If project.imageUrl already an absolute URL (starts with http) => use it
  // 2) If project.imageUrl is relative (starts with / or no slash) => prefix with BASE
  // 3) If no image path => null
  const raw = project?.imageUrl || project?.image || null;

  const imgSrc = raw
    ? raw.match(/^https?:\/\//i)
      ? raw // absolute URL already
      : `${BASE}/${raw.replace(/^\//, "")}` // ensure exactly one slash between base and path
    : null;

  // Fallback placeholder (you can replace with any static CDN image)
  const FALLBACK =
    "https://via.placeholder.com/450x350.png?text=No+Image+Available";

  // debug: uncomment to log resolved URL in browser console
  // console.log("Project image:", { raw, imgSrc });

  // backgroundStyle uses either resolved URL or fallback
  const backgroundStyle = {
    backgroundImage: `url(${failed || !imgSrc ? FALLBACK : imgSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <article className="card project-card" aria-label={project?.name}>
      <div
        className="thumbnail"
        style={backgroundStyle}
        // add onError catcher: if the background image URL fails to load,
        // we toggle a state to fall back. Because background-image doesn't have an onError,
        // we add an invisible <img> that attempts to load the same url and triggers onError.
      >
        {/* invisible loader image to detect network/load errors */}
        {imgSrc && !failed && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            src={imgSrc}
            style={{ display: "none" }}
            onError={() => {
              console.warn("Project image failed:", imgSrc);
              setFailed(true);
            }}
            onLoad={() => {
              /* successful load -> nothing to do */
            }}
          />
        )}

        {!imgSrc && <div className="placeholder">Image</div>}
      </div>

      <div className="card-body">
        <h4>{project?.name}</h4>
        <p className="muted small">{project?.description?.slice?.(0, 160)}</p>
        <div className="card-actions">
          <button className="btn small" disabled>
            Read More
          </button>
        </div>
      </div>
    </article>
  );
}

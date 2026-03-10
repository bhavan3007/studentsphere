import React from "react";

export default function Settings() {
  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Settings</h1>
          <p className="page__subtitle">Manage your application preferences</p>
        </div>
      </div>
      <div className="card">
        <h3 className="card__title">About StudentSphere</h3>
        <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>
          StudentSphere is a student management platform built with React. All data is stored in-memory and resets on page refresh.
          Use the Students page to add, edit, delete and export student data.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div className="setting-badge">React 18</div>
          <div className="setting-badge">In-Memory Storage</div>
          <div className="setting-badge">CSV Export</div>
          <div className="setting-badge">Fully Responsive</div>
        </div>
      </div>
    </div>
  );
}

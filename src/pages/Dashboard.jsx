import React from "react";

export default function Dashboard({ students }) {
  const total = students.length;
  const active = students.filter(s => s.status === "Active").length;
  const inactive = students.filter(s => s.status === "Inactive").length;
  const gradeA = students.filter(s => s.grade === "A").length;

  const stats = [
    { label: "Total Students", value: total, icon: "👨‍🎓", color: "#4facfe", bg: "rgba(79,172,254,0.12)" },
    { label: "Active", value: active, icon: "✅", color: "#43e97b", bg: "rgba(67,233,123,0.12)" },
    { label: "Inactive", value: inactive, icon: "⏸️", color: "#fa709a", bg: "rgba(250,112,154,0.12)" },
    { label: "Grade A Students", value: gradeA, icon: "⭐", color: "#f6d365", bg: "rgba(246,211,101,0.12)" },
  ];

  const gradeBreakdown = ["A","B","C","D","F"].map(g => ({
    grade: g,
    count: students.filter(s => s.grade === g).length,
    pct: total ? Math.round((students.filter(s => s.grade === g).length / total) * 100) : 0
  }));

  const recentStudents = [...students].slice(-5).reverse();

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Dashboard</h1>
          <p className="page__subtitle">Welcome back! Here's an overview of your students.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card" style={{ "--accent": stat.color, "--bg": stat.bg }}>
            <div className="stat-card__icon">{stat.icon}</div>
            <div className="stat-card__content">
              <div className="stat-card__value">{stat.value}</div>
              <div className="stat-card__label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card__title">Grade Distribution</h3>
          <div className="grade-bars">
            {gradeBreakdown.map(({ grade, count, pct }) => (
              <div key={grade} className="grade-bar-row">
                <span className="grade-bar-label">Grade {grade}</span>
                <div className="grade-bar-track">
                  <div className="grade-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="grade-bar-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card__title">Recent Students</h3>
          <div className="recent-list">
            {recentStudents.map(s => (
              <div key={s.id} className="recent-item">
                <div className="avatar avatar--sm" style={{ background: s.color }}>{s.avatar}</div>
                <div className="recent-item__info">
                  <div className="recent-item__name">{s.name}</div>
                  <div className="recent-item__email">{s.email}</div>
                </div>
                <span className={`badge badge--${s.status.toLowerCase()}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

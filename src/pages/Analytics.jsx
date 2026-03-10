import React from "react";

export default function Analytics({ students }) {
  const total = students.length;
  const byGrade = ["A","B","C","D","F"].map(g => ({ grade: g, count: students.filter(s => s.grade === g).length }));
  const byStatus = [
    { label: "Active", count: students.filter(s => s.status === "Active").length, color: "#43e97b" },
    { label: "Inactive", count: students.filter(s => s.status === "Inactive").length, color: "#fa709a" },
  ];
  const avgAge = total ? (students.reduce((sum, s) => sum + Number(s.age), 0) / total).toFixed(1) : 0;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Analytics</h1>
          <p className="page__subtitle">Insights about your student data</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="card">
          <h3 className="card__title">Grade Overview</h3>
          <div className="donut-legend">
            {byGrade.map(({ grade, count }) => (
              <div key={grade} className="donut-legend-item">
                <span className="donut-legend-dot" style={{ background: `hsl(${grade.charCodeAt(0) * 40}, 70%, 60%)` }} />
                <span>Grade {grade}</span>
                <span className="donut-legend-count">{count} students</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card__title">Status Breakdown</h3>
          <div className="status-visual">
            {byStatus.map(({ label, count, color }) => (
              <div key={label} className="status-item">
                <div className="status-circle" style={{ "--c": color, "--pct": `${total ? Math.round(count/total*100) : 0}%` }}>
                  <span>{total ? Math.round(count/total*100) : 0}%</span>
                </div>
                <div className="status-item__info">
                  <div className="status-item__label" style={{ color }}>{label}</div>
                  <div className="status-item__count">{count} students</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card__title">Quick Stats</h3>
          <div className="quick-stats">
            <div className="quick-stat"><span className="quick-stat__val">{total}</span><span>Total</span></div>
            <div className="quick-stat"><span className="quick-stat__val">{avgAge}</span><span>Avg Age</span></div>
            <div className="quick-stat"><span className="quick-stat__val">{byGrade[0].count}</span><span>Grade A</span></div>
            <div className="quick-stat"><span className="quick-stat__val">{byStatus[0].count}</span><span>Active</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

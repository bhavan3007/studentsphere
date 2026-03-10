import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { useStudents } from "./hooks/useStudents";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const hook = useStudents();

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard students={hook.students} />;
      case "students": return <Students hook={hook} />;
      case "analytics": return <Analytics students={hook.students} />;
      case "settings": return <Settings />;
      default: return <Dashboard students={hook.students} />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="main">
        <header className="topbar">
          <button className="topbar__menu" onClick={() => setMobileOpen(o => !o)}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="topbar__brand">StudentSphere</span>
          <div className="topbar__right">
            <div className="topbar__avatar">A</div>
          </div>
        </header>
        <div className="content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

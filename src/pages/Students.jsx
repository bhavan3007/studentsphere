import React, { useState } from "react";
import StudentModal from "../components/StudentModal";
import DeleteDialog from "../components/DeleteDialog";
import { exportToExcel } from "../utils/export";

const PAGE_SIZE = 10;

export default function Students({ hook }) {
  const { filtered, search, setSearch, gradeFilter, setGradeFilter, statusFilter, setStatusFilter, loading, addStudent, updateStudent, deleteStudent } = hook;

  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // null | { mode: 'add' } | { mode: 'edit', student }
  const [deleteTarget, setDeleteTarget] = useState(null);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAdd = () => { setModal({ mode: "add" }); };
  const handleEdit = (student) => { setModal({ mode: "edit", student }); };
  const handleDeleteClick = (student) => { setDeleteTarget(student); };

  const handleSave = (data) => {
    if (modal.mode === "add") addStudent(data);
    else updateStudent(modal.student.id, data);
    setModal(null);
  };

  const handleConfirmDelete = () => {
    deleteStudent(deleteTarget.id);
    setDeleteTarget(null);
  };

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleGrade = (e) => { setGradeFilter(e.target.value); setPage(1); };
  const handleStatus = (e) => { setStatusFilter(e.target.value); setPage(1); };

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h1 className="page__title">Students</h1>
          <p className="page__subtitle">{filtered.length} students found</p>
        </div>
        <button className="btn btn--primary" onClick={handleAdd}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Student
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <svg className="search-box__icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="search-box__input" placeholder="Search Students..." value={search} onChange={handleSearch} />
        </div>
        <div className="toolbar__filters">
          <select className="filter-select" value={gradeFilter} onChange={handleGrade}>
            <option value="All">Grade</option>
            {["A","B","C","D","F"].map(g => <option key={g} value={g}>Grade {g}</option>)}
          </select>
          <select className="filter-select" value={statusFilter} onChange={handleStatus}>
            <option value="All">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button className="btn btn--outline" onClick={() => exportToExcel(filtered)} title="Download Excel">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="card table-card">
        <div className="table-title">Students Table</div>
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <span>Loading...</span>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Age</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr><td colSpan="6" className="table__empty">No students found</td></tr>
                  ) : paginated.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-name-cell">
                          <div className="avatar" style={{ background: student.color }}>{student.avatar}</div>
                          <div>
                            <div className="student-name">{student.name}</div>
                            <div className="student-id">#{student.id.toString(16).padStart(6,"0")}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table__email">{student.email}</td>
                      <td><span className="grade-badge">Grade {student.grade}</span></td>
                      <td><span className={`badge badge--${student.status.toLowerCase()}`}>{student.status}</span></td>
                      <td>
                        <span className="age-badge">{student.age}</span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn action-btn--edit" onClick={() => handleEdit(student)} title="Edit">
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                          </button>
                          <button className="action-btn action-btn--delete" onClick={() => handleDeleteClick(student)} title="Delete">
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <span className="pagination__info">{(page-1)*PAGE_SIZE+1}–{Math.min(page*PAGE_SIZE, filtered.length)} of {filtered.length}</span>
                <div className="pagination__btns">
                  <button className="pagination__btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="15 18 9 12 15 6"/>
                    </svg>
                  </button>
                  <button className="pagination__btn" onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {modal && (
        <StudentModal mode={modal.mode} student={modal.student} onSave={handleSave} onClose={() => setModal(null)} />
      )}
      {deleteTarget && (
        <DeleteDialog student={deleteTarget} onConfirm={handleConfirmDelete} onClose={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}

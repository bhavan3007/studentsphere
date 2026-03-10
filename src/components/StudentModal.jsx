import React, { useState, useEffect } from "react";

const GRADES = ["A", "B", "C", "D", "F"];
const STATUSES = ["Active", "Inactive"];

function validate(form) {
  const errs = {};
  if (!form.name.trim()) errs.name = "Full name is required";
  else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
  if (!form.email.trim()) errs.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address";
  if (!form.age) errs.age = "Age is required";
  else if (isNaN(form.age) || form.age < 5 || form.age > 100) errs.age = "Age must be between 5 and 100";
  if (!form.grade) errs.grade = "Grade is required";
  if (!form.status) errs.status = "Status is required";
  return errs;
}

export default function StudentModal({ mode, student, onSave, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", age: "", grade: "A", status: "Active" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (mode === "edit" && student) {
      setForm({ name: student.name, email: student.email, age: student.age, grade: student.grade, status: student.status });
    }
  }, [mode, student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newForm = { ...form, [name]: value };
      const errs = validate(newForm);
      setErrors(prev => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const errs = validate(form);
    setErrors(prev => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, age: true, grade: true, status: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSave({ ...form, age: Number(form.age) });
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">{mode === "add" ? "Add New Student" : "Edit Student"}</h2>
          <button className="modal__close" onClick={onClose}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          <div className="form-group">
            <label className="form-label">Full Name <span className="required">*</span></label>
            <input
              className={`form-input ${errors.name && touched.name ? "form-input--error" : ""}`}
              name="name" value={form.name} onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter full name"
            />
            {errors.name && touched.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email <span className="required">*</span></label>
            <input
              className={`form-input ${errors.email && touched.email ? "form-input--error" : ""}`}
              name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur}
              placeholder="Enter email address"
            />
            {errors.email && touched.email && <span className="form-error">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Age <span className="required">*</span></label>
              <input
                className={`form-input ${errors.age && touched.age ? "form-input--error" : ""}`}
                name="age" type="number" value={form.age} onChange={handleChange} onBlur={handleBlur}
                placeholder="Age"
              />
              {errors.age && touched.age && <span className="form-error">{errors.age}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Grade <span className="required">*</span></label>
              <select
                className={`form-input ${errors.grade && touched.grade ? "form-input--error" : ""}`}
                name="grade" value={form.grade} onChange={handleChange} onBlur={handleBlur}
              >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Status <span className="required">*</span></label>
            <select
              className={`form-input ${errors.status && touched.status ? "form-input--error" : ""}`}
              name="status" value={form.status} onChange={handleChange} onBlur={handleBlur}
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="modal__actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">
              {mode === "add" ? "Add Student" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

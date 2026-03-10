# StudentSphere 🎓

A student management dashboard built with React.js — fully frontend

## Features
- ✅ Dashboard with stats & grade distribution
- ✅ Students table with search, grade & status filters
- ✅ Add Student with full form validation
- ✅ Edit Student (pre-filled form)
- ✅ Delete Student with confirmation dialog
- ✅ Simulated loading state
- ✅ CSV Export (filtered or full data)
- ✅ Pagination (10 per page)
- ✅ Fully mobile responsive
- ✅ Analytics & Settings pages


## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx        # Navigation sidebar
│   ├── StudentModal.jsx   # Add/Edit modal with validation
│   └── DeleteDialog.jsx   # Delete confirmation
├── pages/
│   ├── Dashboard.jsx      # Stats & overview
│   ├── Students.jsx       # Main table + CRUD
│   ├── Analytics.jsx      # Grade/status charts
│   └── Settings.jsx       # Info page
├── hooks/
│   └── useStudents.js     # State + CRUD logic
├── data/
│   └── students.js        # Initial JSON data (12 students)
├── utils/
│   └── export.js          # CSV export utility
├── App.jsx
└── App.css
```

## Tech Stack
- React 18 (hooks)
- In-memory state (no backend/database)
- CSV export via Blob API
- Google Fonts (DM Sans)
- Pure CSS (no UI library)

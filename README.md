# StudentSphere 🎓

A student management dashboard built with React.js — fully frontend, no backend required.

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

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click **Deploy** — that's it!

## Deploy to Netlify

1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Select repo, set build command: `npm run build`, publish dir: `build`
4. Click **Deploy**

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

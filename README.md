```markdown
# Note Keeper Frontend

React frontend application for **Note Keeper** — a simple, responsive note-taking app.

## Features

- Create, read, update and delete notes (CRUD)
- Search notes
- Responsive design
- Clean and intuitive UI

## Tech Stack

- React
- CSS Modules
- Native Fetch API

## Backend

Make sure the backend for this project is running before starting the frontend.

[Note Keeper Backend](https://github.com/SewarAslan/nodeJS-Exercise-FTS)

By default, this README assumes the backend API is available at `http://localhost:3000`.  
If your backend runs on the same port as the frontend (3000), either change the backend port or run the frontend on a different one (instructions below).

---

## Project Structure
```

src/
├── components/
│ ├── SearchBar/
│ ├── NoteForm/
│ ├── NoteCard/
│ ├── NoteDialog/
│ ├── DeleteConfirmDialog/
│ └── NotesList/
├── hooks/
├── services/
├── utils/
├── App.js
└── index.js

````

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Backend server running (see **Backend** above)

### Installation
```bash
# install dependencies
npm install
# or
yarn
````

### Run Development Server

```bash
# start frontend (Create React App default)
npm start
# or
yarn start
```

- The frontend will open at `http://localhost:3000` by default.
- If your backend **also** runs on port `3000`, run the frontend on a different port:

```bash
# macOS / Linux
PORT=3001 npm start

# Windows (PowerShell)
$env:PORT=3001; npm start
```

Or change your backend port (e.g., to `3001`).

## Development Workflow

### Branching Model

- `main` — production-ready
- `develop` — active development
- `feature/*` — feature branches

### Commit Convention

Follow **Conventional Commits**:

- `feat:` — new feature
- `fix:` — bug fix
- `style:` — UI / formatting change (no logic)
- `refactor:` — code restructuring
- `chore:` — maintenance or setup

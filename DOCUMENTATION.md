# IEDC Innovation Hub — Full Documentation

A full-stack web application for the **Innovation & Entrepreneurship Development Centre (IEDC)** — a platform where student innovators showcase startup ideas, browse projects by domain/status, like projects, and submit new ones.

- **Frontend:** React 19 + Vite + Tailwind CSS 4 (dark themed UI)
- **Backend:** Node.js + Express 5 REST API
- **Database:** Simple JSON file (`backend/data/projects.json`) — no external DB required

---

## 1. Project Structure

```
iedc/
├── README.md
├── backend/
│   ├── server.js                    # Express app entry point (port 5000)
│   ├── .env                         # PORT, CORS_ORIGIN
│   ├── package.json
│   ├── controllers/
│   │   └── projectController.js     # CRUD logic + validation
│   ├── routes/
│   │   └── projectRoutes.js         # /api/projects routes
│   ├── middleware/
│   │   ├── notFound.js              # 404 handler
│   │   └── errorHandler.js          # Global 500 error handler
│   ├── utils/
│   │   └── fileDatabase.js          # read/write JSON "database"
│   └── data/
│       └── projects.json            # All project records
├── frontend/
│   ├── index.html
│   ├── vite.config.js               # react + tailwindcss plugins
│   ├── package.json
│   └── src/
│       ├── main.jsx                 # React root
│       ├── App.jsx                  # Layout, state, filtering, likes
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── FilterBar.jsx        # Search + category filter
│       │   ├── ProjectGrid.jsx
│       │   ├── ProjectCard.jsx
│       │   └── SubmissionForm.jsx   # "Pitch your idea" form
│       ├── data/
│       │   └── categories.js        # AI, EdTech, FinTech, HealthTech,
│       │                            # AgriTech, Sustainability, IoT
│       ├── services/
│       │   └── api.js               # Fetch wrapper for backend
│       └── assets/                  # hero.png, logos
```

---

## 2. How to Run the Project (Full Steps)

### Prerequisites
- **Node.js** (v18 or newer — built/tested on Node 22)
- **npm**

### ⚡ One-click option (recommended)

Run everything — backend, frontend, and auto-open the browser — with a single command:

```powershell
cd "c:\Users\Fayas faisal\Desktop\Desktop\Fayas Faisal\iedc"
.\start.ps1
```

It opens two terminal windows (backend + frontend), verifies both ports are live, and opens http://localhost:5173 in your browser. To shut everything down:

```powershell
.\stop.ps1
```

### Manual option — Step 1 — Backend (API server, port 5000)

```powershell
cd "c:\Users\Fayas faisal\Desktop\Desktop\Fayas Faisal\iedc\backend"
npm install          # only needed the first time
node server.js       # or: npm run dev  (uses nodemon, auto-restart)
```

Expected output:
```
IEDC API running on http://localhost:5000
```

Backend reads an optional `.env` file in `backend/`:
| Variable       | Default                 | Purpose                        |
|----------------|-------------------------|--------------------------------|
| `PORT`         | `5000`                  | API port                       |
| `CORS_ORIGIN`  | `http://localhost:5173` | Allowed frontend origin        |

Verify the API is alive:
```
http://localhost:5000/api/health
```

### Step 2 — Frontend (Vite dev server, port 5173)

Open a **second terminal**:

```powershell
cd "c:\Users\Fayas faisal\Desktop\Desktop\Fayas Faisal\iedc\frontend"
npm install          # only needed the first time
npm run dev
```

Then open **http://localhost:5173** in your browser.

> The frontend hardcodes the API URL `http://localhost:5000/api` in
> `frontend/src/services/api.js` — keep the backend running on port 5000,
> or edit that constant if you change ports.

### Step 3 — Production build (optional)

```powershell
cd frontend
npm run build        # outputs static files to frontend/dist
npm run preview      # serves the production build
```

### Both servers were verified running
- Backend: `GET /api/health` → `{"success": true, "message": "IEDC API is running"}`
- Frontend: `GET http://localhost:5173` → HTTP 200

---

## 3. API Reference

Base URL: `http://localhost:5000/api`

### Health
| Method | Endpoint      | Description              |
|--------|---------------|--------------------------|
| GET    | `/api/health` | Returns `{success:true}` |

### Projects
| Method | Endpoint          | Description                                        |
|--------|-------------------|----------------------------------------------------|
| GET    | `/api/projects`   | List all. Optional query: `?status=X&domain=Y`     |
| GET    | `/api/projects/1` | Get one project by id                              |
| POST   | `/api/projects`   | Create a project (returns 201)                     |
| PUT    | `/api/projects/1` | Update whitelisted fields (returns 200)            |
| DELETE | `/api/projects/1` | Delete a project                                   |

#### Project object shape
```json
{
  "id": 1,
  "title": "AI Study Buddy",
  "domain": "AI",
  "teamLead": "Jane Doe",
  "abstract": "Short description of the idea",
  "pitchDeckLink": "https://...",
  "teamSize": 1,
  "status": "Ideation",
  "likes": 0
}
```

#### Create — required fields (400 if missing)
`title`, `domain`, `teamLead`, `abstract`. Optional: `pitchDeckLink`.
New projects always start with `teamSize: 1`, `status: "Ideation"`, `likes: 0`, and an auto-incremented `id`.

#### Update — allowed (whitelisted) fields
`title`, `domain`, `teamLead`, `abstract`, `pitchDeckLink`, `teamSize`, `status`, `likes`
- `status` must be one of: **Ideation | Prototype | Seed Funded** (case-insensitive)
- `likes` must be a non-negative integer
- Sending no valid fields → 400 with the allowed-fields message

#### Filtering examples
```
GET /api/projects?status=Prototype
GET /api/projects?domain=AI
GET /api/projects?status=Seed%20Funded&domain=EdTech
```

#### Example (PowerShell)
```powershell
Invoke-RestMethod http://localhost:5000/api/projects
Invoke-RestMethod http://localhost:5000/api/projects -Method Post `
  -ContentType "application/json" `
  -Body '{"title":"Demo","domain":"AI","teamLead":"Me","abstract":"Test idea"}'
```

---

## 4. Frontend Features

- **Hero section** — landing banner with illustration
- **Search bar** — filters projects by title (client-side, live)
- **Category filter** — All / AI / EdTech / FinTech / HealthTech / AgriTech / Sustainability / IoT (matches project `domain`)
- **Project cards grid** — shows title, domain, team lead, status badge, abstract, likes
- **Like button** — toggles a like per session (client-side state, not persisted to API)
- **Submission form** — POSTs a new project to the API; the list reloads afterward
- **Loading / error states** — friendly messages while fetching or on API failure
- **Dark theme** — Tailwind `slate-950` background, indigo accents
- `npm run lint` — oxlint linter for the frontend

## 5. Backend Details

- **CORS** restricted to `CORS_ORIGIN` (default `http://localhost:5173`)
- **JSON body parsing** via `express.json()`
- **404 middleware** — unknown routes return `{ message: "Route /x not found" }`
- **Error middleware** — any thrown error → 500 `{ message: "Internal server error" }` (stack logged to console)
- **Persistence** — the whole `projects.json` file is read into memory on each request and rewritten on every mutation (fine for a demo; a real DB is the natural next step)

## 6. Common Issues & Fixes

| Symptom | Cause | Fix |
|---|---|---|
| Frontend loads but "Failed to fetch projects" | Backend not running / port changed | Start backend on port 5000, or edit `src/services/api.js` |
| Backend log: `Cannot find module server.js` | Ran from the wrong folder (`iedc/` root) | `cd backend` first |
| `EADDRINUSE :5000` | Another process owns the port | Change `PORT` in `backend/.env` and the URL in `api.js` |
| CORS blocked in browser console | Frontend origin differs from `CORS_ORIGIN` | Set `CORS_ORIGIN=http://localhost:5173` in `backend/.env` |
| Projects not saving | `projects.json` must be writable | Check file permissions in `backend/data/` |

## 7. Future Improvement Ideas

- Replace the JSON file store with MongoDB/SQLite and a proper ORM
- Persist likes to the backend (dedicated `POST /:id/like` endpoint)
- Add authentication for submissions/edits (JWT)
- Search/filter on the server instead of client-side only
- Add tests (e.g. Vitest for frontend, Supertest for API)

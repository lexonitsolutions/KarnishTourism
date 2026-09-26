# Repository Architecture & File Placement Rules

## Absolute Rule: Strict Frontend/Backend Separation
All files must strictly be created in either the `frontend/` directory or the `backend/` directory based on their purpose and domain. NEVER place source code files directly in the repository root.

### 1. Frontend Directory (`frontend/`)
All user interface, client-side interactions, pages, and web presentation logic MUST reside inside `frontend/`:
- **Next.js App Router Pages & Layouts**: `frontend/app/**` (e.g., `frontend/app/about/page.js`, `frontend/app/tours/page.js`)
- **React Components**: `frontend/app/components/**` (e.g., `frontend/app/components/Header.js`)
- **Static Assets & Media**: `frontend/public/**` (e.g., `frontend/public/images/`, `frontend/public/css/`, `frontend/public/js/`)
- **Frontend Styles**: `frontend/app/globals.css` or `frontend/public/css/**`
- **Frontend Utilities & Hooks**: `frontend/app/utils/**` or `frontend/app/hooks/**`
- **Frontend Config**: `frontend/next.config.mjs`, `frontend/jsconfig.json`, `frontend/eslint.config.mjs`, `frontend/package.json`

### 2. Backend Directory (`backend/`)
All server-side logic, API endpoints, database operations, business processing, and background services MUST reside inside `backend/`:
- **Server Entrypoint**: `backend/src/server.js`
- **API Routes**: `backend/src/routes/**`
- **Controllers & Request Handlers**: `backend/src/controllers/**`
- **Database Models & Schemas**: `backend/src/models/**`
- **Business Logic & Services**: `backend/src/services/**`
- **Middleware**: `backend/src/middleware/**`
- **Backend Config & Env**: `backend/package.json`, `backend/.env`

### 3. Root Directory
The root directory is strictly reserved for:
- Monorepo orchestration (`package.json` with npm workspaces)
- Shared version control (`.gitignore`)
- Project documentation and agent instructions (`README.md`, `AGENTS.md`, `CLAUDE.md`, `.agents/rules/**`)

### 4. Rule for AI Agents & Developers
When tasked with creating, modifying, or scaffolding new features:
1. Determine whether the feature is **frontend** (UI, client page, client component, browser styling) or **backend** (REST API, database, server route, controller, service).
2. Create and maintain files in the appropriate folder (`frontend/` or `backend/`).
3. Do not cross-contaminate frontend code into backend or vice versa.

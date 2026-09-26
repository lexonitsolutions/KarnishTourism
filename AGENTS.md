<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Structure & File Creation Rules

This repository is organized as a fullstack monorepo with strict separation of concerns:

## 1. Frontend (`frontend/`)
All client-side code, UI components, pages, public assets, and Next.js code must be placed here.
- Next.js Pages & Layouts: `frontend/app/**`
- React Components: `frontend/app/components/**`
- Static Assets & Media: `frontend/public/**`
- Frontend Config: `frontend/next.config.mjs`, `frontend/jsconfig.json`, `frontend/package.json`

## 2. Backend (`backend/`)
All backend code, API routes, controllers, models, and server logic must be placed here.
- Server Entrypoint: `backend/src/server.js`
- API Routes: `backend/src/routes/**`
- Controllers: `backend/src/controllers/**`
- Models & Schemas: `backend/src/models/**`
- Services & Business Logic: `backend/src/services/**`
- Backend Config: `backend/package.json`, `backend/.env`

## 3. Mandatory Rule for Future File Creation
- When creating or modifying files, determine whether the file belongs to **Frontend** or **Backend**.
- ALWAYS place frontend files in `frontend/`.
- ALWAYS place backend files in `backend/`.
- NEVER place application code directly in the root directory.

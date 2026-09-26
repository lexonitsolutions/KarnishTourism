# Backend API Server

This folder contains the backend server and API logic for Karnish Tourism.

## Directory Structure

```text
backend/
├── src/
│   ├── controllers/    # Request handlers / business logic
│   ├── models/         # Data models and database schemas
│   ├── routes/         # API route definitions
│   ├── services/       # Third-party integrations and internal services
│   └── server.js       # Main server entrypoint
├── .env.example        # Environment variable template
├── package.json        # Backend package and script configurations
└── README.md
```

## Running the Backend

From the repository root:
```bash
# Run backend development server (with auto-reload)
npm run dev:backend

# Or start directly
npm run start:backend
```

Or from within the `backend/` directory:
```bash
cd backend
npm run dev
```

## Health Check
- `http://localhost:5000/api/health`

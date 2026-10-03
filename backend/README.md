# Karnish Tourism API

Express and Mongoose API for the customer, administrator, and collaborator applications.

## Setup

1. Copy `.env.example` to `.env` and provide `MONGODB_URI`, `JWT_SECRET`, and optional first-admin credentials.
2. In MongoDB Atlas, allow the development machine's IP and create a least-privilege database user.
3. Run `npm run dev:backend` from the repository root.
4. Check `GET http://localhost:5000/api/health`.

The server uses the `karnish_tourism` database by default. Credentials are never included in health responses or logs.

## Routes

- Auth: `/api/auth/*`
- Public reads: `/api/destinations`, `/api/tours`, `/api/activities`, `/api/hotels`, `/api/offers`, `/api/reviews`
- Customer bookings: `/api/bookings`
- Public inquiry submission: `POST /api/inquiries`
- Protected administration: `/api/admin/*`
- Collaborator-scoped reads: `/api/collaborators/*`
- Backward-compatible reads: `/api/catalog/:resource`

List endpoints support `page`, `limit`, `search`, and applicable filters such as `destination`, `type`, and `featured`.

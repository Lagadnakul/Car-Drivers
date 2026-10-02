<div align="center">

# 🚗 Car Drivers Platform

### Scalable Driver Booking & Management System (Production-Ready MERN App)

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com/?lines=Production-Ready+System;Clean+Architecture;JWT+Secure+Auth;Scalable+Backend+Design&font=Fira%20Code&center=true&width=450&height=50&duration=3500&pause=800">
</p>

![License](https://img.shields.io/github/license/Lagadnakul/Car-Drivers)
![Issues](https://img.shields.io/github/issues/Lagadnakul/Car-Drivers)
![Stars](https://img.shields.io/github/stars/Lagadnakul/Car-Drivers)
![Node](https://img.shields.io/badge/node-18+-green)

---

### 🌐 Live System

| App | Status | URL |
|-----|--------|-----|
| 🚀 Customer frontend | live | https://car-drivers-frontend.vercel.app |
| 🛠️ Admin dashboard | not deployed | — |
| ⚙️ Backend API | not deployed | — |

> ⚠️ Only the customer frontend is deployed, and it has no API behind it, so
> data-driven screens will not load. See **§8 Deployment** to stand up the
> backend on Render and the admin on Vercel.

</div>

---

# 🧠 1. Problem Statement

The driver booking ecosystem is largely **unstructured and inefficient**:

* No real-time driver availability
* Manual coordination
* Lack of centralized system
* Poor tracking and transparency

---

# 💡 2. Solution Approach

This platform introduces a **centralized, scalable system**:

* Real-time driver discovery
* Structured booking lifecycle
* Secure authentication system
* Admin-level system control

---

# 🏗️ 3. System Architecture

## 🔷 High-Level Architecture

```id="arch1"
Client (React - Vite)
        ↓
REST API (Node.js + Express)
        ↓
Database (MongoDB Atlas)
```

---

## 🔷 Component-Level Architecture

```id="arch2"
[Frontend]
  UI Components → State Management → API Layer

[Backend]
  Routes → Controllers → Services → Models → Database

[External]
  ImageKit (Media Storage)
```

---

## 🔷 Request Lifecycle

```id="flow1"
User Action
   ↓
Frontend (API Call)
   ↓
Express Router
   ↓
Middleware (Auth / Validation)
   ↓
Controller
   ↓
Service Layer
   ↓
Database Query (MongoDB)
   ↓
Response → UI Update
```

---

# 🔐 4. Authentication & Security Flow

```id="authflow"
User Login
   ↓
Credential Verification
   ↓
JWT Token Generation
   ↓
Token stored on client
   ↓
Protected API requests
   ↓
Middleware validates token
```

### Security Measures

* JWT-based authentication
* Password hashing
* Environment variable protection
* CORS security
* Input validation

---

# 📦 5. Database Design

## 🔹 Core Entities

### User

* name
* email
* password
* role

### Driver

* name
* experience
* availability
* rating

### Booking

* userId
* driverId
* bookingDate
* status

---

## 🔷 Relationship Model

```id="dbrel"
User 1 ──── * Booking * ──── 1 Driver
```

---

# ⚙️ 6. API Design Philosophy

* RESTful architecture
* Stateless communication
* Modular routing
* Standard HTTP status codes

---

# 📡 7. Key API Flows

### Booking Flow

```id="bookingflow"
User selects driver
   ↓
Request sent to API
   ↓
Driver availability checked
   ↓
Booking created
   ↓
Response returned
```

---

### Driver Fetch Flow

```id="driverflow"
User opens dashboard
   ↓
API fetches drivers
   ↓
Filters applied
   ↓
Results displayed
```

---

# 🚀 8. Deployment Architecture

Three deployable units. The backend is a long-running Node server, so it goes
on Render; the two Vite apps are static builds and go on Vercel.

### Backend API → Render

The repo root is an **npm workspace**. Deploying from the root runs
`npm run build` across every workspace, and `backend` has no build script —
that fails with `Missing script: "build"`. Point Render at `backend/` instead:

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

`render.yaml` in the repo root already encodes this — use **New → Blueprint**
and Render reads it, rather than setting the fields by hand.

Environment variables to set in the Render dashboard:

```
MONGO_URI       mongodb+srv://…         # MongoDB Atlas connection string
JWT_SECRET      <32+ random chars>      # node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_EXPIRE      30d
NODE_ENV        production
FRONTEND_URL    https://<frontend>.vercel.app
ADMIN_URL       https://<admin>.vercel.app
```

> **FRONTEND_URL and ADMIN_URL are the CORS allowlist.** The API rejects
> browser requests from any origin not listed, so a deployed frontend will fail
> with a CORS error until these are set. Extra origins (preview deployments)
> can be added via `CORS_EXTRA_ORIGINS` as a comma-separated list.

> Render's free tier sleeps after 15 minutes idle; the next request takes
> ~50 seconds to wake it.

### Frontend & Admin → Vercel

Two separate Vercel projects from the same repo, each with its own root:

| | Frontend | Admin |
|---|---|---|
| Root Directory | `frontend` | `admin` |
| Build Command | `npm run build` | `npm run build` |
| Output Directory | `dist` | `dist` |

Both need one environment variable, pointing at the Render API —
**including the `/api` suffix**:

```
VITE_API_URL=https://<your-render-service>.onrender.com/api
```

See `frontend/.env.example` and `admin/.env.example`. Vite inlines `VITE_*`
values at build time, so changing this requires a redeploy, not just a restart.

### Order of operations

1. Deploy the backend to Render → note its URL
2. Deploy frontend and admin to Vercel with `VITE_API_URL` set to that URL
3. Go back to Render and set `FRONTEND_URL` / `ADMIN_URL` to the Vercel URLs
4. Redeploy the backend so the new CORS origins take effect

### Database

* MongoDB Atlas (Cloud DB)
* Add Render's outbound IPs to the Atlas IP allowlist, or allow `0.0.0.0/0`
  for a demo deployment

---

# ⚡ 9. Performance Considerations

* Optimized API responses
* Lean database queries
* Component-based frontend rendering
* Separation of concerns

---

# 🔄 10. Scalability Strategy

Future improvements designed for scale:

* Redis caching layer
* WebSockets (real-time updates)
* Microservices architecture
* Load balancing
* CDN for assets

---

# 🧪 11. Testing Strategy (Planned)

* API testing (Postman)
* Unit testing (Jest)
* Integration testing

---

# 📁 12. Project Structure

```id="structure"
Car-Drivers/
├── frontend/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
├── admin/
```

---

# 📸 13. Screenshots


<img width="1895" height="864" alt="image" src="https://github.com/user-attachments/assets/f23bf3b3-2d63-4a0f-903d-de5834e7a40c" />

---

# 🛣️ 14. Roadmap

* Payment gateway integration
* Real-time tracking
* Push notifications
* Mobile application

---

# 📊 15. Key Learnings

* Full-stack system design
* API architecture
* Authentication handling
* Deployment pipelines

---

# 🤝 16. Contributing

Open to contributions and improvements.

---

# 📬 17. Contact

GitHub: https://github.com/Lagadnakul

---

<div align="center">

🔥 Built by Nakul — Full Stack Developer (MERN + AI)

</div>

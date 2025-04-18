# <div align="center">🚗 Go Pilot - Professional Driver Booking Platform</div>

<div align="center">
  <p>
    <a href="#"><img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Black_and_Green_Modern_Automotive_Logo-removebg-preview.png?updatedAt=1744453130929" alt="Go Pilot Logo" width="250px" /></a>
  </p>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#api-documentation">API Docs</a> •
    <a href="#deployment">Deployment</a>
  </p>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  ![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/Go-Pilot)
  ![GitHub contributors](https://img.shields.io/github/contributors/yourusername/Go-Pilot)
  ![GitHub stars](https://img.shields.io/github/stars/yourusername/Go-Pilot?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/yourusername/Go-Pilot?style=social)
</div>

<br />

<div align="center">
  <kbd>
    <img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/Home%20Image.png?updatedAt=1744650669954" alt="Go Pilot Screenshot" width="80%" />
  </kbd>
</div>

<br />

A full-stack application that connects users with verified professional drivers. This platform allows users to book drivers for various purposes, manage bookings, and maintain driver profiles.

## 🌟 Project Overview

<p align="center">
  <img src="https://github.com/yourusername/Go-Pilot/raw/main/diagram.gif" alt="Project Overview" width="600px" />
</p>

Go Pilot is a comprehensive platform with three main components:

- **🖥️ Frontend**: User-facing React application for booking drivers
- **🔧 Backend**: RESTful API built with Node.js
- **👨‍💼 Admin Panel**: Dashboard for administrators to manage users, drivers, and bookings

## ✨ Features

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <h3 align="center">User Authentication</h3>
        <p align="center">
          <img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/auth-demo.gif" alt="Authentication Demo" width="100%" />
        </p>
        <p align="center">🔐 Secure registration and login</p>
      </td>
      <td width="50%">
        <h3 align="center">Driver Profiles</h3>
        <p align="center">
          <img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/drivers-demo.gif" alt="Drivers Demo" width="100%" />
        </p>
        <p align="center">👨‍💼 Browse through verified drivers with ratings</p>
      </td>
    </tr>
    <tr>
      <td width="50%">
        <h3 align="center">Booking System</h3>
        <p align="center">
          <img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/booking-demo.gif" alt="Booking Demo" width="100%" />
        </p>
        <p align="center">📅 Schedule rides with preferred drivers</p>
      </td>
      <td width="50%">
        <h3 align="center">Reviews & Ratings</h3>
        <p align="center">
          <img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/reviews-demo.gif" alt="Reviews Demo" width="100%" />
        </p>
        <p align="center">💬 Share experiences and rate drivers</p>
      </td>
    </tr>
  </table>
</div>

Additional features:
- **📱 Responsive Design**: Works on all devices - desktop, tablet, and mobile
- **🖼️ Image Upload**: Support for profile photos and license documents
- **👨‍💻 Admin Dashboard**: Complete administrative control over the platform

## 🛠️ Technology Stack

<table>
  <tr>
    <th>Frontend</th>
    <th>Backend</th>
    <th>Admin Panel</th>
  </tr>
  <tr>
    <td>
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><br />
      <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" /><br />
      <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Multer-F46519?style=for-the-badge&logo=multer&logoColor=white" />
    </td>
    <td>
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><br />
      <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Material_UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><br />
      <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
    </td>
  </tr>
</table>

## 📋 Prerequisites

- Node.js (v16.x or higher)
- MongoDB (v5.x or higher)
- npm or yarn
- Git

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/Go-Pilot.git
cd Go-Pilot
```

### Backend Setup

```bash
cd backend
npm install
# Create .env file with required environment variables
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Admin Panel Setup

```bash
cd admin
npm install
npm run dev
```

## 📂 Project Structure



- `/frontend` - React client for users
- `/backend` - Node.js API and server
- `/admin` - React admin dashboard

## 🌐 API Documentation

<details>
<summary>Click to expand API endpoints</summary>

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login (returns JWT)
- `GET /api/users/profile` - Get user profile

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/:id` - Get a specific driver
- `POST /api/drivers/register` - Register as a driver

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings for user/driver
- `GET /api/bookings/:id` - Get a specific booking

</details>

For detailed API documentation, see the [backend README.md](backend/README.md).

## 📦 Deployment

<table>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" /><br />
      <b>Docker containers</b>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" /><br />
      <b>Render.com</b>
    </td>
    <td align="center">
      <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /><br />
      <b>Vercel</b>
    </td>
  </tr>
</table>

Detailed deployment instructions are available in the backend and frontend README files.

## 👥 Contributors

<p align="center">
  <a href="https://github.com/username1">
    <img src="https://ik.imagekit.io/bxi3adntf/Car-Driver/Photos/team-1.jpg" width="100px;" alt="Nakul Lagad" style="border-radius:50%"/><br />
    <b>Nakul Lagad</b>
  </a>
</p>

## 📄 License

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/github/license/yourusername/Go-Pilot?style=for-the-badge" alt="MIT License" />
  </a>
</p>

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing


Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

<p align="center">
  <a href="mailto:info@gopilot.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
    <a href="https://linkedin.com/in/nakul-lagad-625017269">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

For questions or feedback, please reach out to us at [nakullagad.com](nakullagad084@gmail.com)
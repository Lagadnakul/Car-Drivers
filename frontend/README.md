# 🚗 Car Drivers Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)

The client-facing interface for the Car Drivers platform, allowing users to browse, book, and manage driver services.

## ✨ Features

- **Modern UI**: Sleek, responsive design with TailwindCSS
- **Driver Listings**: Browse available drivers with filtering options
- **Booking System**: Seamless booking flow with confirmation
- **User Authentication**: Secure login/signup functionality
- **User Dashboard**: Manage bookings and account settings
- **Driver Details**: Comprehensive driver profiles with reviews

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Build for production:
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── assets/           # Images, fonts, and other static files
│   ├── components/       # Reusable components
│   ├── constants/        # Application constants
│   ├── context/          # React context providers
│   ├── data/             # Static data files
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   ├── services/         # API service functions
│   ├── styles/           # Global styles and TailwindCSS config
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global CSS
│   └── main.jsx          # Application entry point
├── public/               # Public static files
├── index.html            # HTML entry point
├── vite.config.js        # Vite configuration
├── tailwind.config.cjs   # TailwindCSS configuration
└── package.json          # Project dependencies and scripts
```

## 🔧 Configuration

The frontend is configured to connect to the backend API. Make sure the API endpoint is correctly set in `src/services/api.js`.

## 📚 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## 🔗 Dependencies

- React
- React Router
- Axios
- TailwindCSS
- Other utilities (see package.json for full list)

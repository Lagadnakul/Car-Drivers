# 🚙 Car Drivers Admin Panel

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)

A powerful administration dashboard for managing the Car Drivers platform, including drivers, users, bookings, and system settings.

## 🌟 Features

- **Comprehensive Dashboard**: Overview of key metrics and activities
- **Driver Management**: Add, edit, verify, and manage driver profiles
- **User Management**: Manage user accounts and permissions
- **Booking Administration**: Track and manage all bookings in the system
- **Reports & Analytics**: Generate insights on platform performance
- **Settings & Configuration**: Customize platform settings

## 🚀 Getting Started

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
admin/Car-driver/
├── src/
│   ├── assets/           # Static assets like images
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Common UI components
│   │   ├── dashboard/    # Dashboard-specific components
│   │   └── layout/       # Layout components
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   │   ├── auth/         # Authentication pages
│   │   ├── bookings/     # Booking management
│   │   ├── dashboard/    # Dashboard pages
│   │   ├── drivers/      # Driver management
│   │   ├── profile/      # Admin profile
│   │   ├── reports/      # Reports and analytics
│   │   ├── settings/     # System settings
│   │   └── users/        # User management
│   ├── services/         # API service functions
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/               # Public static files
└── index.html            # HTML entry point
```

## 🔐 Authentication

The admin panel uses JWT authentication with role-based access control. Only authorized administrators can access the dashboard.

## 📊 Dashboard Features

- **Real-time Statistics**: Track drivers, users, and bookings
- **Recent Activities**: Monitor recent platform activities
- **Performance Metrics**: View key performance indicators
- **Quick Actions**: Perform common administrative tasks

## 📚 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Lint the codebase
- `npm run preview`: Preview production build locally

## 🔗 API Integration

The admin panel connects to the backend API for all data operations. Ensure the API endpoint is correctly configured in `src/services/api.js`.

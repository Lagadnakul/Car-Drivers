import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnhancedNavbar from './components/layout/EnhancedNavbar';
import EnhancedFooter from './components/layout/EnhancedFooter';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import DriverDetails from './pages/DriverDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import { AuthProvider } from './context/AuthContext';
import SearchResults from './pages/SearchResults';
import BookingSuccess from './pages/BookingSuccess';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <EnhancedNavbar />
          <main className="flex-grow pt-16">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/pilots" element={<Drivers />} />
              <Route path="/pilot/:id" element={<DriverDetails />} />
              <Route path="/search-pilots" element={<SearchResults />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Routes */}
              <Route 
                path="/booking/success" 
                element={
                  <ProtectedRoute>
                    <BookingSuccess />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Pilot Search Routes */}
              <Route path="/pilots/search" element={<SearchResults />} />
              <Route path="/pilots/available" element={<SearchResults />} />
              <Route path="/pilots/:location" element={<SearchResults />} />
            </Routes>
          </main>
          <EnhancedFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
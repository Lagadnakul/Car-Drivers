import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EnhancedNavbar from './components/layout/EnhancedNavbar';
import { AuthProvider } from './context/AuthContext';
import About from './pages/About';
import BookingSuccess from './pages/BookingSuccess';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import DriverDetails from './pages/DriverDetails';
import Drivers from './pages/Drivers';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import Services from './pages/Services';

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
              <Route path="/services" element={<Services />} />

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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;
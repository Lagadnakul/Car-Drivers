// frontend/src/App.jsx
import React from 'react';
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <EnhancedNavbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pilots" element={<Drivers />} />
              <Route path="/pilot/:id" element={<DriverDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

        
            </Routes>
          </main>
          <EnhancedFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

// In-memory storage for demo
let users = [
    {
        _id: 'user1',
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        _id: 'driver1',
        name: 'Jane Smith',
        email: 'driver@example.com',
        password: 'password123',
        role: 'driver'
    }
];

let drivers = [
    {
        _id: 'driver1',
        user: {
            _id: 'driver1',
            name: 'Jane Smith',
            email: 'driver@example.com'
        },
        name: 'Jane Smith',
        rating: 4.8,
        experience: 5,
        hourlyRate: 35,
        isAvailable: true,
        profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400',
        vehicleTypes: ['Sedan', 'SUV'],
        languages: ['English', 'French'],
        certifications: ['Professional Driving', 'First Aid'],
        locations: ['Downtown', 'Airport'],
        contactInfo: {
            phone: '+1 (555) 987-6543',
            email: 'jane.smith@example.com'
        },
        vehicle: {
            make: 'Toyota',
            model: 'Camry',
            year: 2022,
            color: 'Silver',
            licensePlate: 'ABC-123'
        }
    },
    {
        _id: 'driver2',
        user: {
            _id: 'driver2',
            name: 'Mike Johnson',
            email: 'mike@example.com'
        },
        name: 'Mike Johnson',
        rating: 4.9,
        experience: 8,
        hourlyRate: 45,
        isAvailable: true,
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        vehicleTypes: ['Luxury', 'SUV'],
        languages: ['English', 'Spanish'],
        certifications: ['Advanced Driving', 'Defensive Driving'],
        locations: ['City Center', 'Suburbs'],
        contactInfo: {
            phone: '+1 (555) 123-4567',
            email: 'mike.johnson@example.com'
        },
        vehicle: {
            make: 'BMW',
            model: '5 Series',
            year: 2023,
            color: 'Black',
            licensePlate: 'XYZ-789'
        }
    }
];

let bookings = [];

// JWT token generation
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '30d' });
};

// Auth middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

app.get('/', (req, res) => {
    res.json({ success: true, message: 'Car Driver API is running!' });
});

// Auth Routes
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const newUser = {
        _id: 'user' + Date.now(),
        name,
        email,
        password,
        role
    };
    
    users.push(newUser);
    const token = generateToken(newUser._id);
    
    res.json({
        success: true,
        message: 'User registered successfully',
        user: { _id: newUser._id, name, email, role },
        token
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = generateToken(user._id);
    
    res.json({
        success: true,
        message: 'Login successful',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token
    });
});

// User Routes
app.post('/api/users/login', (req, res) => {
    // Redirect to auth login
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = generateToken(user._id);
    
    res.json({
        success: true,
        message: 'Login successful',
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
        token
    });
});

app.post('/api/users/register', (req, res) => {
    const { name, email, password } = req.body;
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    const newUser = {
        _id: 'user' + Date.now(),
        name,
        email,
        password,
        role: 'user'
    };
    
    users.push(newUser);
    const token = generateToken(newUser._id);
    
    res.json({
        success: true,
        message: 'User registered successfully',
        user: { _id: newUser._id, name, email, role: 'user' },
        token
    });
});

// Driver Routes
app.get('/api/drivers', (req, res) => {
    res.json({
        success: true,
        drivers: drivers,
        total: drivers.length
    });
});

app.get('/api/drivers/:id', (req, res) => {
    const driver = drivers.find(d => d._id === req.params.id);
    if (!driver) {
        return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    res.json({
        success: true,
        driver
    });
});

// Booking Routes
app.post('/api/bookings', authenticateToken, (req, res) => {
    console.log('Booking request received:', req.body);
    
    const { driverId, pickupLocation, dropoffLocation, selectedDate, selectedTime, duration } = req.body;
    
    const driver = drivers.find(d => d._id === driverId);
    if (!driver) {
        return res.status(404).json({ success: false, message: 'Driver not found' });
    }
    
    const booking = {
        _id: 'booking-' + Date.now(),
        userId: req.user.userId,
        driverId,
        driver: {
            name: driver.name,
            profilePhoto: driver.profilePhoto,
            rating: driver.rating,
            vehicle: driver.vehicle
        },
        pickupLocation,
        dropoffLocation,
        selectedDate,
        selectedTime,
        duration: parseInt(duration),
        hourlyRate: driver.hourlyRate,
        totalAmount: driver.hourlyRate * parseInt(duration),
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    bookings.push(booking);
    
    res.json({ 
        success: true, 
        message: 'Booking created successfully',
        booking
    });
});

app.get('/api/bookings', authenticateToken, (req, res) => {
    const userBookings = bookings.filter(b => b.userId === req.user.userId);
    res.json({
        success: true,
        bookings: userBookings
    });
});

app.get('/api/bookings/:id', authenticateToken, (req, res) => {
    const booking = bookings.find(b => b._id === req.params.id && b.userId === req.user.userId);
    if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.json({
        success: true,
        booking
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Complete Car Driver API server running on port ${PORT}`);
    console.log(`Demo users:`);
    console.log(`- User: user@example.com / password123`);
    console.log(`- Driver: driver@example.com / password123`);
});

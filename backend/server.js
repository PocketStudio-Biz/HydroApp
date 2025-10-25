how do i logconst express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration for cross-platform compatibility
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Allow localhost for development on different platforms
    const allowedOrigins = [
      'http://localhost:19000',  // Expo web
      'http://localhost:19006',  // Expo development
      'http://localhost:8081',   // Metro bundler
      'http://127.0.0.1:19000',
      'http://127.0.0.1:19006',
      'http://127.0.0.1:8081',
      'exp://127.0.0.1:19000',  // Expo Go
      'http://192.168.1.0/24',  // Local network range
      'https://your-production-domain.com' // Replace with actual production domain
    ];

    if (allowedOrigins.some(allowed => origin.includes(allowed.replace('/24', '')))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for web builds
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../web-build')));
}

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'HydroApp Backend Server is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/data', (req, res) => {
  // Sample data endpoint
  res.json({
    data: [
      { id: 1, name: 'Sample Item 1', value: 100 },
      { id: 2, name: 'Sample Item 2', value: 200 },
      { id: 3, name: 'Sample Item 3', value: 300 }
    ],
    count: 3
  });
});

app.post('/api/data', (req, res) => {
  const { name, value } = req.body;
  
  if (!name || !value) {
    return res.status(400).json({ error: 'Name and value are required' });
  }
  
  const newItem = {
    id: Date.now(),
    name,
    value: parseInt(value),
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({ message: 'Data created successfully', data: newItem });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 HydroApp Backend Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS enabled for cross-platform compatibility`);
  console.log(`📱 Ready for iOS, Android, and Web platforms`);
});

module.exports = app;

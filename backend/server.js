const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory data store (persists for the lifetime of the server process)
const items = [
  { id: 1, name: 'Sample Item 1', value: 100 },
  { id: 2, name: 'Sample Item 2', value: 200 },
  { id: 3, name: 'Sample Item 3', value: 300 }
];
const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:19000',
  'http://localhost:19006',
  'http://localhost:8081',
  'http://127.0.0.1:19000',
  'http://127.0.0.1:19006',
  'http://127.0.0.1:8081',
  'exp://127.0.0.1:19000'
];

const toArray = (value = '') =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

const escapeForRegex = (pattern) =>
  pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');

const buildAllowedOrigins = () => {
  const envOrigins = toArray(process.env.CORS_ALLOWED_ORIGINS || process.env.CORS_ORIGIN);
  const merged = Array.from(new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins]));

  return merged.map((pattern) => {
    if (pattern === '*') {
      return { pattern, test: () => true };
    }

    if (pattern.includes('*')) {
      const regex = new RegExp(`^${escapeForRegex(pattern)}$`);
      return { pattern, test: (origin) => regex.test(origin) };
    }

    return { pattern, test: (origin) => origin === pattern };
  });
};

const allowedOrigins = buildAllowedOrigins();

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed = allowedOrigins.some(({ test }) => test(origin));

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS`));
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
  res.json({
    data: items,
    count: items.length
  });
});

app.post('/api/data', (req, res) => {
  const { name, value } = req.body;

  if (!name || typeof value === 'undefined') {
    return res.status(400).json({ error: 'Name and value are required' });
  }

  const newItem = {
    id: Date.now(),
    name,
    value: parseInt(value, 10),
    createdAt: new Date().toISOString()
  };

  items.push(newItem);
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
  console.info('Allowed CORS origins:', allowedOrigins.map(({ pattern }) => pattern));
  console.log(`🚀 HydroApp Backend Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 CORS enabled for cross-platform compatibility`);
  console.log(`📱 Ready for iOS, Android, and Web platforms`);
});

module.exports = app;

// Fetch single item
app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json({ data: item });
});

// Update item
app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, value } = req.body;
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });

  if (typeof name !== 'undefined') items[idx].name = name;
  if (typeof value !== 'undefined') items[idx].value = parseInt(value, 10);

  res.json({ message: 'Data updated successfully', data: items[idx] });
});

// Delete item
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  const removed = items.splice(idx, 1)[0];
  res.json({ message: 'Data deleted successfully', data: removed });
});

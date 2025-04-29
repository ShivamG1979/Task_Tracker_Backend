// app.js or server.js (backend)

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./utils/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS for multiple origins
const allowedOrigins = [
  'http://localhost:5173', // Local development frontend
  'https://task-tracker-frontend-ebon.vercel.app', // Production frontend
];

// Configure CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Allow the request if the origin matches
    } else {
      callback(new Error('Not allowed by CORS')); // Reject if the origin does not match
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;

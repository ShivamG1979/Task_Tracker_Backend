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

// Enable CORS (configure for development and production)
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://task-tracker-frontend-ebon.vercel.app/' : 'http://localhost:5173',  
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

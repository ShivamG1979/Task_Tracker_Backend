
// server.js
const app = require('./app');
const connectDB = require('./config/db');
const config = require('./config/config');

// Connect to database
connectDB();

const server = app.listen(config.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${config.PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => { 
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
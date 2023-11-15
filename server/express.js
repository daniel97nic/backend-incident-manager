const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // If you need to handle CORS (Cross-Origin Resource Sharing)

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes, you can configure it as needed

// Custom middleware (if any)
// app.use(customMiddleware);

// Routes
const ticketRoutes = require('./routes/ticket.routes');
app.use('/api', ticketRoutes);

// Error handling middleware (should be the last middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;

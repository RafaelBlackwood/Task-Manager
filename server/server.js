// 1. Load environment and packages
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// 2. Initialize Express app
const app = express();

// 3. Connect to MongoDB
connectDB();

// 4. Attach middleware
app.use(cors());                // Enable Cross-Origin requests
app.use(express.json());        // Parse JSON bodies
app.use(morgan('dev'));         // Log incoming requests

// 5. Define a simple test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// 6. Mount your task routes
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// 7. Start listening on the port from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

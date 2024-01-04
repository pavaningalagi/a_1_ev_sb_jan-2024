const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  EnergyUsageRoutes
} = require('./routes/EnergyUsageRoutes');
const {
  UserAnalyticsRoutes
} = require('./routes/UserAnalyticsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => res.send('<H2>welcome</H2>'));
app.use('/api/v1/energyusage', EnergyUsageRoutes);
app.use('/api/v1/useranalytics', UserAnalyticsRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.status === 404) {
    res.status(404).json({
      error: 'Not Found'
    });
  } else if (err.status === 409) {
    res.status(409).json({
      error: 'Conflict'
    });
  } else if (err.status === 400) {
    res.status(400).json({
      error: 'Bad Request'
    });
  } else {
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
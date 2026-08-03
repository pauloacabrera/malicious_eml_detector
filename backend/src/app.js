const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const databaseRoutes = require('./routes/databaseRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const scanRoutes = require('./routes/scanRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Malicious EML Detector API is running'
  });
});

app.use('/api', healthRoutes);
app.use('/api', databaseRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', scanRoutes);

app.use(errorHandler);

module.exports = app;

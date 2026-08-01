exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'malicious-eml-detector-backend',
    timestamp: new Date().toISOString()
  });
};

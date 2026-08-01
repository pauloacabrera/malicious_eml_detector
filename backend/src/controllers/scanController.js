exports.createScan = (req, res) => {
  res.status(201).json({
    message: 'Create scan endpoint is ready',
    data: req.body
  });
};

exports.getScans = (req, res) => {
  res.status(200).json({
    message: 'Get scans endpoint is ready',
    scans: []
  });
};

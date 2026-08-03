const { processUpload, getScansForUser, getDashboardStatsForUser } = require('../services/scanService');

exports.createScan = async (req, res, next) => {
  try {
    const result = await processUpload({
      file: req.file,
      userId: req.user?.id
    });

    res.status(201).json({
      message: 'Scan completed successfully',
      analysis: result.analysis,
      scanId: result.scanId
    });
  } catch (error) {
    next(error);
  }
};

exports.getScans = async (req, res, next) => {
  try {
    const scans = await getScansForUser(req.user?.id);
    res.status(200).json({
      message: 'Scan history retrieved',
      scans
    });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const analytics = await getDashboardStatsForUser(req.user?.id);
    res.status(200).json({
      message: 'Dashboard analytics retrieved',
      analytics
    });
  } catch (error) {
    next(error);
  }
};

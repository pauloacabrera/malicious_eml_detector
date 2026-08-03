const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { createScan, getScans, getDashboardStats } = require('../controllers/scanController');

const router = express.Router();

router.post('/scans', authMiddleware, upload.single('file'), createScan);
router.get('/scans', authMiddleware, getScans);
router.get('/dashboard/stats', authMiddleware, getDashboardStats);

module.exports = router;

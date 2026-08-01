const express = require('express');
const { createScan, getScans } = require('../controllers/scanController');

const router = express.Router();

router.post('/scans', createScan);
router.get('/scans', getScans);

module.exports = router;

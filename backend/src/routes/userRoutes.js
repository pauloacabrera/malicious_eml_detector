const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);

module.exports = router;

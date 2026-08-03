const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const { findUserByEmail, createUser } = require('../models/userModel');

const SALT_ROUNDS = 10;

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const userId = await createUser(username, email, passwordHash);

    res.status(201).json({
      message: 'User registered successfully',
      userId
    });
  } catch (error) {
    if (error.message && error.message.includes('already exists')) {
      return res.status(409).json({ error: 'User already exists' });
    }
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.PASSWORD_HASH || user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken({ id: user.ID || user.id, username: user.USERNAME || user.username, email: user.EMAIL || user.email });
    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    next(error);
  }
};

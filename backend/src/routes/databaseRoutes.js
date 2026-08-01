const express = require('express');
const fs = require('fs');
const path = require('path');
const { getOracleConnection } = require('../config/oracle');

const router = express.Router();

router.get('/database/status', async (req, res, next) => {
  try {
    const connection = await getOracleConnection();
    await connection.execute('SELECT 1 FROM dual');
    await connection.close();

    res.status(200).json({
      status: 'connected',
      message: 'Oracle database connection is working',
      connection_string: process.env.ORACLE_DB_CONNECTION_STRING || 'not configured'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/database/init-schema', async (req, res, next) => {
  try {
    const connection = await getOracleConnection();
    const schemaPath = path.join(__dirname, '../../../database/sql/init_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    await connection.execute(schemaSql);
    await connection.commit();
    await connection.close();

    res.status(200).json({
      status: 'ok',
      message: 'Oracle schema initialization script executed'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const oracledb = require('oracledb');

async function getOracleConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.ORACLE_DB_USER,
      password: process.env.ORACLE_DB_PASSWORD,
      connectString: process.env.ORACLE_DB_CONNECTION_STRING
    });

    return connection;
  } catch (error) {
    throw new Error(`Oracle connection failed: ${error.message}`);
  }
}

module.exports = {
  getOracleConnection
};

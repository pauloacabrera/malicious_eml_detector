const { getOracleConnection } = require('../config/oracle');

async function findUserByEmail(email) {
  const connection = await getOracleConnection();
  const result = await connection.execute(
    'SELECT id, username, email, password_hash FROM users WHERE email = :email',
    [email],
    { outFormat: require('oracledb').OUT_FORMAT_OBJECT }
  );
  await connection.close();

  return result.rows[0] || null;
}

async function createUser(username, email, passwordHash) {
  const connection = await getOracleConnection();

  try {
    const result = await connection.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash) RETURNING id INTO :id',
      {
        username,
        email,
        password_hash: passwordHash,
        id: { dir: require('oracledb').BIND_OUT, type: require('oracledb').NUMBER }
      },
      { autoCommit: true }
    );

    return result.outBinds.id[0];
  } catch (error) {
    if (error.message && error.message.includes('ORA-00001')) {
      throw new Error('User already exists');
    }
    throw error;
  } finally {
    await connection.close();
  }
}

module.exports = {
  findUserByEmail,
  createUser
};

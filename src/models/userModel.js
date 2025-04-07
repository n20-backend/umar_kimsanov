import pool from '../config/db.js';

export const createUser = async (userData) => {
  const { email, username, password } = userData;
  const result = await pool.query(
    `INSERT INTO users (email, username, password)
     VALUES ($1, $2, $3)
     RETURNING user_id, email, username`,
    [email, username, password]
  );
  return result.rows[0];
};

export const getUsers = async () => {
  const result = await pool.query(
    'SELECT user_id, email, username FROM users'
  );
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await pool.query(
    'SELECT user_id, email, username FROM users WHERE user_id = $1',
    [id]
  );
  return result.rows[0];
};

export const updateUser = async (id, userData) => {
  const { email, username, password } = userData;
  const result = await pool.query(
    `UPDATE users
     SET email = $1, username = $2, password = $3
     WHERE user_id = $4
     RETURNING user_id, email, username`,
    [email, username, password, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query('DELETE FROM users WHERE user_id = $1', [id]);
  return { message: 'User deleted' };
};
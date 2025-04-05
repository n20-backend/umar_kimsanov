import pool from '../config/db.js';

export const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUserID = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
  return result.rows[0];
}

export const createNewUser = async (user) => {
  const { email, username, password } = user;
  const result = await pool.query("INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *", [email, username, password]);
  return result.rows[0];
}

//not fixed
// export const updateUserByID = async (id, user) => {
//   const { name, email } = user;
//   const result = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id]);
//   return result.rows[0];
// }

export const deleteUserByID = async (id) => {
  const result = await pool.query("Delete FROM users WHERE user_id = $1;", [id]);
  return {
    "message": "User deleted",
  };
}

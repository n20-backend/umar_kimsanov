import pool from '../config/db.js';

export const createTask = async (taskData) => {
  const { title, description, listId, priorityId, dueDate } = taskData;
  const result = await pool.query(
    `INSERT INTO tasks (title, description, list_id, priority_id, due_date)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING task_id AS id`,
    [title, description, listId, priorityId, dueDate]
  );
  return result.rows[0];
};

export const getTasks = async () => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

export const getTaskById = async (id) => {
  const result = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [id]);
  return result.rows[0];
};

export const updateTask = async (id, taskData) => {
  const { title, description, listId, priorityId, dueDate } = taskData;
  const result = await pool.query(
    `UPDATE tasks
     SET title = $1, description = $2, list_id = $3, priority_id = $4, due_date = $5
     WHERE task_id = $6
     RETURNING task_id AS id`,
    [title, description, listId, priorityId, dueDate, id]
  );
  return result.rows[0];
};

export const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE task_id = $1', [id]);
  return { message: 'Task deleted' };
};
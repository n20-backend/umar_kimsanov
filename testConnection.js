import pkg from 'pg';
import dotenv from 'dotenv';

''
const { Pool } = pkg;


dotenv.config();


const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  } finally {
    pool.end();
  }
}

testDatabaseConnection();

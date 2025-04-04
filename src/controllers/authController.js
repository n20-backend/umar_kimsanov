import { query } from '../config/db.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const queryText = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email';
      const values = [name, email, hashedPassword];
  
      const result = await query(queryText, values);
  
      res.status(201).json({
        message: 'User created successfully',
        user: result.rows[0],
      });
  
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

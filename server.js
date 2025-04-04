import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { authRoutes } from './src/routes/index.js';  

dotenv.config(); 

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

app.use('/api/auth', authRoutes);//   http://localhost:5000/api/auth/signup

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import taskRoutes from './src/routes/taskRoutes.js';
import userRoutes from "./src/routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
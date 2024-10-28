import express from 'express';
import connectDB from './config/db.js';

import path from 'path';
import cors from 'cors';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
import usersRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';
import todosRoutes from './routes/api/todos.js';
import tagsRoutes from './routes/api/tags.js';
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/todos', todosRoutes);
app.use('/api/tags', tagsRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


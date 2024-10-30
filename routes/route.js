import express from 'express';
const router = express.Router();

import usersRoutes from './api/users.js';
import todosRoutes from './api/todos.js';

router.use('/api/users', usersRoutes);

router.use('/api/users', usersRoutes);
router.use('/api/todos', todosRoutes);

export default router;
import express from 'express';
const router = express.Router();
import { check } from 'express-validator';

import { auth } from '../../middleware/auth.js';
import UserController from '../../controllers/user.js';

router.get('/auth', auth, UserController.auth);

router.post(
  '/register',
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  UserController.register
);

router.post(
  '/login',
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  UserController.login
);

export default router;
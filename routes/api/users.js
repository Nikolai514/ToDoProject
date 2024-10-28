import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
//const config = require("config");

import User from '../../models/User.js';

const dropIndexIfExists = async () => {
  try {
    await User.collection.dropIndex("username_1");
    console.log("Dropped index: username_1");
  } catch (error) {
    if (error.codeName === "IndexNotFound") {
      console.log("Index 'username_1' does not exist."); // This message appears if the index doesn't exist
    } else {
      console.error("Error dropping index:", error); // This message appears if there’s another error
    }
  }
};

// Call the function to try to drop the index
dropIndexIfExists();

// @route    POST api/users
// @desc     Register user
// @access   Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();  

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        //config.get("jwtSecret"),
        { expiresIn: 144000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

export default router;

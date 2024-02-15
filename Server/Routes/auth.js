require("dotenv").config();
const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route-1: POST create a user using: '/api/auth/createuser'
router.post('/createuser', [
    check('username')
      .trim().notEmpty().withMessage('Username cannot be empty')
      .isLength({ min: 3 }).withMessage('Username must consist of 3 or more characters'),
    body('email', 'Enter a valid email address').isEmail(),
    body('firstname', 'Enter a valid firstname').isLength({ min: 2 }),
    body('lastname', 'Enter a valid lastname').isLength({ min: 2 }),
    body('password')
      .notEmpty().withMessage('Password cannot be empty')
      .isLength({ min: 5 }).withMessage('Password must consist of at least 5 characters'),
    body('gender', 'Enter a valid gender').isIn(['male', 'female', 'other']),
    body('isPrivate', 'Please choose for private or public account').isIn(['true', 'false']) // Consider using strings for boolean values
  ], async (req, resp) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
      }
  
      const userExists = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] });
  
      if (userExists) {
        return resp.status(400).json({ errors: "A user with this email or username already exists!" });
      }
  
      const saltRounds = parseInt(process.env.SALT_ROUND);
      const salt = await bcrypt.genSalt(saltRounds);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: securedPassword,
        isPrivate: req.body.isPrivate === 'true',
      });
  
      const data = {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          // Add other user details as needed
        }
      };
  
      const authtoken = jwt.sign(data, process.env.JWT_SECRET);
  
      resp.json({ success: true, authtoken });
    } catch (error) {
      console.error(error);
      resp.status(500).send("Unexpected error occurred");
    }
  });
  
// Route-2: POST create a user using: '/api/auth/login'
router.post('/login', [
    check('username')
        .trim().notEmpty().withMessage('Username can not be empty')
        .isLength({ min: 3 }).withMessage('Username must consist of at least 3 characters'),
        body('password')
        .notEmpty().withMessage('Password cannot be empty')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
], async (req, resp) => {

    let success = false;
    console.log('Habbibi ', req.body)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array()[0].msg });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return resp.status(400).json({ success, errors: "Username is not registered!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return resp.status(400).json({ success, errors: "Please try logging in using correct credentials" });
        }

        const data = {
            user: {
                id: user.id,
                username: user.username
            }
        };

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        return resp.json({ success, authtoken, username: data.user.username });
        // console.log(authtoken)
    } catch (err) {
        return resp.status(500).send("Internal server error");
    }
});

module.exports = router;

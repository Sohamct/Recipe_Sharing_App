const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const multer = require('multer');


// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Client/recipe/src/Uploads/User');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route-1: POST create a user using: '/api/auth/createuser'
router.post('/createuser', upload.single('profilePic'), [
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

    // get path of uploaded profile picture
    const profileImagePath = req.file ? req.file.filename : null;

    const newUser = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: securedPassword,
      profileImage: profileImagePath, 
      instagramHandle: req.body.instagramHandle,
      linkedinHandle: req.body.linkedinHandle,
      twitterHandle: req.body.twitterHandle,
    });

    const data = {
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
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
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email : user.email,
        date : user.data,
        profileImage: user.profileImage,
        instagramHandle: user.instagramHandle,
        linkedinHandle: user.linkedinHandle,
        twitterHandle: user.twitterHandle,
        followers: user.followers,
        followings : user.followings,
        favoriteRecipes : user.favoriteRecipes,
      }
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;
    return resp.json({ success, authtoken, user : user });
    // console.log(authtoken)
  } catch (err) {
    return resp.status(500).send("Internal server error");
  }
});

// Route-2: POST create a user using: '/api/auth/login'
router.get('/getDetails/:uname', fetchUser, async (req, resp) => {

  let success = false;

  const username = req.params.uname;
  try {
    let user = await User.findOne({ username });

    if (!user) {
      return resp.status(400).json({ success, errors: "Username is not registered!" });
    }
    success = true;
    return resp.json({ success: success, data: user });

  } catch (err) {
    return resp.status(500).send("Internal server error");
  }
});

module.exports = router;
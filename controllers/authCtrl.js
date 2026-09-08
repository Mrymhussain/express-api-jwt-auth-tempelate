const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SALT_ROUDS = 10;

const signup = async (req, res) => {
  try {
    // verify if the username alrady exists
    const userInDatabase = await User.findOne({ username: req.body.username });

    // if the user exists send error msg
    if (userInDatabase) {
      return res.status(409).json({ err: 'Invalid input' });
    }

    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(req.body.password, SALT_ROUDS);
    req.body.password = hashedPassword;

    // else lets check if the password match
    // if password matches create the new user
    const user = await User.create(req.body);

    const payload = {
      username: user.username,
      _id: user._id,
    };

    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'something went wrong' });
  }
};


const signin = async (req, res) => {
  try {
    // Look up the user by their username
    const user = await User.findOne({ username: req.body.username });

    // If the user doesn't exist
    if (!user) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    // If the password is incorrect
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: 'Invalid credentials.' });
    }

    // Construct the payload
    const payload = {
      username: user.username,
      _id: user._id,
    };

    // Create the token
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    // Send the token
    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};


module.exports = {
  signup,
  signin,
};
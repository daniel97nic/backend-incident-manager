const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const expressJwt = require("express-jwt");
const config = require('../../config/config');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, config.jwtSecret);

    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: 'Could not create user' });
  }
};

const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie('t', token, { expire: new Date() + 9999 });

    return res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(401).json({ error: 'Could not sign in' });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'signed out',
  });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'], // Add this line to specify the algorithm
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }
  next();
};

module.exports = { signin, signout, requireSignin, hasAuthorization, createUser };

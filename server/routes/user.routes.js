const express = require('express');
const { signin, signout, requireSignin, hasAuthorization, createUser } = require('../controllers/user.controller');

const router = express.Router();

// Sign in route
router.post('/signin', signin);

// Sign out route
router.get('/signout', signout);

// Create user route
router.post('/signup', createUser);

// Example protected route (requires authentication)
router.get('/profile', requireSignin, (req, res) => {
  // Access the authenticated user's information from req.auth
  res.json({
    user: req.auth,
    message: "You have access to this route because you are signed in."
  });
});

// Example route with authorization check
router.get('/user/:userId', requireSignin, hasAuthorization, (req, res) => {
  res.json({
    user: req.profile,
    message: "You have access to this user's information."
  });
});

module.exports = router;

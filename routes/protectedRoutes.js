const express = require('express');
const router = express.Router();

const protectedCtrl = require('../controllers/protectedCtrl');
const isSignedIn = require('../middleware/isSignedIn');

router.get(
  '/protected',
  isSignedIn,
  protectedCtrl.protectedRoute
);

module.exports = router;
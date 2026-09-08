const jwt = require('jsonwebtoken');

const isSignedIn = (req, res, next) => {
  try {
    const brearerToken = req.headers.authorization
    if (!brearerToken) throw new Error ('Login Requried');

    const token = brearerToken.spliy('')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({ err: 'Login required' });
  }
};

module.exports = isSignedIn;
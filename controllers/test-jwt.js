const jwt = require('jsonwebtoken');

const signToken = (req, res) => {
  const user = {
    _id: 1,
    username: 'test',
    password: 'test',
  };

  const token = jwt.sign(
    {
      username: user.username,
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.json({ message: "You are Auth'd", token });
};

const verifyToken = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.json({ message: 'Token is valid', token: decoded });
};

module.exports = {
  signToken,
  verifyToken,
};
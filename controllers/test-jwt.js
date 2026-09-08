const signToken = (req, res) => {
    res.json({ message: 'You are authorized!' });
  };
  
  module.exports = {
    signToken,
  };
exports.registerUser = (req, res) => {
  res.status(201).json({
    message: 'User registration endpoint is ready',
    data: req.body
  });
};

exports.loginUser = (req, res) => {
  res.status(200).json({
    message: 'User login endpoint is ready',
    data: req.body
  });
};

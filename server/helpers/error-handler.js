const errorHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 400 validation error
  return res.status(400).json({
    message:
      err.errors && err.errors instanceof Array
        ? err.errors[0].message
        : err.message,
  });
};

module.exports = errorHandler;

const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth.config.js');
const db = require('../models');
const User = db.User;

const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. Role.CLINENT)
  // or an array of roles (e.g. [Role.ADMIN, Role.REALTOR])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.currentUser)
    (req, res, next) => {
      let token = req.headers['authorization'];

      if (!token) {
        return res.status(403).send({
          message: 'No token provided!',
        });
      }

      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: 'Token is invalid!',
          });
        }

        const user = await User.findByPk(decoded.id, {
          attributes: ['id', 'name', 'email', 'password', 'role'],
        });
        if (!user) {
          return res.status(404).send({
            message: 'Not found',
          });
        }
        req.currentUser = user;
        next();
      });
    },

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.currentUser.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // authentication and authorization successful
      next();
    },
  ];
};

module.exports = authorize;

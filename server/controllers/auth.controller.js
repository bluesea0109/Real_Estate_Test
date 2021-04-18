const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { secret, salt } = require('../config/auth.config.js');
const User = db.User;

const Auth = {
  signup: async function (req, res, next) {
    const { email, password } = req.body;
    if (!!email === false || !!password === false) {
      res.status(400).json('Email or password is missing');
    }

    const user = User.build(req.body);
    user.password = await bcrypt.hash(password, salt);

    user
      .save()
      .then((user) => {
        const token = jwt.sign(
          {
            id: user.id,
          },
          secret,
          { expiresIn: '3d' },
        );

        res.json({ user, token });
      })
      .catch((err) => next(err));
  },

  signin: async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        attributes: ['id', 'name', 'email', 'password', 'role'],
        where: {
          email: email,
        },
      });

      // check user is empty or not
      if (user === null) {
        return res.status(400).json({
          message: 'Email or password is not correct',
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: 'Email or password is not correct',
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        secret,
        { expiresIn: '3d' },
      );

      res.json({ user, token });
    } catch (ex) {
      res.status(400).json({
        message: 'Invalid email and password',
      });
    }
  },
};

module.exports = Auth;

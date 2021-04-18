const bcrypt = require('bcrypt');
const { salt } = require('../config/auth.config');

module.exports = {
  show: (req, res) => {
    res.json(req.currentUser);
  },

  update: async (req, res, next) => {
    if (req.body.oldPassword) {
      if (
        !(await bcrypt.compare(req.body.oldPassword, req.currentUser.password))
      ) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }

      if (req.body.newPassword.length < 8) {
        return res
          .status(400)
          .json({ message: 'Password must be at least 8 characters' });
      }
      req.currentUser.password = await bcrypt.hash(req.body.newPassword, salt);
    }

    // block to change email, role
    delete req.body.email;
    delete req.body.role;
    delete req.body.password;

    req.currentUser.set(req.body);

    req.currentUser
      .save()
      .then((data) => res.json(data))
      .catch((err) => next(err));
  },
};

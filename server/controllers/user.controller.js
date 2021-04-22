const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { salt } = require('../config/auth.config');
const Role = require('../helpers/role');
const db = require('../models');
const User = db.User;

module.exports = {
  index: (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || 10;
    const reqRole = req.query.role;

    let options = {
      page: page,
      paginate: per_page,
      worder: [['id', 'ASC']],
      where: {
        role: {
          [Op.not]: Role.ADMIN,
        },
      },
    };

    if (!!reqRole) {
      options.where.role = { ...options.where.role, [Op.eq]: reqRole };

      User.findAll(options)
        .then((data) =>
          res.json({
            results: data,
          }),
        )
        .catch((err) => next(err));
    } else {
      User.paginate(options)
        .then((data) =>
          res.json({
            results: data.docs,
            currentPage: page,
            totalCount: data.total,
          }),
        )
        .catch((err) => next(err));
    }
  },

  create: async (req, res, next) => {
    const payload = {
      ...req.body,
      password: await bcrypt.hash('password', salt),
    };

    User.create(payload)
      .then((data) => res.json(data))
      .catch((err) => {
        next(err);
      });
  },

  show: (req, res) => {
    res.json(req.user);
  },

  update: (req, res, next) => {
    if (req.body.role) {
      if (req.body.role === Role.ADMIN) {
        return res
          .status(400)
          .json({ message: 'Not allowed to upgrade to ADMIN' });
      }

      if (req.body.role === Role.CLIENT && req.user.role === Role.REALTOR) {
        return res
          .status(400)
          .json({ message: 'Not allowed to downgrade to CLIENT' });
      }
    }

    // block to update email
    delete req.body.email;

    req.user
      .update(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  },

  destroy: (req, res, next) => {
    req.user
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err));
  },
};

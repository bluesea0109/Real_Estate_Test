const { Op } = require('sequelize');
const Role = require('../helpers/role');
const db = require('../models');
const User = db.User;

module.exports = {
  index: async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || 10;

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

    await User.paginate(options)
      .then((data) =>
        res.json({
          results: data.docs,
          currentPage: page,
          totalCount: data.total,
        }),
      )
      .catch((err) => next(err));
  },

  show: async (req, res) => {
    res.json(req.user);
  },

  update: async (req, res, next) => {
    if (req.body.role) {
      if (req.body.role === Role.ADMIN) {
        return res
          .status(400)
          .json({ message: 'Not allowed to upgrade to ADMIN' });
      }

      if (req.body.role === Role.CLIENT && req.user.role === Role.OWNER) {
        return res
          .status(400)
          .json({ message: 'Not allowed to downgrade to CLIENT' });
      }
    }

    // block to update email
    delete req.body.email;

    await req.user
      .update(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  },

  destroy: async (req, res, next) => {
    await req.user
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err));
  },
};

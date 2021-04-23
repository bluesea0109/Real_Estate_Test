const { Op } = require('sequelize');
const Role = require('../helpers/role');
const db = require('../models');
const Apartment = db.Apartment;
const User = db.User;

module.exports = {
  index: (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || 10;

    let options = {
      include: [{ model: db.User, as: 'realtor', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
      page: page,
      paginate: per_page,
    };

    const filters = ['floorAreaSize', 'pricePerMonth', 'numberOfRooms'];

    filters.forEach((filter) => {
      const min = Number(req.query[`${filter}_min`]);
      const max = Number(req.query[`${filter}_max`]);

      let where = {};

      if (!isNaN(min) && min) {
        where[filter] = {
          ...where[filter],
          [Op.gte]: min,
        };
      }

      if (!isNaN(max) && max) {
        where[filter] = {
          ...where[filter],
          [Op.lte]: max,
        };
      }

      if (where) {
        options.where = {
          ...options.where,
          ...where,
        };
      }
    });

    if (req.currentUser.role === Role.CLIENT) {
      options.where = { ...options.where, rented: false };
    }

    Apartment.paginate(options)
      .then((data) =>
        res.json({
          results: data.docs,
          currentPage: page,
          totalCount: data.total,
        }),
      )
      .catch((err) => next(err));
  },

  create: (req, res, next) => {
    let payload = {
      ...req.body,
    };

    if (!req.body.realtorId && req.currentUser.role === Role.REALTOR) {
      payload = { ...payload, realtorId: req.currentUser.id };
    }

    Apartment.create(payload)
      .then((data) => res.json(data))
      .catch((err) => {
        next(err);
      });
  },

  show: (req, res) => {
    const obj = Object.assign({}, req.apartment.toJSON());

    res.json(obj);
  },

  update: (req, res, next) => {
    User.findByPk(req.body.realtorId)
      .then((user) => {
        req.body = {
          ...req.body,
          realtor: {
            id: user.id,
            name: user.name,
          },
        };

        req.apartment
          .update(req.body)
          .then((data) => res.json(data))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  },

  delete: (req, res, next) => {
    req.apartment
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err));
  },
};

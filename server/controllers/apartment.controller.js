const { Op } = require('sequelize');
const Role = require('../helpers/role');
const db = require('../models');
const Apartment = db.Apartment;

module.exports = {
  index: async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const per_page = Number(req.query.per_page) || 10;

    let options = {
      include: [{ model: db.User, as: 'realtor', attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']],
      page: page,
      paginate: per_page,
    };

    const INF = 10000000;

    options.where = {
      floorAreaSize: {
        [Op.gte]: Number(req.query.floorAreaSize_min) || 0,
        [Op.lte]: Number(req.query.floorAreaSize_max) || INF,
      },
      pricePerMonth: {
        [Op.gte]: Number(req.query.pricePerMonth_min) || 0,
        [Op.lte]: Number(req.query.pricePerMonth_max) || INF,
      },
      numberOfRooms: {
        [Op.gte]: Number(req.query.pricePerMonth_min) || 0,
        [Op.lte]: Number(req.query.pricePerMonth_max) || INF,
      },
    };

    if (req.currentUser.role === Role.CLIENT) {
      options.where = { ...options.where, rented: false };
    }

    await Apartment.paginate(options)
      .then((data) =>
        res.json({
          results: data.docs,
          currentPage: page,
          totalCount: data.total,
        }),
      )
      .catch((err) => next(err));
  },

  create: async (req, res, next) => {
    let payload = {
      ...req.body,
    };

    if (!req.body.realtorId && req.currentUser.role === Role.REALTOR) {
      payload = { ...payload, realtorId: req.currentUser.id };
    }

    await Apartment.create(payload)
      .then((data) => res.json(data))
      .catch((err) => {
        next(err);
      });
  },

  show: async (req, res) => {
    const obj = Object.assign({}, req.apartment.toJSON());

    res.json(obj);
  },

  update: async (req, res, next) => {
    await req.apartment
      .update(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  },

  delete: async (req, res, next) => {
    await req.apartment
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err));
  },
};

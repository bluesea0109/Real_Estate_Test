const { Op } = require('sequelize');
const Role = require('../helpers/role');
const db = require('../models');
const Apartment = db.Apartment;

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

    let floorAreaSize = null;
    let pricePerMonth = null;
    let numberOfRooms = null;

    if (Number(req.query.floorAreaSize_min)) {
      floorAreaSize = {
        ...floorAreaSize,
        [Op.gte]: Number(req.query.floorAreaSize_min),
      };
    }

    if (Number(req.query.floorAreaSize_max)) {
      floorAreaSize = {
        ...floorAreaSize,
        [Op.lte]: Number(req.query.floorAreaSize_max),
      };
    }

    if (floorAreaSize) {
      options.where = { ...options.where, floorAreaSize };
    }

    if (Number(req.query.pricePerMonth_min)) {
      pricePerMonth = {
        ...pricePerMonth,
        [Op.gte]: Number(req.query.pricePerMonth_min),
      };
    }

    if (Number(req.query.pricePerMonth_max)) {
      pricePerMonth = {
        ...pricePerMonth,
        [Op.lte]: Number(req.query.pricePerMonth_max),
      };
    }

    if (pricePerMonth) {
      options.where = { ...options.where, pricePerMonth };
    }

    if (Number(req.query.numberOfRooms_min)) {
      numberOfRooms = {
        ...numberOfRooms,
        [Op.gte]: Number(req.query.numberOfRooms_min),
      };
    }

    if (Number(req.query.numberOfRooms_max)) {
      numberOfRooms = {
        ...numberOfRooms,
        [Op.lte]: Number(req.query.numberOfRooms_max),
      };
    }

    if (numberOfRooms) {
      options.where = { ...options.where, numberOfRooms };
    }

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
    req.apartment
      .update(req.body)
      .then((data) => res.json(data))
      .catch((err) => next(err));
  },

  delete: (req, res, next) => {
    req.apartment
      .destroy()
      .then(() => res.json(true))
      .catch((err) => next(err));
  },
};

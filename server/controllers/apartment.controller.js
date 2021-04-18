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

    if (req.currentUser.role === Role.CLIENT) {
      options.where = { rented: false };
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
    const payload = {
      ...req.body,
      realtorId: req.currentUser.id,
    };

    await Apartment.create(payload)
      .then((data) => res.json(data))
      .catch((err) => {
        next(err);
      });
  },

  show: async (req, res) => {
    const apartmentId = req.apartment.id;
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

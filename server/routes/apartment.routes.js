const express = require('express');
const router = express.Router();
const authorize = require('../helpers/authorize');
const Role = require('../helpers/role');
const controller = require('../controllers/apartment.controller');

const db = require('../models');
const Apartment = db.Apartment;

const setApartment = async (req, res, next) => {
  await Apartment.findByPk(req.params.id, {
    include: [{ model: db.User, as: 'realtor', attributes: ['id', 'name'] }],
  })
    .then((apartment) => {
      if (!apartment) {
        return res.status(404).json({ message: 'Not found' });
      }

      if (
        req.method !== 'GET' &&
        // req.currentUser.role === Role.REALTOR &&
        // req.currentUser.id !== apartment.realtorId
        req.currentUser.role !== Role.REALTOR &&
        req.currentUser.role !== Role.ADMIN
      ) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.apartment = apartment;
      next();
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

router.get('/', authorize(), controller.index);
router.post('/', authorize([Role.ADMIN, Role.REALTOR]), controller.create);
router.get('/:id', authorize(), setApartment, controller.show);
router.patch(
  '/:id',
  authorize([Role.ADMIN, Role.REALTOR]),
  setApartment,
  controller.update,
);
router.delete(
  '/:id',
  authorize([Role.ADMIN, Role.REALTOR]),
  setApartment,
  controller.delete,
);

module.exports = router;

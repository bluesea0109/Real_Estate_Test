const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const db = require('../models');
const User = db.User;

const setUser = (req, res, next) => {
  if (req.currentUser.id === Number(req.params.id)) {
    return res.status(400).send({
      message: 'Not allowed to get own info',
    });
  }

  User.findByPk(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Not found',
        });
      }
      req.user = user;
      next();
    })
    .catch((err) => next(err));
};

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', setUser, controller.show);
router.patch('/:id', setUser, controller.update);
router.delete('/:id', setUser, controller.destroy);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/me.controller');

router.get('/', controller.show);
router.patch('/', controller.update);

module.exports = router;

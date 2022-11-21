const express                  = require('express');
const router                   = express.Router();
const iconEarningController   = require('../controllers/iconEarning.controller');
const {authenticate}           = require('../misc/passport');

router.get('/', authenticate, iconEarningController.getIconEarningData);
router.get('/:id', authenticate, iconEarningController.getIconEarningById);

module.exports = router;
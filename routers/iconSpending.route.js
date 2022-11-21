const express                  = require('express');
const router                   = express.Router();
const iconSpendingController   = require('../controllers/iconSpending.controller');
const {authenticate}           = require('../misc/passport');

router.get('/', authenticate, iconSpendingController.getIconSpendingData);
router.get('/:id', authenticate, iconSpendingController.getIconSpendingById);

module.exports = router;
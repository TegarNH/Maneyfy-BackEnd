const express                  = require('express');
const router                   = express.Router();
const spendingController       = require('../controllers/spending.controller');
const {authenticate}           = require('../misc/passport');

router.get('/', authenticate, spendingController.getSpendingData);
router.get('/:id', authenticate, spendingController.getSpendingById);
router.post('/', spendingController.createSpending);
router.put('/:id', spendingController.updateSpending);
router.delete('/:id', spendingController.deleteSpending);

module.exports = router;
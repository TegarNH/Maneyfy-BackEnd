const express                          = require('express');
const router                           = express.Router();
const categorySpendingController       = require('../controllers/categorySpending.controller');
const {authenticate}                   = require('../misc/passport');

router.get('/', authenticate, categorySpendingController.getCategorySpendingData);
router.get('/:id', authenticate, categorySpendingController.getCategorySpendingById);
router.post('/', categorySpendingController.createCategorySpending);
router.put('/:id', categorySpendingController.updateCategorySpending);
router.delete('/:id', categorySpendingController.deleteCategorySpending);

module.exports = router;
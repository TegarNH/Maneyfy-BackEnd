const express = require('express');
const router = express.Router();
const categorySpendingController = require('../controllers/categorySpending.controller');
const { authenticate } = require('../misc/passport');

router.get('/', authenticate, categorySpendingController.getAllCategorySpending);
router.get('/:id', authenticate, categorySpendingController.getCategorySpendingById);
router.post('/', authenticate, categorySpendingController.createCategorySpending);
router.put('/:id', authenticate, categorySpendingController.updateCategorySpending);
router.delete('/:id', authenticate, categorySpendingController.deleteCategorySpending);

module.exports = router;
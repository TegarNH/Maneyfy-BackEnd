const express = require('express');
const router = express.Router();
const categoryEarningController = require('../controllers/categoryEarning.controller');
const { authenticate } = require('../misc/passport');

router.get('/', authenticate, categoryEarningController.getAllCategoryEarning);
router.get('/:id', authenticate, categoryEarningController.getCategoryEarningById);
router.post('/', authenticate, categoryEarningController.createCategoryEarning);
router.put('/:id', authenticate, categoryEarningController.updateCategoryEarning);
router.delete('/:id', authenticate, categoryEarningController.deleteCategoryEarning);

module.exports = router;
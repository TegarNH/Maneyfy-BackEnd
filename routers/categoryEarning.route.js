const express                          = require('express');
const router                           = express.Router();
const categoryEarningController       = require('../controllers/categoryEarning.controller');
const {authenticate}                   = require('../misc/passport');

router.get('/', authenticate, categoryEarningController.getCategoryEarningData);
router.get('/:id', authenticate, categoryEarningController.getCategoryEarningById);
router.post('/', categoryEarningController.createCategoryEarning);
router.put('/:id', categoryEarningController.updateCategoryEarning);
router.delete('/:id', categoryEarningController.deleteCategoryEarning);

module.exports = router;
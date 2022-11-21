const express                 = require('express');
const router                  = express.Router();
const earningController       = require('../controllers/earning.controller');
const {authenticate}          = require('../misc/passport');

router.get('/', authenticate, earningController.getEarningData);
router.get('/:id', authenticate, earningController.getEarningById);
router.post('/', earningController.createEarning);
router.put('/:id', earningController.updateEarning);
router.delete('/:id', earningController.deleteEarning);

module.exports = router;
const express                = require('express');
const router                 = express.Router();
const iconDompetController   = require('../controllers/iconDompet.controller');
const {authenticate}         = require('../misc/passport');

router.get('/', authenticate, iconDompetController.getIconDompetData);
router.get('/:id', authenticate, iconDompetController.getIconDompetById);

module.exports = router;
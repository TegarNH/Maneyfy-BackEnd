const express = require('express');
const router = express.Router();
const iconDompetController = require('../controllers/iconDompet.controller');
const { authenticate } = require('../misc/passport');

router.get('/', authenticate, iconDompetController.getAllIconDompet);

module.exports = router;
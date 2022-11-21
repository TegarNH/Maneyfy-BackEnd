const express               = require('express');
const router                = express.Router();
const userRoutes            = require('./user.route');
const dompetRoutes          = require('./dompet.route');
const icondompetRoutes      = require('./iconDompet.route');
const spendingRoutes      = require('./spending.route');
const authController        = require('../controllers/auth.controller');
const { createValidationFor, checkValidationResult } = require('../misc/validator');



router.post('/register', createValidationFor('register'), checkValidationResult, authController.register);
router.post('/login', createValidationFor("login"), checkValidationResult, authController.login);
router.use('/user', userRoutes);
router.use('/dompet', dompetRoutes);
router.use('/iconDompet', icondompetRoutes);
router.use('/spending', spendingRoutes);


module.exports = router;
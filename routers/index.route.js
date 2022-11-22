const express                = require('express');
const router                 = express.Router();
const authController         = require('../controllers/auth.controller');
const userRoutes             = require('./user.route');
const dompetRoutes           = require('./dompet.route');
const iconDompetRoutes       = require('./iconDompet.route');

const spendingRoutes         = require('./spending.route');
const categorySpendingRoutes = require('./categorySpending.route');
const iconSpendingRoutes     = require('./iconSpending.route');

const earningRoutes          = require('./earning.route');
const categoryEarningRoutes  = require('./categoryEarning.route');
const iconEarningRoutes      = require('./iconEarning.route');
const { createValidationFor, checkValidationResult } = require('../misc/validator');



router.post('/register', createValidationFor('register'), checkValidationResult, authController.register);
router.post('/login', createValidationFor("login"), checkValidationResult, authController.login);
router.use('/user', userRoutes);
router.use('/dompet', dompetRoutes);
router.use('/iconDompet', iconDompetRoutes);

router.use('/spending', spendingRoutes);
router.use('/categorySpending', categorySpendingRoutes);
router.use('/iconSpending', iconSpendingRoutes);

router.use('/earning', earningRoutes);
router.use('/categoryEarning', categoryEarningRoutes);
router.use('/iconEarning', iconEarningRoutes);

module.exports = router;
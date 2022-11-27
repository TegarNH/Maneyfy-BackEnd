const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { authenticate } = require('../misc/passport');

router.get('/', authenticate, transactionController.getTransactionData);
router.post('/', authenticate, transactionController.createTransaction);

router.get('/:id', authenticate, transactionController.getTransactionById);
router.put('/:id', authenticate, transactionController.updateTransaction);
router.delete('/:id', authenticate, transactionController.deleteTransaction);

module.exports = router;
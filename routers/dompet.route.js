const express = require('express');
const router = express.Router();
const dompetController = require('../controllers/dompet.controler');
const { authenticate } = require('../misc/passport');

router.get('/data', authenticate, dompetController.getDompetData);
router.get('/:id', authenticate, dompetController.getDompetById);
router.post('/', authenticate, dompetController.createDompet);
router.put('/:id', authenticate, dompetController.updateDompet);
router.delete('/:id', authenticate, dompetController.deleteDompet);

module.exports = router;
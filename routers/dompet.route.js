const express              = require('express');
const router               = express.Router();
const dompetController       = require('../controllers/dompet.controler');
const {authenticate}         = require('../misc/passport');

router.get('/', authenticate, dompetController.getDompetData);
router.get('/:id', authenticate, dompetController.getDompetById);
router.post('/', dompetController.createDompet);
router.put('/:id', dompetController.updateDompet);
router.delete('/:id', dompetController.deleteDompet);

module.exports = router;
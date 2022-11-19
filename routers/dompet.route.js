const express              = require('express');
const router               = express.Router();
const dompetController       = require('../controllers/dompet.controler');
const imageUpload          = require('../misc/multer');
const {authenticate}         = require('../misc/passport');
const {uploadWithCloudinary} = require('../misc/cloudinary');

router.get('/dompet', authenticate, dompetController.getDompetData);

module.exports = router;
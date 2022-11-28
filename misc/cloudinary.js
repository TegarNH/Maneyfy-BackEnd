const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: 'dzskwtwm7',
  api_key: '313257553949257',
  api_secret: 'hHxm7JcRirpcPesNRaUEVlnxUJY'
});
const uploadWithCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
    } else {
      const folder = 'assets/${req.file.mimetype.split(' / ')[0]}';
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
        resource_type: "auto"
      });
      fs.unlinkSync(req.file.path);
      req.body.profile_picture = uploadResult.secure_url ? uploadResult.secure_url : null;
      next();
    }
  } catch (error) {
    fs.unlinkSync(req.file.path);
    console.log(error);
  }
};

module.exports = { uploadWithCloudinary };
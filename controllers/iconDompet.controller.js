const { IconDompet } = require('../models');

const getAllIconDompet = async (req, res) => {
  try {
    const iconDompets = await IconDompet.findAll();

    return res.status(200).json({
      status: "success",
      msg: "Semua Icon Dompet berhasil ditampilkan",
      data: iconDompets
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

module.exports = {
  getAllIconDompet
}
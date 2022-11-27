const { IconEarning } = require('../models');

const getAllIconEarning = async (req, res) => {
  try {
    const IconEarnings = await IconEarning.findAll();

    return res.status(200).json({
      status: "success",
      msg: "Semua Icon Earning berhasil ditampilkan",
      data: IconEarnings
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

module.exports = {
  getAllIconEarning
}
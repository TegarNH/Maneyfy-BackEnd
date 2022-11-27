const { IconSpending } = require('../models');

const getAllIconSpending = async (req, res) => {
  try {
    const IconSpendings = await IconSpending.findAll();

    return res.status(200).json({
      status: "success",
      msg: "Semua Icon Spending berhasil ditampilkan",
      data: IconSpendings
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

module.exports = {
  getAllIconSpending
}
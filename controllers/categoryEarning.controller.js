const { CategoryEarning, IconEarning } = require('../models');
const { Op } = require("sequelize");


const getAllCategoryEarning = async (req, res) => {
  try {
    const options = {
      where: {
        user_id: req.user.id,
      },
      include: {
        model: IconEarning
      },
    };

    const allCategoryEarnings = await CategoryEarning.findAll(options);

    return res.status(200).json({
      status: "success",
      msg: "Semua Category Earning berhasil ditampilkan",
      data: allCategoryEarnings
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const getCategoryEarningById = async (req, res) => {
  try {
    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      },
      include: {
        model: IconEarning
      },
    };

    const foundCategoryEarning = await CategoryEarning.findOne(options);

    if (!foundCategoryEarning) {
      return res.status(404).json({
        status: 'error',
        msg: `Category Earning dengan id ${req.params.id} tidak ditemukan`
      })
    }
    return res.status(200).json({
      status: 'success',
      result: foundCategoryEarning
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const createCategoryEarning = async (req, res) => {
  try {
    const { icEarning_id, categoryName_earning } = req.body;

    const createdCategoryEarning = await CategoryEarning.create({
      user_id: req.user.id,
      icEarning_id: icEarning_id,
      categoryName_earning: categoryName_earning
    });

    return res.status(201).json({
      status: 'success',
      result: createdCategoryEarning
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const updateCategoryEarning = async (req, res) => {
  try {
    const { icEarning_id, categoryName_earning } = req.body;

    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      }
    };

    const updatedCategoryEarning = await CategoryEarning.findOne(options);

    if (!updatedCategoryEarning) {
      return res.status(404).json({
        status: "Error",
        msg: `Category Earning dengan id ${req.params.id} tidak ditemukan`
      });
    }

    await updatedCategoryEarning.update({
      icEarning_id: icEarning_id,
      categoryName_earning: categoryName_earning
    });

    return res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: updatedCategoryEarning
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

const deleteCategoryEarning = async (req, res) => {
  try {
    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      }
    };

    const deletedCategoryEarning = await CategoryEarning.findOne(options);
    if (!deletedCategoryEarning) {
      return res.status(404).json({
        status: "Error",
        msg: `Category Earning dengan id ${req.params.id} tidak ditemukan`
      })
    }

    await deletedCategoryEarning.destroy();

    return res.status(200).json({
      status: 'success',
      msg: 'Category Earning berhasil dihapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

module.exports = {
  getAllCategoryEarning,
  getCategoryEarningById,
  createCategoryEarning,
  updateCategoryEarning,
  deleteCategoryEarning
}
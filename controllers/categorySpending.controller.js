const { sequelize, CategorySpending, IconSpending, Transaction } = require('../models');
const { Op } = require("sequelize");

const getAllCategorySpending = async (req, res) => {
  try {
    const options = {
      where: {
        user_id: req.user.id,
      },
      include: {
        model: IconSpending
      },
      order: sequelize.literal('id ASC'),
    };

    const allCategorySpendings = await CategorySpending.findAll(options);

    return res.status(200).json({
      status: "success",
      msg: "Semua Category Spending berhasil ditampilkan",
      data: allCategorySpendings
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const getCategorySpendingById = async (req, res) => {
  try {
    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      },
      include: {
        model: IconSpending
      },
    };

    const foundCategorySpending = await CategorySpending.findOne(options);

    if (!foundCategorySpending) {
      return res.status(404).json({
        status: 'error',
        msg: `Category Spending dengan id ${req.params.id} tidak ditemukan`
      })
    }
    return res.status(200).json({
      status: 'success',
      result: foundCategorySpending
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const createCategorySpending = async (req, res) => {
  try {
    const { icSpending_id, categoryName_spending } = req.body;

    const createdCategorySpending = await CategorySpending.create({
      user_id: req.user.id,
      icSpending_id: icSpending_id,
      categoryName_spending: categoryName_spending
    });

    return res.status(201).json({
      status: 'success',
      result: createdCategorySpending
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const updateCategorySpending = async (req, res) => {
  try {
    const { icSpending_id, categoryName_spending } = req.body;

    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      }
    };

    const updatedCategorySpending = await CategorySpending.findOne(options);

    if (!updatedCategorySpending) {
      return res.status(404).json({
        status: "Error",
        msg: `Category Spending dengan id ${req.params.id} tidak ditemukan`
      });
    }

    await updatedCategorySpending.update({
      icSpending_id: icSpending_id,
      categoryName_spending: categoryName_spending
    });

    return res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: updatedCategorySpending
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

const deleteCategorySpending = async (req, res) => {
  try {
    const { typeTransaction } = req.body;
    if (!typeTransaction) {
      return res.status(400).json({
        status: 'error',
        msg: 'request body harus diisi typeTransaction'
      });
    }

    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      }
    };

    const deletedCategorySpending = await CategorySpending.findOne(options);
    if (!deletedCategorySpending) {
      return res.status(404).json({
        status: "Error",
        msg: `Category Spending dengan id ${req.params.id} tidak ditemukan`
      })
    }

    await Transaction.destroy({
      where: {
        [Op.and]: [
          { categoryTransaction_id: deletedCategorySpending.id },
          { type_transaction: typeTransaction },
        ],
      }
    });

    await deletedCategorySpending.destroy();

    return res.status(200).json({
      status: 'success',
      msg: 'Category Spending berhasil dihapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

module.exports = {
  getAllCategorySpending,
  getCategorySpendingById,
  createCategorySpending,
  updateCategorySpending,
  deleteCategorySpending
}
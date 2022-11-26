const { Transaction, sequelize, CategoryEarning, IconEarning, CategorySpending, IconSpending } = require('../models');
const { Op } = require("sequelize");

const getTransactionData = async (req, res) => {
  try {
    const { month, year, category } = req.query;

    if (month && year) {
      if (category) {
        switch (category) {
          case "earning":
            const options = {
              attributes: ['user_id', 'type_transaction', 'categoryTransaction_id', 'dompet_id', 'amount_transaction', 'name_transaction', 'date_transaction'],
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
                  { user_id: 1 },
                  { dompet_id: 1 },
                  { type_transaction: "earning" },
                ],
              },
              include: {
                model: CategoryEarning,
                include: [IconEarning]
              },
              order: sequelize.literal('EXTRACT(DAY FROM date_transaction) DESC'),
            };

            const allProducts = await Transaction.findAll(options);

            return res.status(200).json({
              status: "success",
              msg: "Earning berhasil ditemukan",
              data: allProducts
            })
          case "spending":
            const options1 = {
              attributes: ['user_id', 'type_transaction', 'categoryTransaction_id', 'dompet_id', 'amount_transaction', 'name_transaction', 'date_transaction'],
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
                  { user_id: 1 },
                  { dompet_id: 1 },
                  { type_transaction: "spending" },
                ],
              },
              include: {
                model: CategorySpending,
                include: [IconSpending]
              },
              order: sequelize.literal('EXTRACT(DAY FROM date_transaction) DESC'),
            };

            const allProducts1 = await Transaction.findAll(options1);

            return res.status(200).json({
              status: "success",
              msg: "Spending berhasil ditemukan",
              data: allProducts1
            })
          default:
            return res.status(400).json({
              status: 'error',
              msg: 'parameter kategori harus earning atau spending'
            });
        }
      } else {
        const options2 = {
          attributes: ['user_id', 'type_transaction', 'categoryTransaction_id', 'dompet_id', 'amount_transaction', 'name_transaction', 'date_transaction'],
          where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
              { user_id: 1 },
              { dompet_id: 1 },
              { type_transaction: "earning" },
            ],
          },
          include: {
            model: CategoryEarning,
            include: [IconEarning]
          },
          order: sequelize.literal('EXTRACT(DAY FROM date_transaction) DESC'),
        };

        const options3 = {
          attributes: ['user_id', 'type_transaction', 'categoryTransaction_id', 'dompet_id', 'amount_transaction', 'name_transaction', 'date_transaction'],
          where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
              { user_id: 1 },
              { dompet_id: 1 },
              { type_transaction: "spending" },
            ],
          },
          include: {
            model: CategorySpending,
            include: [IconSpending]
          },
          order: sequelize.literal('id DESC'),
        };

        let allProducts2 = await Transaction.findAll(options2);
        const allProducts3 = await Transaction.findAll(options3);

        allProducts2 = allProducts2.concat(allProducts3).sort((a, b) => {
          return new Date(b.date_transaction).getTime() - new Date(a.date_transaction).getTime();
        });

        return res.status(200).json({
          status: "success",
          msg: "Transaksi berhasil ditemukan",
          data: allProducts2
        })
      }
    } else {
      return res.status(400).json({
        status: 'error',
        msg: 'parameter month atau year harus diisi'
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const getTransactionById = async (req, res) => {
  const foundTransaction = await Transaction.findByPk(req.params.id);

  if (!foundTransaction) {
    return res.status(404).json({
      msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
    })
  }
  res.status(200).json({
    status: 'success',
    result: foundTransaction
  })
}

const createTransaction = async (req, res) => {
  try {
    const { user_id, categoryTransaction_id, dompet_id, amount_transaction, name_transaction, date_transaction } = req.body;

    const createdTransaction = await Transaction.create({
      user_id: user_id,
      categoryTransaction_id: categoryTransaction_id,
      dompet_id: dompet_id,
      amount_transaction: amount_transaction,
      name_transaction: name_transaction,
      date_transaction: date_transaction
    });
    res.status(201).json({
      status: 'success',
      result: createdTransaction
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const updateTransaction = async (req, res) => {
  try {
    const { user_id, categoryTransaction_id, dompet_id, amount_transaction, name_transaction, date_transaction } = req.body;
    let id = req.Transaction.id;
    if (!(await Transaction.findByPk(id))) return res.status(404).json({
      status: "Error",
      msg: "Transaction not found!"
    });

    const updatedTransaction = await Transaction.update({
      user_id: user_id,
      categoryTransaction_id: categoryTransaction_id,
      dompet_id: dompet_id,
      amount_transaction: amount_transaction,
      name_transaction: name_transaction,
      date_transaction: date_transaction
    }, {
      where: {
        id: id
      }
    });

    res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: updatedTransaction[1]
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      msg: "Update data failed!",
      error: error
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTransaction) {
      return res.status(404).json({
        msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'Transaction berhasil dihapus'
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
};

module.exports = {
  getTransactionData,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
}
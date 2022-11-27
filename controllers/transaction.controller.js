const { Transaction, sequelize, CategoryEarning, IconEarning, CategorySpending, IconSpending } = require('../models');
const { Op } = require("sequelize");

const getTransactionData = async (req, res) => {
  try {
    const { month, year, category } = req.query;
    const { dompet_id } = req.body;

    if (!dompet_id) {
      return res.status(400).json({
        status: 'error',
        msg: 'request body harus diisi dompet_id'
      });
    }

    if (month && year) {
      if (!(parseInt(month) >= 1 && parseInt(month) <= 12)) {
        return res.status(400).json({
          status: 'error',
          msg: 'parameter month harus angka 1 sampai 12'
        });

      }
      if (category) {
        switch (category) {
          case "earning":
            const options = {
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
                  { user_id: req.user.id },
                  { dompet_id: dompet_id },
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
              msg: `Menampilkan Transaksi Earning pada dompet_id ${dompet_id} di bulan ${month}, tahun ${year}`,
              data: allProducts
            })
          case "spending":
            const options1 = {
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
                  { user_id: req.user.id },
                  { dompet_id: dompet_id },
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
              msg: `Menampilkan Transaksi Spending pada dompet_id ${dompet_id} di bulan ${month}, tahun ${year}`,
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
          where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
              { user_id: req.user.id },
              { dompet_id: dompet_id },
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
          where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
              { user_id: req.user.id },
              { dompet_id: dompet_id },
              { type_transaction: "spending" },
            ],
          },
          include: {
            model: CategorySpending,
            include: [IconSpending]
          },
          order: sequelize.literal('EXTRACT(DAY FROM date_transaction) DESC'),
        };

        let allProducts2 = await Transaction.findAll(options2);
        const allProducts3 = await Transaction.findAll(options3);

        allProducts2 = allProducts2.concat(allProducts3).sort((a, b) => {
          return new Date(b.date_transaction).getTime() - new Date(a.date_transaction).getTime();
        });

        return res.status(200).json({
          status: "success",
          msg: `Menampilkan Semua Transaksi pada dompet_id ${dompet_id} di bulan ${month}, tahun ${year}`,
          data: allProducts2
        })
      }
    } else {
      return res.status(400).json({
        status: 'error',
        msg: 'parameter month dan year harus diisi'
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
  const options = {
    where: {
      [Op.and]: [
        { user_id: req.user.id },
        { id: req.params.id },
      ],
    },
  };

  const foundTransaction = await Transaction.findOne(options);

  if (!foundTransaction) {
    return res.status(404).json({
      status: 'Not Found',
      msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
    })
  } else {
    if (foundTransaction.type_transaction === "earning") {
      const options = {
        where: {
          id: req.params.id
        },
        include: {
          model: CategoryEarning,
          include: [IconEarning]
        },
      };

      const foundTransaction = await Transaction.findOne(options);
      res.status(200).json({
        status: 'success transaction earning',
        result: foundTransaction
      })
    } else {
      const options = {
        where: {
          id: req.params.id
        },
        include: {
          model: CategorySpending,
          include: [IconSpending]
        },
      };

      const foundTransaction = await Transaction.findOne(options);
      res.status(200).json({
        status: 'success transaction spending',
        result: foundTransaction
      })
    }

  }
}

const createTransaction = async (req, res) => {
  try {
    const { type_transaction, categoryTransaction_id, dompet_id, amount_transaction, name_transaction, date_transaction } = req.body;

    const createdTransaction = await Transaction.create({
      user_id: req.user.id,
      type_transaction: type_transaction,
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
    const { type_transaction, categoryTransaction_id, dompet_id, amount_transaction, name_transaction, date_transaction } = req.body;

    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      },
    };

    const foundTransaction = await Transaction.findOne(options);

    if (!foundTransaction) {
      return res.status(404).json({
        status: 'Not Found',
        msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
      })
    }

    foundTransaction.update({
      type_transaction: type_transaction,
      categoryTransaction_id: categoryTransaction_id,
      dompet_id: dompet_id,
      amount_transaction: amount_transaction,
      name_transaction: name_transaction,
      date_transaction: date_transaction
    });

    res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: foundTransaction
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error: error.message
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.destroy({
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      },
    });
    if (!deletedTransaction) {
      return res.status(404).json({
        error: 'Failed Delete',
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
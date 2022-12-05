const { sequelize, Transaction, Dompet, CategoryEarning, IconEarning, CategorySpending, IconSpending } = require('../models');
const { Op } = require("sequelize");

const updateAmountDompet = async (user_id, dompet_id) => {
  // 1. CALCULATE ALL TRANSACTION EARNING BASED dompet_id
  const optionsEarning = {
    attributes: ['amount_transaction'],
    where: {
      [Op.and]: [
        { user_id: user_id },
        { dompet_id: dompet_id },
        { type_transaction: "earning" },
      ],
    }
  };
  const amountEarnings = await Transaction.findAll(optionsEarning);
  let totalEarning = 0;
  amountEarnings.forEach(transaction => {
    totalEarning += transaction.amount_transaction;
  });

  // 2. CALCULATE ALL TRANSACTION SPENDING BASED dompet_id
  const optionsSpending = {
    attributes: ['amount_transaction'],
    where: {
      [Op.and]: [
        { user_id: user_id },
        { dompet_id: dompet_id },
        { type_transaction: "spending" },
      ],
    }
  };
  const amountSpendings = await Transaction.findAll(optionsSpending);
  let totalSpending = 0;
  amountSpendings.forEach(transaction => {
    totalSpending += transaction.amount_transaction;
  });

  // 3. FIND DOMPET BY dompet_id, user_id TO UPDATE AMOUNT DOMPET
  const optionsDompet = {
    where: {
      [Op.and]: [
        { id: dompet_id },
        { user_id: user_id },
      ],
    },
  };
  const foundDompet = await Dompet.findOne(optionsDompet);

  // 4. CALCULATE TOTAL EARNING AND SPENDING, UPDATE TO DATABASE
  const totalAmount = totalEarning - totalSpending;
  await foundDompet.update({
    amount: totalAmount
  });

  return totalAmount;
}

const getTransactionData = async (req, res) => {
  try {
    const { idDompet, month, year } = req.query;

    if (!idDompet) {
      return res.status(400).json({
        status: 'error',
        msg: 'parameter idDompet harus diisi'
      });
    }

    if (month && year) {
      if (!(parseInt(month) >= 1 && parseInt(month) <= 12)) {
        return res.status(400).json({
          status: 'error',
          msg: 'parameter month harus angka 1 sampai 12'
        });
      }

      const optionsEarning = {
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
            { user_id: req.user.id },
            { dompet_id: idDompet },
            { type_transaction: "earning" },
          ],
        },
        include: {
          model: CategoryEarning,
          include: [IconEarning]
        },
        order: sequelize.literal('EXTRACT(DAY FROM date_transaction) DESC'),
      };

      const optionsSpending = {
        where: {
          [Op.and]: [
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_transaction')), parseInt(year)),
            sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_transaction')), parseInt(month)),
            { user_id: req.user.id },
            { dompet_id: idDompet },
            { type_transaction: "spending" },
          ],
        },
        include: {
          model: CategorySpending,
          include: [IconSpending]
        },
        order: sequelize.literal('EXTRACT(DAY FROM date_transaction) DESC'),
      };

      let transactionEarnings = await Transaction.findAll(optionsEarning);
      const transactionSpendings = await Transaction.findAll(optionsSpending);

      // CALCULATE AMOUNT TRANSACTION //
      let totalEarning = 0;
      transactionEarnings.forEach(transaction => {
        totalEarning += transaction.amount_transaction;
      });

      let totalSpending = 0;
      transactionSpendings.forEach(transaction => {
        totalSpending += transaction.amount_transaction;
      });

      // JOIN JSON transactionEarnings AND transactionSpendings, SORT BY DATE (DESC) //
      transactionEarnings = transactionEarnings.concat(transactionSpendings).sort((a, b) => {
        return new Date(b.date_transaction).getTime() - new Date(a.date_transaction).getTime();
      });

      return res.status(200).json({
        status: "success",
        msg: `Menampilkan Semua Transaksi pada dompet_id ${idDompet} di bulan ${month}, tahun ${year}`,
        totalEarning: totalEarning,
        totalSpending: totalSpending,
        data: transactionEarnings
      })
    } else {
      return res.status(400).json({
        status: 'error',
        msg: 'parameter month dan year harus diisi'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
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
      return res.status(200).json({
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
      return res.status(200).json({
        status: 'success transaction spending',
        result: foundTransaction
      })
    }

  }
}

const createTransaction = async (req, res) => {
  try {
    const { type_transaction, categoryTransaction_id, dompet_id, amount_transaction, name_transaction, date_transaction } = req.body;
    const user_id = req.user.id;

    const createdTransaction = await Transaction.create({
      user_id: user_id,
      type_transaction: type_transaction,
      categoryTransaction_id: categoryTransaction_id,
      dompet_id: dompet_id,
      amount_transaction: amount_transaction,
      name_transaction: name_transaction,
      date_transaction: date_transaction
    });

    const updatedAmount = await updateAmountDompet(user_id, dompet_id);

    return res.status(201).json({
      status: 'success',
      AmountDompet: updatedAmount,
      result: createdTransaction
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const updateTransaction = async (req, res) => {
  try {
    const { type_transaction, categoryTransaction_id, dompet_id, amount_transaction, name_transaction, date_transaction } = req.body;
    const user_id = req.user.id;

    const options = {
      where: {
        [Op.and]: [
          { user_id: user_id },
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

    await foundTransaction.update({
      type_transaction: type_transaction,
      categoryTransaction_id: categoryTransaction_id,
      amount_transaction: amount_transaction,
      name_transaction: name_transaction,
      date_transaction: date_transaction
    });

    const updatedAmount = await updateAmountDompet(user_id, dompet_id);

    return res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      AmountDompet: updatedAmount,
      data: foundTransaction
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      error: error.message
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const user_id = req.user.id;
    const options = {
      where: {
        [Op.and]: [
          { user_id: user_id },
          { id: req.params.id },
        ],
      }
    };

    const foundTransaction = await Transaction.findOne(options);
    const dompetIdTransaction = foundTransaction.dompet_id;

    if (!foundTransaction) {
      return res.status(404).json({
        error: 'Failed Delete',
        msg: `Transaction dengan id ${req.params.id} tidak ditemukan`
      });
    }

    await foundTransaction.destroy();
    const updatedAmount = await updateAmountDompet(user_id, dompetIdTransaction);

    return res.status(200).json({
      status: 'success',
      msg: 'Transaction berhasil dihapus',
      AmountDompet: updatedAmount
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
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
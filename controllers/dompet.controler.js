const { sequelize, Dompet, IconDompet, Transaction } = require('../models');
const { Op } = require("sequelize");

const getAllDompet = async (req, res) => {
  try {
    const options = {
      where: {
        user_id: req.user.id,
      },
      include: {
        model: IconDompet
      },
      order: sequelize.literal('id ASC'),
    };

    const allDompets = await Dompet.findAll(options);

    return res.status(200).json({
      status: "success",
      msg: "Semua Dompet berhasil ditampilkan",
      data: allDompets
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const getDompetById = async (req, res) => {
  try {
    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      },
      include: {
        model: IconDompet
      },
    };

    const foundDompet = await Dompet.findOne(options);

    if (!foundDompet) {
      return res.status(404).json({
        status: 'error',
        msg: `Dompet dengan id ${req.params.id} tidak ditemukan`
      })
    }
    return res.status(200).json({
      status: 'success',
      result: foundDompet
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const getTransactionByIdDompet = async (req, res) => {
  try {
    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      },
      include: [IconDompet, Transaction],
    };

    const foundDompet = await Dompet.findOne(options);

    if (!foundDompet) {
      return res.status(404).json({
        status: 'error',
        msg: `Dompet dengan id ${req.params.id} tidak ditemukan`
      })
    }
    return res.status(200).json({
      status: 'success',
      result: foundDompet
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const createDompet = async (req, res) => {
  try {
    const { icDompet_id, name_dompet } = req.body;

    const createdDompet = await Dompet.create({
      user_id: req.user.id,
      icDompet_id: icDompet_id,
      name_dompet: name_dompet,
      amount: 0
    });
    return res.status(201).json({
      status: 'success',
      result: createdDompet
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const updateDompet = async (req, res) => {
  try {
    const { icDompet_id, name_dompet } = req.body;

    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      }
    };

    const updatedDompet = await Dompet.findOne(options);

    if (!updatedDompet) {
      return res.status(404).json({
        status: "Error",
        msg: `Dompet dengan id ${req.params.id} tidak ditemukan`
      });
    }

    await updatedDompet.update({
      icDompet_id: icDompet_id,
      name_dompet: name_dompet
    });

    return res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: updatedDompet
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

const deleteDompet = async (req, res) => {
  try {
    const options = {
      where: {
        [Op.and]: [
          { user_id: req.user.id },
          { id: req.params.id },
        ],
      }
    };

    const deletedDompet = await Dompet.findOne(options);
    if (!deletedDompet) {
      return res.status(404).json({
        status: "Error",
        msg: `Dompet dengan id ${req.params.id} tidak ditemukan`
      })
    }

    await Transaction.destroy({ where: { dompet_id: deletedDompet.id } });

    await deletedDompet.destroy();

    return res.status(200).json({
      status: 'success',
      msg: 'Dompet berhasil dihapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

module.exports = {
  getAllDompet,
  getDompetById,
  getTransactionByIdDompet,
  createDompet,
  updateDompet,
  deleteDompet
}
const { Earning, sequelize, CategoryEarning, IconEarning, CategorySpending, IconSpending } = require('../models');
const { Op } = require("sequelize");

const getEarningData = async (req, res) => {
  try {
    const { month, year, category } = req.query;

    if (month && year) {
      if (category) {
        switch (category) {
          case "earning":
            const options = {
              attributes: ['user_id', 'type_transaction', 'categoryEarning_id', 'dompet_id', 'earning', 'name_earning', 'date_earning'],
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_earning')), parseInt(year)),
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_earning')), parseInt(month)),
                  { user_id: 1 },
                  { dompet_id: 1 },
                  { type_transaction: "earning" },
                ],
              },
              include: {
                model: CategoryEarning,
                include: [IconEarning]
              },
              order: sequelize.literal('EXTRACT(DAY FROM date_earning) DESC'),
            };

            const allProducts = await Earning.findAll(options);

            return res.status(200).json({
              status: "success",
              msg: "Earning berhasil ditemukan",
              data: allProducts
            })
          case "spending":
            const options1 = {
              attributes: ['user_id', 'type_transaction', 'categoryEarning_id', 'dompet_id', 'earning', 'name_earning', 'date_earning'],
              where: {
                [Op.and]: [
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_earning')), parseInt(year)),
                  sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_earning')), parseInt(month)),
                  { user_id: 1 },
                  { dompet_id: 1 },
                  { type_transaction: "spending" },
                ],
              },
              include: {
                model: CategorySpending,
                include: [IconSpending]
              },
              order: sequelize.literal('EXTRACT(DAY FROM date_earning) DESC'),
            };

            const allProducts1 = await Earning.findAll(options1);

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
          attributes: ['user_id', 'type_transaction', 'categoryEarning_id', 'dompet_id', 'earning', 'name_earning', 'date_earning'],
          where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_earning')), parseInt(year)),
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_earning')), parseInt(month)),
              { user_id: 1 },
              { dompet_id: 1 },
              { type_transaction: "earning" },
            ],
          },
          include: {
            model: CategoryEarning,
            include: [IconEarning]
          },
          order: sequelize.literal('EXTRACT(DAY FROM date_earning) DESC'),
        };

        const options3 = {
          attributes: ['user_id', 'type_transaction', 'categoryEarning_id', 'dompet_id', 'earning', 'name_earning', 'date_earning'],
          where: {
            [Op.and]: [
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date_earning')), parseInt(year)),
              sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date_earning')), parseInt(month)),
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

        let allProducts2 = await Earning.findAll(options2);
        const allProducts3 = await Earning.findAll(options3);

        allProducts2 = allProducts2.concat(allProducts3).sort((a, b) => {
          return new Date(b.date_earning).getTime() - new Date(a.date_earning).getTime();
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

const getEarningById = async (req, res) => {
  const foundEarning = await Earning.findByPk(req.params.id);

  if (!foundEarning) {
    return res.status(404).json({
      msg: `Earning dengan id ${req.params.id} tidak ditemukan`
    })
  }
  res.status(200).json({
    status: 'success',
    result: foundEarning
  })
}

const createEarning = async (req, res) => {
  try {
    const { user_id, categoryEarning_id, dompet_id, earning, name_earning, date_earning } = req.body;

    const createdEarning = await Earning.create({
      user_id: user_id,
      categoryEarning_id: categoryEarning_id,
      dompet_id: dompet_id,
      earning: earning,
      name_earning: name_earning,
      date_earning: date_earning
    });
    res.status(201).json({
      status: 'success',
      result: createdEarning
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const updateEarning = async (req, res) => {
  try {
    const { user_id, categoryEarning_id, dompet_id, earning, name_earning, date_earning } = req.body;
    let id = req.Earning.id;
    if (!(await Earning.findByPk(id))) return res.status(404).json({
      status: "Error",
      msg: "Earning not found!"
    });

    const updatedEarning = await Earning.update({
      user_id: user_id,
      categoryEarning_id: categoryEarning_id,
      dompet_id: dompet_id,
      earning: earning,
      name_earning: name_earning,
      date_earning: date_earning
    }, {
      where: {
        id: id
      }
    });

    res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: updatedEarning[1]
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      msg: "Update data failed!",
      error: error
    });
  }
};

const deleteEarning = async (req, res) => {
  try {
    const deletedEarning = await Earning.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedEarning) {
      return res.status(404).json({
        msg: `Earning dengan id ${req.params.id} tidak ditemukan`
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'Earning berhasil dihapus'
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
};

module.exports = {
  getEarningData,
  getEarningById,
  createEarning,
  updateEarning,
  deleteEarning
}
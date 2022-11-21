const { IconSpending }             = require('../models');

const getIconSpendingData = async (req, res) => {
    try {
        const foundIconSpending = await IconSpending.findByPk(req.IconSpending.id, {
            attributes: [ 'url_icSpending' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Icon Spending berhasil ditemukan",
            data: foundIconSpending
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getIconSpendingById = async (req, res) => {
    const foundIconSpending = await IconSpending.findByPk(req.params.id);

    if (!foundIconSpending) {
        return res.status(404).json({
            msg: `Icon Spending dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundIconSpending
    })
}

module.exports = {
    getIconSpendingData,
    getIconSpendingById
}
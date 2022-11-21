const { IconEarning }             = require('../models');

const getIconEarningData = async (req, res) => {
    try {
        const foundIconEarning = await IconEarning.findByPk(req.IconEarning.id, {
            attributes: [ 'url_icEarning' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Icon Earning berhasil ditemukan",
            data: foundIconEarning
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getIconEarningById = async (req, res) => {
    const foundIconEarning = await IconEarning.findByPk(req.params.id);

    if (!foundIconEarning) {
        return res.status(404).json({
            msg: `Icon Earning dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundIconEarning
    })
}

module.exports = {
    getIconEarningData,
    getIconEarningById
}
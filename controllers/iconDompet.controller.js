const { IconDompet }             = require('../models');

const getIconDompetData = async (req, res) => {
    try {
        const foundIconDompet = await IconDompet.findByPk(req.IconDompet.id, {
            attributes: [ 'url_icDompet' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "IconDompet berhasil ditemukan",
            data: foundIconDompet
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getIconDompetById = async (req, res) => {
    const foundIconDompet = await IconDompet.findByPk(req.params.id);

    if (!foundIconDompet) {
        return res.status(404).json({
            msg: `IconDompet dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundIconDompet
    })
}

module.exports = {
    getIconDompetData,
    getIconDompetById
}
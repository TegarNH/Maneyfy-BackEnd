const { IconDompet }             = require('../models');

const getIconDompetData = async (req, res) => {
    try {

      const options = {
        attributes: ['id', 'url_icDompet']
    };

    const allProducts = await IconDompet.findAll(options);

    const result = allProducts.map((eachProduct) => {
        return {
            id: eachProduct.id,
            url_icDompet: eachProduct.url_icDompet
        }
      })


        // const foundIconDompet = await IconDompet.findByPk(req.IconDompet.id, {
        //     attributes: [ 'url_icDompet' ],
        // });
        
        return res.status(200).json({
            status: "success",
            msg: "Icon Dompet berhasil ditemukan",
            data: result
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
            msg: `Icon Dompet dengan id ${req.params.id} tidak ditemukan`
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
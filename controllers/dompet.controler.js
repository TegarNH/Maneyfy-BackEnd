const { Dompet }             = require('../models');

const getDompetData = async (req, res) => {
    try {
        const foundDompet = await Dompet.findByPk(req.Dompet.id, {
            attributes: [ 'user_id', 'icDompet_id', 'name_dompet', 'amount', 'url' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Dompet berhasil ditemukan",
            data: foundDompet
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getDompetById = async (req, res) => {
    const foundDompet = await Dompet.findByPk(req.params.id);

    if (!foundDompet) {
        return res.status(404).json({
            msg: `Dompet dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundDompet
    })
}

const createDompet = async (req, res) => {
    try {
        const { user_id, icDompet_id, name_dompet, amount, url } = req.body;
    
        const createdDompet = await Dompet.create({
            user_id: user_id,
            icDompet_id: icDompet_id,
            name_dompet: name_dompet,
            amount: amount,
            url: url
        });
        res.status(201).json({
            status: 'success',
            result: createdDompet
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

const updateDompet = async (req, res) => {
    try {
        const { user_id, icDompet_id, name_dompet, amount, url } = req.body;
        let id = req.Dompet.id;
        if(!( await Dompet.findByPk(id))) return res.status(404).json({
          status:"Error",
          msg:"Dompet not found!"
        });
        
        const updatedDompet = await Dompet.update({
            user_id: user_id,
            icDompet_id: icDompet_id,
            name_dompet: name_dompet,
            amount: amount,
            url: url
        }, {
            where: {
                id: id
            }
        });
  
        res.status(201).json({
            status: "Success",
            msg: "Data updated successfully",
            data: updatedDompet[1]
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            msg: "Update data failed!",
            error: error
        });
    }
};

const deleteDompet = async (req, res) => {
    try{
        const deletedDompet = await Dompet.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedDompet) {
          return res.status(404).json({
            msg: `Dompet dengan id ${req.params.id} tidak ditemukan`
        })
        }
        res.status(200).json({ 
            status: 'success',
            msg: 'Dompet berhasil dihapus'
        })
    } catch(err){
      return res.status(500).json({
        status: 'error',
        msg: err.message
      })
    }
};

module.exports = {
    getDompetData,
    getDompetById,
    createDompet,
    updateDompet,
    deleteDompet
}
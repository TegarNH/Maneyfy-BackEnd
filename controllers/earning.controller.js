const { Earning }             = require('../models');

const getEarningData = async (req, res) => {
    try {
        const foundEarning = await Earning.findByPk(req.Earning.id, {
            attributes: [ 'user_id', 'kategoriEarning_id', 'dompet_id', 'earning', 'name_earning' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Earning berhasil ditemukan",
            data: foundEarning
        })
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
        const { user_id, kategoriEarning_id, dompet_id, earning, name_earning } = req.body;
    
        const createdEarning = await Earning.create({
            user_id: user_id,
            kategoriEarning_id: kategoriEarning_id,
            dompet_id: dompet_id,
            earning: earning,
            name_earning: name_earning
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
        const { user_id, kategoriEarning_id, dompet_id, earning, name_earning } = req.body;
        let id = req.Earning.id;
        if(!( await Earning.findByPk(id))) return res.status(404).json({
          status:"Error",
          msg:"Earning not found!"
        });
        
        const updatedEarning = await Earning.update({
            user_id: user_id,
            kategoriEarning_id: kategoriEarning_id,
            dompet_id: dompet_id,
            earning: earning,
            name_earning: name_earning
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
    try{
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
    } catch(err){
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
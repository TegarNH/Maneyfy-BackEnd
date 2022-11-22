const { Spending }             = require('../models');

const getSpendingData = async (req, res) => {
    try {
        const foundSpending = await Spending.findByPk(req.Spending.id, {
            attributes: [ 'user_id', 'categorySpending_id', 'dompet_id', 'spending', 'name_spending', 'date_spending' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Spending berhasil ditemukan",
            data: foundSpending
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getSpendingById = async (req, res) => {
    const foundSpending = await Spending.findByPk(req.params.id);

    if (!foundSpending) {
        return res.status(404).json({
            msg: `Spending dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundSpending
    })
}

const createSpending = async (req, res) => {
    try {
        const { user_id, categorySpending_id, dompet_id, spending, name_spending, date_spending } = req.body;
    
        const createdSpending = await Spending.create({
            user_id: user_id,
            categorySpending_id: categorySpending_id,
            dompet_id: dompet_id,
            spending: spending,
            name_spending: name_spending,
            date_spending: date_spending
        });
        res.status(201).json({
            status: 'success',
            result: createdSpending
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

const updateSpending = async (req, res) => {
    try {
        const { user_id, categorySpending_id, dompet_id, spending, name_spending, date_spending } = req.body;
        let id = req.Spending.id;
        if(!( await Spending.findByPk(id))) return res.status(404).json({
          status:"Error",
          msg:"Spending not found!"
        });
        
        const updatedSpending = await Spending.update({
            user_id: user_id,
            categorySpending_id: categorySpending_id,
            dompet_id: dompet_id,
            spending: spending,
            name_spending: name_spending,
            date_spending: date_spending
        }, {
            where: {
                id: id
            }
        });
  
        res.status(201).json({
            status: "Success",
            msg: "Data updated successfully",
            data: updatedSpending[1]
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            msg: "Update data failed!",
            error: error
        });
    }
};

const deleteSpending = async (req, res) => {
    try{
        const deletedSpending = await Spending.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedSpending) {
          return res.status(404).json({
            msg: `Spending dengan id ${req.params.id} tidak ditemukan`
        })
        }
        res.status(200).json({ 
            status: 'success',
            msg: 'Spending berhasil dihapus'
        })
    } catch(err){
      return res.status(500).json({
        status: 'error',
        msg: err.message
      })
    }
};

module.exports = {
    getSpendingData,
    getSpendingById,
    createSpending,
    updateSpending,
    deleteSpending
}
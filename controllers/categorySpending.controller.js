const { CategorySpending }             = require('../models');

const getCategorySpendingData = async (req, res) => {
    try {
        const foundCategorySpending = await CategorySpending.findByPk(req.CategorySpending.id, {
            attributes: [ 'user_id', 'icSpending_id', 'categoryName_spending' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Category Spending berhasil ditemukan",
            data: foundCategorySpending
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getCategorySpendingById = async (req, res) => {
    const foundCategorySpending = await CategorySpending.findByPk(req.params.id);

    if (!foundCategorySpending) {
        return res.status(404).json({
            msg: `Category Spending dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundCategorySpending
    })
}

const createCategorySpending = async (req, res) => {
    try {
        const { user_id, icSpending_id, categoryName_spending } = req.body;
    
        const createdCategorySpending = await CategorySpending.create({
            user_id: user_id,
            icSpending_id: icSpending_id,
            categoryName_spending: categoryName_spending
        });
        res.status(201).json({
            status: 'success',
            result: createdCategorySpending
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

const updateCategorySpending = async (req, res) => {
    try {
        const { user_id, icSpending_id, categoryName_spending } = req.body;
        let id = req.CategorySpending.id;
        if(!( await CategorySpending.findByPk(id))) return res.status(404).json({
          status:"Error",
          msg:"Category Spending not found!"
        });
        
        const updatedCategorySpending = await CategorySpending.update({
            user_id: user_id,
            icSpending_id: icSpending_id,
            categoryName_spending: categoryName_spending
        }, {
            where: {
                id: id
            }
        });
  
        res.status(201).json({
            status: "Success",
            msg: "Data updated successfully",
            data: updatedCategorySpending[1]
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            msg: "Update data failed!",
            error: error
        });
    }
};

const deleteCategorySpending = async (req, res) => {
    try{
        const deletedCategorySpending = await CategorySpending.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedCategorySpending) {
          return res.status(404).json({
            msg: `Category Spending dengan id ${req.params.id} tidak ditemukan`
        })
        }
        res.status(200).json({ 
            status: 'success',
            msg: 'Category Spending berhasil dihapus'
        })
    } catch(err){
      return res.status(500).json({
        status: 'error',
        msg: err.message
      })
    }
};

module.exports = {
    getCategorySpendingData,
    getCategorySpendingById,
    createCategorySpending,
    updateCategorySpending,
    deleteCategorySpending
}
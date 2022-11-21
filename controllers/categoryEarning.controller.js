const { CategoryEarning }             = require('../models');

const getCategoryEarningData = async (req, res) => {
    try {
        const foundCategoryEarning = await CategoryEarning.findByPk(req.CategoryEarning.id, {
            attributes: [ 'user_id', 'icEarning_id', 'categoryName_earning' ],
        });
        
        return res.status(200).json({
            status: "success",
            msg: "Category Earning berhasil ditemukan",
            data: foundCategoryEarning
        })
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            msg: err.message
          }) 
    }
}

const getCategoryEarningById = async (req, res) => {
    const foundCategoryEarning = await CategoryEarning.findByPk(req.params.id);

    if (!foundCategoryEarning) {
        return res.status(404).json({
            msg: `Category Earning dengan id ${req.params.id} tidak ditemukan`
        })
    }
    res.status(200).json({
        status: 'success',
        result: foundCategoryEarning
    })
}

const createCategoryEarning = async (req, res) => {
    try {
        const { user_id, icEarning_id, categoryName_earning } = req.body;
    
        const createdCategoryEarning = await CategoryEarning.create({
            user_id: user_id,
            icEarning_id: icEarning_id,
            categoryName_earning: categoryName_earning
        });
        res.status(201).json({
            status: 'success',
            result: createdCategoryEarning
        });
    } catch (error) {
        return res.status(500).json({
          status: 'error',
          msg: err.message
        })
    }
}

const updateCategoryEarning = async (req, res) => {
    try {
        const { user_id, icEarning_id, categoryName_earning } = req.body;
        let id = req.CategoryEarning.id;
        if(!( await CategoryEarning.findByPk(id))) return res.status(404).json({
          status:"Error",
          msg:"Category Earning not found!"
        });
        
        const updatedCategoryEarning = await CategoryEarning.update({
            user_id: user_id,
            icEarning_id: icEarning_id,
            categoryName_earning: categoryName_earning
        }, {
            where: {
                id: id
            }
        });
  
        res.status(201).json({
            status: "Success",
            msg: "Data updated successfully",
            data: updatedCategoryEarning[1]
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            msg: "Update data failed!",
            error: error
        });
    }
};

const deleteCategoryEarning = async (req, res) => {
    try{
        const deletedCategoryEarning = await CategoryEarning.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!deletedCategoryEarning) {
          return res.status(404).json({
            msg: `Category Earning dengan id ${req.params.id} tidak ditemukan`
        })
        }
        res.status(200).json({ 
            status: 'success',
            msg: 'Category Earning berhasil dihapus'
        })
    } catch(err){
      return res.status(500).json({
        status: 'error',
        msg: err.message
      })
    }
};

module.exports = {
    getCategoryEarningData,
    getCategoryEarningById,
    createCategoryEarning,
    updateCategoryEarning,
    deleteCategoryEarning
}
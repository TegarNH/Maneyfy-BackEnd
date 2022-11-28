const { User, sequelize } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const queryInterface = sequelize.getQueryInterface();
const dompetsData = require('../masterdata/Dompet.json');
const categoryEarningsData = require('../masterdata/categoryEarning.json');
const categorySpendingsData = require('../masterdata/categorySpending.json');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const foundUser = await User.findOne({
      where: {
        email: email
      }
    });

    if (foundUser) {
      return res.status(404).json({
        status: 'Failed',
        msg: `Email sudah terdaftar`
      })
    }

    const createdUser = await User.create({
      name: name,
      email: email,
      password: password,
      profile_picture: "https://res.cloudinary.com/dzskwtwm7/image/upload/v1669220512/user/user_quy29n.webp"
    });

    // Initial Data Dompet
    const dataDompetsToBeSeeded = dompetsData.map((eachDompetData) => {
      return {
        user_id: createdUser.id,
        icDompet_id: eachDompetData.icDompet_id,
        name_dompet: eachDompetData.name_dompet,
        amount: eachDompetData.amount,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Dompets', dataDompetsToBeSeeded, {});

    // Initial Data Category Earning
    const dataEarningsToBeSeeded = categoryEarningsData.map((eachEarningData) => {
      return {
        user_id: createdUser.id,
        icEarning_id: eachEarningData.icEarning_id,
        categoryName_earning: eachEarningData.categoryName_earning,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('CategoryEarnings', dataEarningsToBeSeeded, {});

    // Initial Data Category Spending
    const dataSpendingsToBeSeeded = categorySpendingsData.map((eachSpendingData) => {
      return {
        user_id: createdUser.id,
        icSpending_id: eachSpendingData.icSpending_id,
        categoryName_spending: eachSpendingData.categoryName_spending,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('CategorySpendings', dataSpendingsToBeSeeded, {});

    return res.status(201).json({
      status: 'success',
      msg: 'User created successfully',
      data: createdUser
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({
    where: {
      email: email
    }
  });

  if (!foundUser) {
    return res.status(404).json({
      status: 'Failed',
      msg: `Email not registered`
    })
  }

  const isValidPassword = bcrypt.compareSync(password, foundUser.password);
  if (isValidPassword) {
    const payload = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({
      msg: "Login Success",
      token: token,
      dataUser: foundUser
    });
  };
  return res.status(400).json({
    status: 'Failed',
    msg: 'Wrong email or password'
  });
};

module.exports = {
  register,
  login
}
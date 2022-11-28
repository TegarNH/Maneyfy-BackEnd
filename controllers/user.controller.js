const { User, Dompet, Transaction, CategoryEarning, CategorySpending } = require('../models');

const getUserData = async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.user.id);

    return res.status(200).json({
      status: "success",
      msg: "User berhasil ditemukan",
      data: foundUser
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, email, profile_picture } = req.body;
    let profile_picture_temp = profile_picture

    const idUser = req.user.id;

    // search user by token
    const foundUser = await User.findByPk(idUser);
    // Check if user found based on token
    if (!foundUser) {
      return res.status(404).json({
        status: 'Error',
        msg: `User not found!`
      })
    }

    if (!profile_picture_temp) {
      profile_picture_temp = 'https://res.cloudinary.com/dzskwtwm7/image/upload/v1669220512/user/user_quy29n.webp';
    }

    // search user by email
    const foundUserbyEmail = await User.findOne({
      where: {
        email: email
      }
    });

    // Check if user found based on email (cek conflict)
    if (foundUserbyEmail) {
      // Kalau emailnya sama dengan email sebelumnya, tetap bisa update 
      if (foundUserbyEmail.email === foundUser.email) {
        await foundUser.update({
          name: name,
          email: email,
          profile_picture: profile_picture_temp
        });
        return res.status(201).json({
          status: "Success",
          msg: "Data updated successfully",
          data: foundUser
        });
      } else {
        // Emailnya ditemukan di database, tapi bukan email
        // user itu sendiri
        return res.status(409).json({
          status: 'Failed',
          msg: `Email sudah pernah dipakai user lain`
        })
      }
    }

    await foundUser.update({
      name: name,
      email: email,
      profile_picture: profile_picture_temp
    });
    return res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: foundUser
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const foundUser = await User.findByPk(idUser);

    if (!foundUser) {
      return res.status(404).json({
        status: 'Error',
        msg: `User not found!`
      })
    }

    await foundUser.destroy();

    // Delete Dompet User
    await Dompet.destroy({ where: { user_id: idUser } });

    // Delete Transaction User
    await Transaction.destroy({ where: { user_id: idUser } });

    // Delete Category Earning User
    await CategoryEarning.destroy({ where: { user_id: idUser } });

    // Delete Category Spending User
    await CategorySpending.destroy({ where: { user_id: idUser } });


    return res.status(200).json({
      status: 'success',
      msg: 'User berhasil dihapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msg: error.message
    })
  }
}

module.exports = {
  getUserData,
  updateUser,
  deleteUser
}
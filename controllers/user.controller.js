const { User } = require('../models');

const getUserData = async (req, res) => {
  try {
    const foundUser = await User.findByPk(req.user.id);

    return res.status(200).json({
      status: "success",
      msg: "User berhasil ditemukan",
      data: foundUser
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.message
    })
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, email, profile_picture } = req.body;
    const idUser = req.user.id;
    if (!(await User.findByPk(idUser))) return res.status(404).json({
      status: "Error",
      msg: "User not found!"
    });

    const updatedUser = await User.update({
      name: name,
      email: email,
      profile_picture: profile_picture
    }, {
      where: {
        id: idUser
      }
    });

    res.status(201).json({
      status: "Success",
      msg: "Data updated successfully",
      data: updatedUser[1]
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      msg: "Update data failed!",
      id: idUser,
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const deletedUser = await User.destroy({
      where: {
        id: idUser
      }
    });
    if (!deletedUser) {
      return res.status(404).json({
        msg: `User dengan id ${idUser} tidak ditemukan`
      })
    }
    res.status(200).json({
      status: 'success',
      msg: 'User berhasil dihapus'
    })
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.msg
    })
  }
}

module.exports = {
  getUserData,
  updateUser,
  deleteUser
}
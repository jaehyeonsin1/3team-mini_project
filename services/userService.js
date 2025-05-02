const UserModel = require('../models/userModel');

const userService = {
  register: async (user) => {
    return await UserModel.create(user);
  },

  findByUserId: async (userId) => {
    return await UserModel.findByUserId(userId);
  },

  login: async (userId, password) => {
    const user = await UserModel.findByUserId(userId);
    return user && user.password === password;
  },

  findById: async (id) => {
    return await UserModel.findById(id);
  },

  updateUser: async (id, updatedUser) => {
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      throw new Error(`회원이 존재하지 않습니다: id=${id}`);
    }
    return await UserModel.update(id, updatedUser);
  },

  deleteUser: async (id) => {
    await UserModel.delete(id);
  },
};

module.exports = userService;

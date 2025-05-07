const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = {
  register: async (userData) => {
    const existingUser = await userModel.findByUserId(userData.user_id);
    if (existingUser) throw new Error('유저 아이디가 이미 존재합니다.');
    
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return userModel.createUser({
      user_id: userData.user_id,
      password: hashedPassword,
      name: userData.name,
      email: userData.email
    });
  },

  login: async (userId, password) => {
    const user = await userModel.findByUserId(userId);
    if (!user) throw new Error('잘못된 자격증명 입니다.');
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('잘못된 자격증명 입니다.');
    
    return jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
};
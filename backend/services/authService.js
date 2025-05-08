const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = {
  register: async (userData) => {
    const existingUser = await userModel.findByUserId(userData.user_id);
    if (existingUser) throw new Error("이미 존재하는 아이디입니다");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return userModel.createUser({
      user_id: userData.user_id,
      password: hashedPassword,
      name: userData.name,
      email: userData.email,
    });
  },

  login: async (user_id, password) => {
    const user = await userModel.findByUserId(user_id);
    if (!user) throw new Error("아이디가 잘못 되었습니다.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("비밀번호가 잘못 되었습니다.");

    return jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  },
};

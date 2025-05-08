// 회원 정보 조회 및 수정 탈퇴
// 사용자 정보 조회
const userModel = require('../models/user');
const db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: async (userData) => {
    const [result] = await db.execute(
      'INSERT INTO users SET ?',
      [userData]
    );
    return result.insertId;
  },

  updateUser: async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    try {
      const updateData = { 
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      };
  
      const result = await userModel.updateUser(
        req.params.user_id,
        updateData // 객체 형태로 전달
      );
      
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

deleteUser: async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.params.user_id);

    res.json({
      success: true,
      affectedRows: result
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  };
},

getUserInfo : async (req, res) => {
  try {
    const user = await userModel.findByUserId(req.params.user_id);
    if (!user) return res.status(404).json({ error: '사용자 없음' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
}

};
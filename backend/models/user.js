// 사용자 모델
const db = require('../config/db');

module.exports = {
  createUser: async (userData) => {
    const [result] = await db.query(
      'INSERT INTO users SET ?',
      [userData]
    );
    return result.insertId;
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE user_id = ?',
      [userId.trim()] // 공백 제거 추가
    );
    console.log('DB Query Result:', rows); // 쿼리 결과 로깅
    return rows[0];
  },

  updateUser: async (user_id, updateData) => {
    const [result] = await db.query(
      'UPDATE users SET ? WHERE user_id = ?',
      [updateData, user_id]
    );
    return result;
  },

  deleteUser: async (userId) => {
    const [result] = await db.query(
      'DELETE FROM users WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows;
  }
};
// 사용자 모델
const db = require('../config/db');

module.exports = {
  createUser: async (userData) => {
    const [result] = await db.query(
      'INSERT INTO users SET ?',
      userData
    );
    return result.insertId;
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE user_id = ?',
      [userId]
    );
    return rows[0];
  },

  updateUser: async (userId, updateData) => {
    const [result] = await db.query(
      'UPDATE users SET ? WHERE user_id = ?',
      [updateData, userId]
    );
    return result.affectedRows;
  },

  deleteUser: async (userId) => {
    const [result] = await db.query(
      'DELETE FROM users WHERE user_id = ?',
      [userId]
    );
    return result.affectedRows;
  }
};
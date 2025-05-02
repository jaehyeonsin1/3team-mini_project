const db = require('../config/db');

const UserModel = {
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    return rows[0];
  },

  create: async (user) => {
    const { userId, name, password, email } = user;
    const [result] = await db.query(
      'INSERT INTO users (user_id, name, password, email) VALUES (?, ?, ?, ?)',
      [userId, name, password, email]
    );
    return { id: result.insertId, userId, name, email };
  },

  update: async (id, user) => {
    const { name, password, email } = user;
    await db.query(
      'UPDATE users SET name = ?, password = ?, email = ? WHERE id = ?',
      [name, password, email, id]
    );
    return { id, ...user };
  },

  delete: async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  },
};

module.exports = UserModel;

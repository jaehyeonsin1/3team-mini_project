const db = require("../config/db");

const UserModel = {
  findById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },

  findByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      userId,
    ]);

    return rows[0];
  },

  create: async (user) => {
    const { userId, password, name, email } = user;
    const [result] = await db.query(
      "INSERT INTO users (user_id, password, name, email) VALUES (?, ?, ?, ?)",
      [userId, password, name, email]
    );
    return { id: result.insertId, userId, name, email };
  },

  update: async (id, user) => {
    const { password, name, email } = user;
    await db.query("UPDATE users SET password = ?, name = ?, email = ? WHERE id = ?", [
      password,
      name,
      email,
      id,
    ]);
    return { id, ...user };
  },

  delete: async (id) => {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
  },
};

module.exports = UserModel;

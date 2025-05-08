const db = require('../config/db');

const ScheduleModel = {
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM schedules WHERE id = ?', [id]);
    return rows[0];
  },

  findByUserAndDate: async (userId, date) => {
    const [rows] = await db.query(
      'SELECT * FROM schedules WHERE user_id = ? AND date = ? ORDER BY time',
      [userId, date]
    );
    return rows;
  },

  create: async (schedule) => {
    const { userId, title, date, time, location, color, description } = schedule;
    const [result] = await db.query(
      'INSERT INTO schedules (user_id, title, date, time, location, color, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, title, date, time, location, color || '#000000', description]
    );
    return { id: result.insertId, ...schedule };
  },

  update: async (id, schedule) => {
    const { title, date, time, location, color, description } = schedule;
    await db.query(
      'UPDATE schedules SET title = ?, date = ?, time = ?, location = ?, color = ?, description = ? WHERE id = ?',
      [title, date, time, location, color, description, id]
    );
    return { id, ...schedule };
  },

  delete: async (id) => {
    await db.query('DELETE FROM schedules WHERE id = ?', [id]);
  },
};

module.exports = ScheduleModel;

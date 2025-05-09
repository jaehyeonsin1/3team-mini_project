const ScheduleModel = require("../models/schedule");
const UserModel = require("../models/user");

const scheduleService = {
  getSchedulesByUserAndDate: async (userId, start_date, end_date) => {
    return await ScheduleModel.findByUserAndDate(userId, start_date, end_date);
  },

  getScheduleById: async (id) => {
    const schedule = await ScheduleModel.findById(id);
    if (!schedule) {
      throw new Error(`일정을 찾을 수 없습니다: id=${id}`);
    }
    return schedule;
  },

  save: async (schedule) => {
    // schedule.user.id 형태로 전달되는 경우 userId 추출
    if (schedule.user && schedule.user.id) {
      const user = await UserModel.findById(schedule.user.id);
      if (user) {
        schedule.userId = user.id; // MySQL은 user_id로 저장
      }
    }
    if (schedule.id) {
      return await ScheduleModel.update(schedule.id, schedule);
    } else {
      return await ScheduleModel.create(schedule);
    }
  },

  delete: async (id) => {
    await ScheduleModel.delete(id);
  },
};

module.exports = scheduleService;

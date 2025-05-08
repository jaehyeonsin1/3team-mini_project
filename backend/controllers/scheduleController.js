const scheduleService = require('../services/scheduleService');

// 특정 유저+날짜의 일정 조회
exports.getSchedules = async (req, res) => {
  const { userId, date } = req.query;
  try {
    const schedules = await scheduleService.getSchedulesByUserAndDate(userId, date);
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: '일정 조회 실패' });
  }
};

// 일정 단건 조회
exports.getSchedule = async (req, res) => {
  try {
    const schedule = await scheduleService.getScheduleById(req.params.id);
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: '단건 일정 조회 실패' });
  }
};

// 일정 등록
exports.createSchedule = async (req, res) => {
  try {
    const newSchedule = await scheduleService.save(req.body);
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ error: '일정 생성 실패' });
  }
};

// 일정 수정
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = { ...req.body, id: req.params.id };
    const updated = await scheduleService.save(schedule);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: '일정 수정 실패' });
  }
};

// 일정 삭제
exports.deleteSchedule = async (req, res) => {
  try {
    await scheduleService.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: '일정 삭제 실패' });
  }
};

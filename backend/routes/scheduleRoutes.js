const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

// 일정 CRUD
router.get("/", scheduleController.getSchedules); // ?userId=1&date=2025-05-02
router.get("/:id", scheduleController.getSchedule);
router.post("/", scheduleController.createSchedule);
router.put("/:id", scheduleController.updateSchedule);
router.delete("/:id", scheduleController.deleteSchedule);

module.exports = router;

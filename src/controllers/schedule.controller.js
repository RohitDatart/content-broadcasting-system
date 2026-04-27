const {
  createSchedule,
  getCurrentContent,
  getSchedulesBySubject,
  getAllSchedules,
} = require("../services/schedule.service");
const { validateSchedule } = require("../utils/validators");
const { success, error } = require("../utils/response");

const create = async (req, res) => {
  try {
    const error = validateSchedule(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }
    const { contentId, subject, duration, startTime, endTime } = req.body;

    if (!startTime || !endTime) {
      return res.status(400).json({ message: "Time required" });
    }

    const schedule = await createSchedule({
      contentId,
      subject,
      duration,
      startTime,
      endTime,
    });

    success(res, schedule, "Schedule created");
  } catch (err) {
    error(res, err.message, 400);
  }
};

const current = async (req, res) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    const data = await getCurrentContent(subject);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No active content right now",
      });
    }

    success(res, data, "Current content fetched");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await getAllSchedules();
    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBySubject = async (req, res) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Subject is required" });
    }

    const data = await getSchedulesBySubject(subject);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { create, current, getAll, getBySubject };

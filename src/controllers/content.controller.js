const {
  createContent,
  approveContent,
  rejectContent,
  getContentByStatus,
  getApprovedContent,
} = require("../services/content.service");
const { success, error } = require("../utils/response");

const uploadContent = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "File is required" });
    }

    const { title, subject, description } = req.body;

    const content = await createContent({
      title,
      subject,
      description,
      file_path: file.path,
      file_type: file.mimetype,
      file_size: file.size,
      uploaded_by: req.user.userId,
    });

    success(res, content, "content uploaded");
  } catch (err) {
    error(res, err.message, 400);
  }
};

const approve = async (req, res) => {
  try {
    const contentId = parseInt(req.params.id);

    const content = await approveContent(contentId, req.user.userId);

    success(res, content, "content approved");
  } catch (err) {
    error(res, err.message, 400);
  }
};

const reject = async (req, res) => {
  try {
    const contentId = parseInt(req.params.id);
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Reason required" });
    }

    const content = await rejectContent(contentId, req.user.userId, reason);

    success(res, content, "content rejected");
  } catch (err) {
    error(res, err.message, 400);
  }
};

const getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const data = await getContentByStatus(status.toUpperCase(), page, limit);

    success(res, data);
  } catch (err) {
    error(res, err.message, 400);
  }
};

const getApproved = async (req, res) => {
  try {
    const { subject } = req.query;

    const data = await getApprovedContent(subject);

    res.json({
      success: true,
      message: "Approved content fetched",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { uploadContent, approve, reject, getByStatus, getApproved };

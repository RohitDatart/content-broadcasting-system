const express = require("express");
const upload = require("../config/multer");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const {
  uploadContent,
  approve,
  reject,
  getByStatus,
  getApproved,
} = require("../controllers/content.controller");

const router = express.Router();

// Teacher only
router.post(
  "/upload",
  authMiddleware,
  roleMiddleware("TEACHER"),
  upload.single("file"),
  uploadContent,
);

router.patch(
  "/approve/:id",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  approve,
);

router.patch(
  "/reject/:id",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  reject,
);

router.get(
  "/status/:status",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  getByStatus,
);

router.get("/approved", getApproved);

module.exports = router;

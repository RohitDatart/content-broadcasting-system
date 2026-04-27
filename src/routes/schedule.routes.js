const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const { create, current, getAll, getBySubject } = require("../controllers/schedule.controller");

const router = express.Router();

// Only principal can schedule
router.post("/create", authMiddleware, roleMiddleware("PRINCIPAL"), create);

router.get("/current", current);

router.get("/all", authMiddleware, roleMiddleware("PRINCIPAL"), getAll);

router.get(
  "/by-subject",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  getBySubject,
);

module.exports = router;

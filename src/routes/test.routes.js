const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

router.get(
  "/teacher",
  authMiddleware,
  roleMiddleware("TEACHER"),
  (req, res) => {
    res.json({ message: "Teacher access granted" });
  },
);

router.get(
  "/principal",
  authMiddleware,
  roleMiddleware("PRINCIPAL"),
  (req, res) => {
    res.json({ message: "Principal access granted" });
  },
);

module.exports = router;

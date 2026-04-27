const express = require("express");
const cors = require("cors");

const app = express();

const errorHandler = require("./middlewares/error.middleware");

const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth/auth.routes");
const contentRoutes = require("./routes/content.routes");
const scheduleRoutes = require("./routes/schedule.routes");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

app.use("/test", testRoutes);
app.use("/auth", authRoutes);
app.use("/content", contentRoutes);
app.use("/schedule", scheduleRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(errorHandler);

module.exports = app;

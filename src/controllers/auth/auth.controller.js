const { registerUser, loginUser } = require("../../services/auth/auth.service");
const { success, error } = require("../../utils/response")

const register = async (req, res) => {
  console.log("REGISTER HIT");
  try {
    const user = await registerUser(req.body);
    success(res, user)
  } catch (err) {
    error(res, err.message, 400);
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    success(res, result);
  } catch (err) {
    error(res, err.message, 400);
  }
};

module.exports = {
  register,
  login,
};

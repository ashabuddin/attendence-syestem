const { registerService, loginService } = require("../service/auth");

exports.registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    res.status(200).cookie("token", token).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};
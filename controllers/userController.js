const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    const userExist = await User.findOne({ userEmail: userEmail });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const body = {
      userName,
      userEmail,
      userPassword: hashedPassword,
    };
    const user = new User(body);
    const result = await user.save();
    res.status(201).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });
    // console.log(user);
    // console.log(userEmail, userPassword);
    if (!user) {
      return res.status(400).json({
        message: "Auth failed username or password is incorrect",
      });
    }
    const isMatch = await bcrypt.compare(userPassword, user.userPassword);
    if (!isMatch) {
      return res.status(400).json({
        message: "Auth failed username or password is incorrect",
      });
    }

    const userObject = {
      userName: user.userName,
      userEmail: user.userEmail,
      userId: user._id,
    };

    const token = jwt.sign(userObject, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    userObject.token = token;
    res.status(200).json({
      message: "User logged in successfully",
      userObject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error in Login",
      error,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};

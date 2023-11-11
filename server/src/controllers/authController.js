const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");
const sendResetPasswordEmail = require("../utils/sendResetPasswordEmail");
const crypto = require("crypto");
const origin = require("../config/originUrl");
const createHash = require("../utils/createHash");
const speakeasy = require("speakeasy");
const { authenticator } = require("otplib");
// @ route POST auth/login
// @ desc Login user
// @ access Public
const login = async (req, res) => {
  const { email, password, token2fa } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: "User does not exist" });
  }
  if (!user.isVerified) {
    return res.status(401).json({ msg: "Please verify your email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  const token = generateToken(user._id, user.role);
  res.cookie("tokenCookie", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    signed: true,
    sameSite: "none",
    httpOnly: true,
  });
  return res.status(200).json({
    msg: "User logged in succesfully",
    token,
    user: {
      username: user.username,
      realname: user.realname,
      role: user.role,
      email: user.email,
      id: user._id,
    },
  });
};

//@desc verify email
//@route POST /auth/verify-email
//@access Public
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (user.isVerified) {
    return res.status(400).json({ msg: "Already verified your email" });
  }
  if (!user) {
    return res.status(401).json({ msg: "User does not exist" });
  }

  if (user.verificationToken !== verificationToken) {
    return res.status(401).json({ msg: "Verification token does not match" });
  }

  (user.isVerified = true), (user.verified = Date.now());
  user.verificationToken = "";

  await user.save();

  return res.status(200).json({ msg: "Email Verified" });
};

//@desc Verify password
//@route POST /auth/verify
//@access Public
const verifyPassword = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ msg: "Please enter old password" });
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  res.status(200).json({ msg: "Password verified" });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

// @desc Forgot password
// @route POST /auth/forgot-password
// @access Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please provide valid email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  } else {
    return res.status(400).json({ msg: "User does not exist" });
  }

  res
    .status(200)
    .json({ msg: "Please check your email for reset password link" });
};

// @desc Reset password
// @route POST /auth/reset-password
// @access Public
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    throw new CustomError.BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    } else {
      return res.status(400).json({ msg: "Invalid token or token expired" });
    }
  }

  return res.status(200).json({ msg: "Password reset successfuly" });
};

module.exports = {
  login,
  logout,
  verifyPassword,
  verifyEmail,
  forgotPassword,
  resetPassword,
};

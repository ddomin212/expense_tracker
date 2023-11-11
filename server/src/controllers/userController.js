const User = require("../models/User");
const crypto = require("crypto");
const origin = require("../config/originUrl");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

// @desc    Get all users
// @route   GET api/users
// @access  Public
const getUsers = async (req, res) => {
  const allUsers = await User.find();
  if (allUsers.length === 0) {
    return res.status(400).json({ msg: "No users found" });
  }
  res.json(allUsers);
};

// @route POST api/users
// @desc Register user
// @access Public
const registerUser = async (req, res) => {
  const { email, password, realname, username, googleRegister } = req.body;
  if (!email || !password || !realname || !username) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    if (googleRegister) {
      await User.create({
        email,
        password,
        realname,
        username,
        verificationToken: "",
        isVerified: true,
        verified: Date.now(),
      });
      return res.status(200).json({ msg: "User created" });
    }

    const verificationToken = crypto.randomBytes(40).toString("hex");
    User.create({
      email,
      password,
      realname,
      username,
      verificationToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating account" });
  }

  await sendVerificationEmail({
    name: realname,
    email: email,
    verificationToken: verificationToken,
    origin,
  });
  return res.status(200).json({
    msg: "User created, please check email to verify",
  });
};

// @ route PATCH api/users/:id
// @ desc Update user
// @ access Public
const updateUser = async (req, res) => {
  try {
    const { email, password, realname, username, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    if (email) user.email = email;
    if (password) user.password = password;
    if (realname) user.realname = realname;
    if (username) user.username = username;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({
      username: user.username,
      realname: user.realname,
      role: user.role,
      email: user.email,
      id: user._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// @ route DELETE api/users/:id
// @ desc Delete user
// @ access Public
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ msg: "User does not exist" });
  }

  await user.remove();
  res.status(200).json({ msg: "User deleted" });
};

module.exports = { getUsers, registerUser, updateUser, deleteUser };

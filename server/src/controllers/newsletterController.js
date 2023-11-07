const Newsletter = require("../models/Newsletter");
//@desc Add newsletter
//@route POST /api/newsletter
//@access Public
const addNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const newsletter = await Newsletter.create(req.body);
    return res.status(201).json({
      success: true,
      data: newsletter,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
  }
};
//@desc get all newsletters
//@route GET /api/newsletter
//@access Public
const getNewsletters = async (req, res, next) => {
  try {
    const newsletters = await Newsletter.find();
    return res.status(200).json({
      success: true,
      count: newsletters.length,
      data: newsletters,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
module.exports = {
  addNewsletter,
  getNewsletters,
};

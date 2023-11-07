const Contact = require("../models/Contact");

//@desc Get all contacts
//@route GET /api/contact
//@access Public
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
//@desc Add contact
//@route POST /api/contact
//@access Public
const addContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    const contact = await Contact.create(req.body);
    return res.status(201).json({
      success: true,
      data: contact,
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
//@desc Delete contact
//@route DELETE /api/contact/:id
//@access Public
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "No contact found",
      });
    }
    await contact.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
//@desc Update contact
//@route PUT /api/contact/:id
//@access Public
const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "No contact found",
      });
    }
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.message = req.body.message;
    await contact.save();
    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
module.exports = {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
};

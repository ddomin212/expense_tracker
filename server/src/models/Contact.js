const { Schema, model, Types } = require("mongoose");
const ContactSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Contact", ContactSchema);

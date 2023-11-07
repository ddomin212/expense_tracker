const { Schema, model, Types } = require("mongoose");
const NewsletterSchema = new Schema({
  email: { type: String, required: true, unique: true },
});
module.exports = model("Newsletter", NewsletterSchema);

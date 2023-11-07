const { Schema, model, Types } = require("mongoose");
const TimestampSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    apiKey: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Timestamp", TimestampSchema);

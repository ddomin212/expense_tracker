const { Schema, model, Types } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const IncomeSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    amount: { type: Number, required: [true, "Amount is required"] },
    currency: {
      type: String,
      default: "CZK",
    },
    tid: { type: String, unique: true },
    type: { type: String },
    user: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
IncomeSchema.plugin(mongoosePaginate);
module.exports = model("Income", IncomeSchema);

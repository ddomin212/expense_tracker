const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    realname: { type: String },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    currency: {
      type: String,
      default: "CZK",
    },
    role: { type: String, enum: ["Admin", "User", "Pro"], default: "User" },
    verificationToken: String,
    secret2fa: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: Date,
    apiKeys: {
      type: Object,
      default: { fio: [] },
    },
    passwordToken: {
      type: String,
    },
    passwordTokenExpirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});
module.exports = model("User", UserSchema);

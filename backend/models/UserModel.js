import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    require: [true, "Last Name is required"],
  },

  email: {
    type: String,
    unique: true,
    require: [true, "Email is required"],

    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is requireddd"],
  },
  balance: {
    type: Number,
    required: [false, "Balance is required"],
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("user", userSchema);

export default UserModel;

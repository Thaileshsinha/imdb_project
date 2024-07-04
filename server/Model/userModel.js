import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const User = mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    dob: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    userType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
User.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Encrypt password using bcrypt
User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const userModel = mongoose.model("User", User);
export default userModel;

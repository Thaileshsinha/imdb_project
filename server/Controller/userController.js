import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../Model/userModel.js";

const createUser = async (req, res) => {
  const { name, dob, bio, gender, userType, password } = req.body;

  // if (!name || !dob || !bio || !gender || !userType || !password) {
  //   return res.status(422).json({ error: "Please fill all the fields" });
  // }
  try {
    const userExist = await userModel.findOne({ name });
    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    }
    const user = new userModel({ name, dob, bio, gender, userType, password });
    await user.save();
    res.status(201).json({ message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!password) {
    return res.status(401).json({ message: "please fill the form properly" });
  }
  try {
    const existuser = await userModel.findOne({
      name: name,
    });

    if (!existuser) {
      return res.status(401).json({ message: "wrong name or password" });
    }

    const isPasswordMatched = await existuser.matchPassword(password);

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "wrong name or password" });
    }

    const userid = existuser._id;

    const token = jwt.sign({ userid }, "shubham", {
      expiresIn: "30d",
    });
    console.log("userid", userid);

    res
      .status(201)
      .json({ token: token, message: "login successfully", status: 1 });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err: err.message });
  }
};

const updateProfile = async (req, res) => {
  const { name, dob, bio, gender, userType } = req.body;
  const updateData = { name, dob, bio, gender, userType };

  const checkName = await userModel.findOne({ name });
  if (checkName) {
    return res.status(422).json({ error: "User already exists" });
  }
  const updateUser = await userModel.findByIdAndUpdate(
    req.userInfo._id,
    updateData,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res
    .status(200)
    .json({ user: updateUser, message: "profile update successfully" });
};

const deleteUser = async (req, res) => {
  try {
    const deleteOne = await userModel.deleteMany({
      _id: req.userInfo._id,
    });
    res.status(200).json({ message: "user delete successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getAllActors = async (req, res) => {
  try {
    const actors = await userModel.find({ userType: "actor" });
    res.status(200).json({ actors });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const getAllProducers = async (req, res) => {
  try {
    const producers = await userModel.find({ userType: "producer" });
    res.status(200).json({ producers });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getOneUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const actors = await userModel.findById({ _id: userId });
    res.status(200).json(actors);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export {
  createUser,
  loginUser,
  updateProfile,
  deleteUser,
  getAllActors,
  getAllProducers,
  getOneUser,
};

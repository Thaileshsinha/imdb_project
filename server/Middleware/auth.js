import jwt from "jsonwebtoken";
import userModel from "../Model/userModel.js";

const isAuthenticatedUser = async (req, res, next) => {
  // const token = req.cookies.uuid;
  try {
    const token =
      req.header("Authorization")?.split(" ")[1] ||
      req.header("authorization")?.split(" ")[1];

    console.log("token", token);

    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }

    const decoded = jwt.verify(token, "shubham");

    if (!decoded) {
      res.status(401)({ message: "not decode" });
    }
    // console.log("decoded", decoded);
    req.userInfo = await userModel.findById(decoded.userid);

    if (!req.userInfo) {
      res.status(401).json({ message: "user not valid" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "user not authorize" });
  }
};

const authorizeUser = async (req, res, next) => {
  const findUser = await userModel.findById(req.userInfo._id);
  if (findUser.userType !== "admin") {
    return res.status(401).json({ message: "admin can create movie" });
  }
  next();
};

export { isAuthenticatedUser, authorizeUser };

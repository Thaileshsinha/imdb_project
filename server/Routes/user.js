import express from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  updateProfile,
  getAllActors,
  getAllProducers,
  getOneUser,
} from "../Controller/userController.js";
import { isAuthenticatedUser } from "../Middleware/auth.js";
import multer, { memoryStorage } from "multer";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.route("/createuser").post(createUser);

router.route("/loginuser").post(loginUser);

router.route("/getallactors").post(getAllActors);

router.route("/getallproducers").post(getAllProducers);

router.route("/updateprofile").post(isAuthenticatedUser, updateProfile);

router.route("/deleteuser").post(isAuthenticatedUser, deleteUser);

router.route("/getoneuser").post(isAuthenticatedUser, getOneUser);

export default router;

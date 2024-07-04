import express from "express";
import {
  createMovie,
  getAllMovie,
  updateMovie,
  deleteMovie,
  getOneMovie,
} from "../Controller/movieController.js";
import { isAuthenticatedUser, authorizeUser } from "../Middleware/auth.js";
import multer, { memoryStorage } from "multer";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.route("/createmovie").post(isAuthenticatedUser, createMovie);
router.route("/getallmovie").post(getAllMovie);
router
  .route("/updatemovie")
  .post(isAuthenticatedUser, authorizeUser, updateMovie);
router
  .route("/deletemovie")
  .post(isAuthenticatedUser, authorizeUser, deleteMovie);
router.route("/getonemovie").post(isAuthenticatedUser, getOneMovie);

export default router;

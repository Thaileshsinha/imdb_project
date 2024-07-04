import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import app from "./app.js";
// const app = express();
const DATABASE_URL = "mongodb://localhost:27017/imdb";
const port = 5000;
dotenv.config();

app.get("/", (req, res) => {
  res.json("shubham sinha");
});

mongoose
  .connect(DATABASE_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected with database");
  })
  .catch((err) => {
    console.log("err hai");
  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

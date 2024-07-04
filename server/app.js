import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import user from "./Routes/user.js";
import movie from "./Routes/movie.js";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("*", cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/user", user);
app.use("/movie", movie);

export default app;

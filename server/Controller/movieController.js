import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import movieModel from "../Model/movieModel.js";
import userModel from "../Model/userModel.js";

const createMovie = async (req, res) => {
  const { movieName, yearOfRelease, poster, plot, actorId, producerId } =
    req.body;
  console.log(req.body);
  // if (
  //   !movieName ||
  //   !yearOfRelease ||
  //   !poster ||
  //   !plot ||
  //   !actorId ||
  //   !producerId
  // ) {
  //   return res.status(422).json({ error: "Please fill all the fields" });
  // }
  try {
    const nameExist = await movieModel.findOne({ movieName });
    // if (nameExist) {
    //   return res.status(422).json({ error: "moview name already exists" });
    // }
    const movie = new movieModel({
      movieName,
      yearOfRelease,
      poster,
      plot,
      actorId,
      producerId,
      adminId: req.userInfo._id,
    });
    await movie.save();
    res.status(201).json({ message: "movie created successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const updateMovie = async (req, res) => {
  const {
    movieName,
    yearOfRelease,
    poster,
    plot,
    actorId,
    producerId,
    movieId,
  } = req.body;
  const updateData = {
    movieName,
    yearOfRelease,
    poster,
    plot,
    actorId,
    producerId,
  };

  const checkName = await movieModel.findOne({ movieName });
  if (checkName) {
    return res.status(422).json({ error: "movie already exists" });
  }
  const updateMovie = await movieModel.updateOne(
    { adminId: req.userInfo._id, _id: movieId },
    updateData,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res
    .status(200)
    .json({ user: updateUser, message: "update update successfully" });
};
const getAllMovie = async (req, res) => {
  try {
    const movie = await movieModel.find();

    const allMovies = await Promise.all(
      movie.map(async (val) => {
        const respose = {
          _id: val._id,
          movieName: val.movieName,
          yearOfRelease: val.yearOfRelease,
          poster: val.poster,
          plot: val.plot,
          // actorId: val.actorId,
        };
        const producers = await userModel.findById({ _id: val.producerId });
        respose.producerName = producers.name;
        const allactor = await Promise.all(
          val.actorId.map(async (a) => {
            const actor = await userModel.findById({ _id: a });
            return { actorName: actor.name, actorId: actor._id };
          })
        );
        respose.actorDetails = allactor;
        return respose;
      })
    );

    res.status(200).json({ movies: allMovies });
  } catch (err) {
    res.status(500).json({ message: "something went wrong", err: err.message });
  }
};

const deleteMovie = async (req, res) => {
  const { movieId } = req.body;
  try {
    const deleteOne = await movieModel.deleteMany({
      _id: movieId,
      adminId: req.userInfo._id,
    });
    res.status(200).json({ message: "movie delete successfully" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const getOneMovie = async (req, res) => {
  const { movieId } = req.body;
  try {
    const getonemovie = await movieModel.findById({
      _id: movieId,
    });

    const response = {
      _id: getonemovie._id,
      movieName: getonemovie.movieName,
      yearOfRelease: getonemovie.yearOfRelease,
      poster: getonemovie.poster,
      plot: getonemovie.plot,
      // actorId: getonemovie.actorId,
    };
    const allactor = await Promise.all(
      getonemovie.actorId.map(async (a) => {
        const actor = await userModel.findById({ _id: a });
        return { actorName: actor.name, actorId: actor._id };
      })
    );

    const producerName = await userModel.findById({
      _id: getonemovie.producerId,
    });
    response.producerName = producerName.name;
    response.actorDetails = allactor;

    res.status(200).json({ movie: response });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export { createMovie, getAllMovie, updateMovie, deleteMovie, getOneMovie };

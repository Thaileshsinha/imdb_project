import mongoose from "mongoose";

const Movie = mongoose.Schema(
  {
    movieName: {
      type: String,
    },
    yearOfRelease: {
      type: String,
    },
    poster: {
      type: String,
    },
    plot: {
      type: String,
    },
    actorId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    producerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const movieModel = mongoose.model("Movie", Movie);
export default movieModel;

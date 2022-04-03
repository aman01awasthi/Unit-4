//mongodb+srv://pkhan:Pk_12345@cluster0.ptc6s.mongodb.net/movies?retryWrites=true&w=majority

const express = require("express");
const mongoose = require("mongoose");

const app = express();

//connect database
const connectDb = () => {
  mongoose.connect(
    "mongodb://127.0.0.1:27017/web15"
  );
};


//user schema
//create schema
const movieSchema = mongoose.Schema({
  id: Number,
  movie_name: String,
  movie_genere: String,
  production_year: Number,
  budget: Number,
});

//model
const Movie = mongoose.model("movie", movieSchema);

app.get("/movies", async (req, res) => {
    const movieData = await Movie.find({}, { _id: 0 }).lean().exec();
    console.log(movieData);
    return res.send(movieData)
})

app.listen(5100, async () => {
    try {
        await connectDb()
        console.log("listening on 5100");
    }
    catch {
        console.log("something went wrong");
    }
});

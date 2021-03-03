const mongoose = require("mongoose");

//movie model
let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

//user model
let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    BirthDate: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
    //ref: pulls from db.movies
});

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.export.User = User;

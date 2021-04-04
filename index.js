const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const Models = require("./models.js");
const passport = require("passport");
const morgan = require("morgan");
const { check, validationResult } = require("express-validator");
require("./passport");

const app = express();

const Movies = Models.Movie;//model names defined in models.js
const Users = Models.User;

// mongoose.connect("mongodb://localhost:27017/myFlixDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});




const cors = require("cors");
let allowedOrigins = ["http://localhost:1234"];


app.use(morgan("common"));


app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)=== -1){
     // If a specific origin isn’t found on the list of allowed origins
     let message = "The CORS policy for this application doesn’t allow access from origin " + origin;
     return callback(new Error(message), false); 
    }
    return callback(null, true);
  }
}));

app.use(express.static("public"));

app.use(bodyParser.json());

let auth = require("./auth")(app);
require("./passport");

// middleware to detect errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// get requests
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my movie app!");
});

app.get("/movies", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

app.get("/movies/:Title", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

  app.get("/movies/genres/:Title", passport.authenticate("jwt", { session: false }),
   (req, res) => {
    Movies.find()
      .then((movies) => {
        const genre = movies.find((movie) => movie.Genre.Name === req.params.Title)
        if (genre) {
                  res.json(genre.Genre);
        } else {
           res.status(400).send("Error: No such genre");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});

app.get("/movies/directors/:Name", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
    .then((director) => {
        res.status(200).json(director.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

app.get("/documentation", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    res.sendFile("public/documentation.html",{root: __dirname});
});

app.get("/users", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Users.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});
 
app.get("/users/:Username", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});

//Post, put , and delete requests
app.post("/users",
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check("Username", "Username is required").isLength({min: 5}),
    check("Username", "Username contains non alphanumeric characters - not allowed.").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
  ], (req, res) => {

  // check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
        //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + " already exists");
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            BirthDate: req.body.BirthDate
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

app.put("/users/:Username", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        BirthDate: req.body.BirthDate
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

app.post("/users/:Username/Movies/:MovieID", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $push: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

  app.delete("/users/:Username/Movies/:MovieID", passport.authenticate("jwt", { session: false }),
   (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
       $pull: { FavoriteMovies: req.params.MovieID }
     },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    });
});

app.delete("/users/:Username", passport.authenticate("jwt", { session: false }),
 (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0",() => {
 console.log("Listening on Port " + port);
});


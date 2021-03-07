const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;//model names defined in models.js
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB",
{useNewUrlParser: true, useUnifiedTopology: true});
//this allows Mongoose to connect to that database so it can perform CRUD operations on the documents it contains


const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
    morgan = require("morgan");
    uuid = require("uuid");
const app = express();

app.use(morgan("common"));

app.use(express.static("public"));

app.use(bodyParser.json());

// middleware to detect errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// get requests
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my movie app!");
});

app.get("/movies", (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

app.get("/movies/:Title", (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  });

app.get("/movies/genres/:Title", (req, res) => {
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

app.get("/movies/directors/:Name", (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Name })
    .then((director) => {
        res.status(201).json(director.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html",{root: __dirname});
});

app.get("/users", (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
});
 
app.get("/users/:Username", (req, res) => {
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
app.post("/users", (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + " already exists");
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              BirthDate: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
});

app.put("/users/:Username", (req, res) => {
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

app.post("/users/:Username/Movies/:MovieID", (req, res) => {
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

  app.delete("/users/:Username/Movies/:MovieID", (req, res) => {
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

app.delete("/users/:Username", (req, res) => {
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

app.listen(8080, () => {
    console.log("your app is listening on port 8080");
});
const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;//model names defined in models.js
const Users = Models.User;

mongoose.connect("mongodb;//localhost:27017/myFlixDB",
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
    res.json(movies);
    res.send("Successful GET request returning data on ALL movies");
});

app.get("/movies/:title", (req, res) => {
    res.send("Successful GET request returning data on specific movie");
});

app.get("/genre/:title", (req, res) => {
    res.send("Successful GET of movie genre by title");
});

app.get("/director/:name", (req, res) => {
    res.send("Successful GET request returning data on one director");
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html",{root: __dirname});
});

//Post, put , and delete requests
app.post("/users", (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + "already exists");
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

 app.put("/users/:username", (req, res) => {
    res.send("Successful PUT request - new user updated");
});

 app.post("/users/:username/movies/:title", (req, res) => {
    res.send("Successful POST request - movie added");
});

 app.delete("/users/:username/movies/:title", (req, res) => {
    res.send("Successful DELETE request - movie removed");
});

 app.delete("/users/:username", (req, res) => {
    res.send("Successful DELETE request - user deactivated");
});

app.listen(8080, () => {
    console.log("your app is listening on port 8080");
});
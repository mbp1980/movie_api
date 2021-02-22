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
    res.send("Successful POST request - new user registered");
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

// object variable with top movies
let movies = [
    {
        title: "25th Hour",
        director: "Spike Lee",
        description: "Cornered by the DEA, convicted New York drug dealer Montgomery Brogan reevaluates his life in the 24 remaining hours before facing a seven-year jail term.",
        genre: "Drama",
        starring: 
            ["Edward Norton",
            "Philip Seymour Hoffman",
            "Barry Pepper",
            "Rosario Dawson",
            "Anna Paquin",
            "Brian Cox"],
        year: "2002",
        music: "Terence Blanchard"

    },
    {
        title: "Best in Show",
        director: "Christopher Guest",
        description: "A 'behind the scenes' look into the highly competitive and cut-throat world of dog-shows through the eyes of a group of ruthless dog owners.",
        genre: "Comedy",
        starring:   
            ["Jennifer Coolidge",
            "Christopher Guest",
            "John Michael Higgins",
            "Eugene Levy",
            "Jane Lynch",
            "Michael McKean",
            "Catherine O'Hara",
            "Parker Posey"],
        year: "2000",
        music: "C.J. Vanston"  
    },
    {
        title: "The Royal Tenenbaums",
        director: "Wes Anderson,",
        description: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons.", 
        genre: ["Comedy, Drama"],
        starring: 	
            ["Danny Glover",
            "Gene Hackman",
            "Anjelica Huston",
            "Bill Murray",
            "Gwyneth Paltrow",
            "Ben Stiller",
            "Luke Wilson",
            "Owen Wilson"],
        year: "2001",
        music: "Mark Mothersbaugh"   
    },
    {
        title: "Coming to America",
        director: "John Landis",
        description: "An extremely pampered African Prince travels to Queens, New York, and goes undercover to find a wife that he can respect for her intelligence and will.", 
        genre: "Comedy",
        starring: 
            ["Eddie Murphy",
            "Arsenio Hall",
            "James Earl Jones",
            "John Amos",
            "Madge Sinclair",
            "Shari Headley"],
        year: "1988",
        music: "Nile Rodgers"
    },
    {
        title: "Vacation",
        director: ["Jonathan Goldstein, John Francis Daley"],
        description: "Rusty Griswold takes his own family on a road trip to 'Walley World' in order to spice things up with his wife and reconnect with his sons.", 
        genre: "Comedy",
        starring: 	
            ["Ed Helms",
            "Christina Applegate",
            "Leslie Mann",
            "Beverly D'Angelo",
            "Chris Hemsworth",
            "Chevy Chase"],
        year: "2015",
        music: "Mark Mothersbaugh"
    },
    {
        title: "Black Panther",
        director: "Ryan Coogler",
        genre: ["Action, Adventure, Sci-Fi"],
        description: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.", 
        starring: 	
            ["Chadwick Boseman",
            "Michael B. Jordan",
            "Lupita Nyong'o",
            "Danai Gurira",
            "Martin Freeman",
            "Daniel Kaluuya",
            "Letitia Wright",
            "Winston Duke",
            "Angela Bassett",
            "Forest Whitaker",
            "Andy Serkis"],
        year: "2018",
        music: "Ludwig Göransson "  
    },
    {
        title: "The Avengers",
        director: "Joss Whedon",
        description: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        genre: ["Action, Adventure, Sci-Fi"],
        starring:  
            ["Robert Downey Jr.",
            "Chris Evans",
            "Mark Ruffalo",
            "Chris Hemsworth",
            "Scarlett Johansson",
            "Jeremy Renner",
            "Tom Hiddleston",
            "Clark Gregg",
            "Cobie Smulders",
            "Stellan Skarsgård",
            "Samuel L. Jackson"],
        year: "2012",
        music: "Alan Silvestri"   
    },
    {
        title: "Rogue One: A Star Wars Story",
        director: "Gareth Edwards",
        genre: ["Action, Adventure, Sci-Fi"],
        description: "The daughter of an Imperial scientist joins the Rebel Alliance in a risky move to steal the plans for the Death Star.", 
        starring: 	
            ["Felicity Jones",
            "Diego Luna",
            "Ben Mendelsohn",
            "Donnie Yen",
            "Mads Mikkelsen",
            "Alan Tudyk",
            "Jiang Wen",
            "Forest Whitaker"],
        year: "2016",
        music: "Michael Giacchino"   
    },

    {
        title: "Pan's Labyrinth",
        director: "Guillermo del Toro",
        genre: ["Drama, Fantasy, War"],
        description: "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.", 
        starring: 
            ["Sergi López",
            "Maribel Verdú",
            "Ivana Baquero",
            "Doug Jones",
            "Ariadna Gil",
            "Álex Angulo"],
        year: "2006",
        music: "Javier Navarrete"  
    },
    {
        title: "Spaceballs",
        director: "Mel Brooks",
        genre:  ["Adventure, Comedy, Sci-Fi"],
        description: "A star pilot and his sidekick must come to the rescue of a Princess and save the galaxy from a ruthless race of beings known as Spaceballs.",
        starring: 
            ["Mel Brooks",
            "John Candy",
            "Rick Moranis",
            "Bill Pullman",
            "Daphne Zuniga",
            "Dick Van Patten",
            "George Wyner",
            "Joan Rivers"],
        year: "1987",
        music: "John Morris"   
    },
    {
        title: "Achorman: The Legend of Ron Burgundy",
        director: "Adam McKay",
        genre: "Comedy",
        description: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change for Ron and his cronies when an ambitious woman is hired as a new anchor.", 
        starring: 
            ["Will Ferrell",
            "Christina Applegate",
            "Paul Rudd",
            "Steve Carell",
            "David Koechner",
            "Fred Willard"],
        year: "2004",
        music: "Alex Wurman"
    }
    ];

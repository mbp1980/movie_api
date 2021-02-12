const { response } = require("express");
const express = require("express");
morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.use(express.static("public"));

// middleware to detect errors
app.use((err, req, next) => {
    console.error(err.stack);
    response.status(500).send("Something broke!");
});

// get requests
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my movie app!")
});

app.get("/movies", (req, res) => {
    res.status(200).send(movies);
})

app.get("/documentation", (req, res) =>{
    res.sendFile("public/documentation.html",{root: __dirname});
});

app.listen(8080, () => {
    console.log("your app is listening on port 8080");
});

// object variable with top movies
let movies = [
    {
        title: "25th Hour",
        director: "Spike Lee",
        summary: "Cornered by the DEA, convicted New York drug dealer Montgomery Brogan reevaluates his life in the 24 remaining hours before facing a seven-year jail term.",
        genre: "Drama",
        starring:   
            "Edward Norton",
            "Philip Seymour Hoffman",
            "Barry Pepper",
            "Rosario Dawson",
            "Anna Paquin",
            "Brian Cox",
        year: "2002",
        music by; "Terence Blanchard"

    },
    {
        title: "Best in Show",
        director: "Christopher Guest",
        summary: "Cornered by the DEA, convicted New York drug dealer Montgomery Brogan reevaluates his life in the 24 remaining hours before facing a seven-year jail term.",
        genre: "Comedy",
        starring:   
            "Jennifer Coolidge",
            "Christopher Guest",
            "John Michael Higgins",
            "Eugene Levy",
            "Jane Lynch",
            "Michael McKean",
            "Catherine O'Hara",
            "Parker Posey",
        year: "2000",
        music by; "C.J. Vanston"  
    },
    {
        title: "The Royal Tenenbaums",
        director: "Wes Anderson,",
        summary: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons.", 
        genre: "Comedy, Drama",
        starring: 	
            "Danny Glover",
            "Gene Hackman",
            "Anjelica Huston",
            "Bill Murray",
            "Gwyneth Paltrow",
            "Ben Stiller",
            "Luke Wilson",
            "Owen Wilson",
        year: "2001",
        music by: "Mark Mothersbaugh"   
    },
    {
        title: "Coming to America",
        director: "John Landis",
        summary: "An extremely pampered African Prince travels to Queens, New York, and goes undercover to find a wife that he can respect for her intelligence and will.", 
        genre: "Comedy",
        Starring: 
            "Eddie Murphy",
            "Arsenio Hall",
            "James Earl Jones",
            "John Amos",
            "Madge Sinclair",
            "Shari Headley",
        year: "1988,"
        Music by: "Nile Rodgers"
    },
    {
        title: "Vacation",
        director: "Jonathan Goldstein, John Francis Daley",
        summary: "Rusty Griswold takes his own family on a road trip to 'Walley World' in order to spice things up with his wife and reconnect with his sons.", 
        genre: "Comedy,"
        starring: 	
            "Ed Helms",
            "Christina Applegate",
            "Leslie Mann",
            "Beverly D'Angelo",
            "Chris Hemsworth",
            "Chevy Chase",
        year: "2015",
        music by: "Mark Mothersbaugh"
    },
    {
        title: "Black Panther",
        director: "Ryan Coogler",
        genre: "Action, Adventure, Sci-Fi",
        summary: "T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.", 
        starring: 	
            "Chadwick Boseman",
            "Michael B. Jordan",
            "Lupita Nyong'o",
            "Danai Gurira",
            "Martin Freeman",
            "Daniel Kaluuya",
            "Letitia Wright",
            "Winston Duke",
            "Angela Bassett",
            "Forest Whitaker",
            "Andy Serkis",
        year: "2018",
        music by: "Ludwig Göransson "  
    },
    {
        title: "The Avengers",
        director: "Joss Whedon",
        summary: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        senre: "Action, Adventure, Sci-Fi",
        Starring:  
            "Robert Downey Jr".,
            "Chris Evans",
            "Mark Ruffalo",
            "Chris Hemsworth",
            "Scarlett Johansson",
            "Jeremy Renner",
            "Tom Hiddleston",
            "Clark Gregg",
            "Cobie Smulders",
            "Stellan Skarsgård",
            "Samuel L. Jackson",
        year: "2012",
        music by: "Alan Silvestri"   
    },
    {
        title: "Rogue One: A Star Wars Story",
        director: "Gareth Edwards",
        genre: "Action, Adventure, Sci-Fi",
        summary: "The daughter of an Imperial scientist joins the Rebel Alliance in a risky move to steal the plans for the Death Star.", 
        starring: 	
            "Felicity Jones",
            "Diego Luna",
            "Ben Mendelsohn",
            "Donnie Yen",
            "Mads Mikkelsen",
            "Alan Tudyk",
            "Jiang Wen",
            "Forest Whitaker",
        year: "2016",
        Music by: "Michael Giacchino"   
    },

    {
        title: "Pan's Labyrinth",
        diretcor: "Guillermo del Toro",
        genre: "Drama, Fantasy, War",
        summary: "In the Falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.", 
        starring: 
            "Sergi López",
            "Maribel Verdú",
            "Ivana Baquero",
            "Doug Jones",
            "Ariadna Gil",
            "Álex Angulo",
        year: "2006",
        Music by: "Javier Navarrete"  
    },
    {
        title: "Spaceballs",
        director: "Mel Brooks",
        genre:  "Adventure, Comedy, Sci-Fi",
        summary: "A star pilot and his sidekick must come to the rescue of a Princess and save the galaxy from a ruthless race of beings known as Spaceballs.",
        starring: 
            "Mel Brooks",
            "John Candy",
            "Rick Moranis",
            "Bill Pullman",
            "Daphne Zuniga",
            "Dick Van Patten",
            "George Wyner",
            "Joan Rivers",
        year: "1987",
        music by: "John Morris"   
    },
    {
        title: "Achorman: The Legend of Ron Burgundy",
        director: "Adam McKay",
        genre: "Comedy",
        summary: "Ron Burgundy is San Diego's top-rated newsman in the male-dominated broadcasting of the 1970s, but that's all about to change for Ron and his cronies when an ambitious woman is hired as a new anchor.", 
        starring: 
            "Will Ferrell",
            "Christina Applegate",
            "Paul Rudd",
            "Steve Carell",
            "David Koechner",
            "Fred Willard",
        year: "2004",
        music by: "Alex Wurman"
    }
    ];

const passport = require("passport"),
LocalStrategy = require("passport-local").Strategy,
Models = require("./models.js"),
passportJWT = require("passport-jwt");

let users = Models.User,
JWTStrategy = passportJWT.Strategy,
ExtractJWT = passportJWT.ExtractJwt;

//LocalStrategy is checking if Username is valid within Mongoose
passport.use(new LocalStrategy({
    usernameField: "Username",
    passwordField: "Password",
}, (username, password, callback) => {
    console.log(username + " " + password);
    users.findOne({ Username: username }, (err, user) => {
        if (error) {
            console.log(error);
        }

        if (!user) {
            console.log("incorrect username");
            return callback(null, false, {message: "incorrect username or password"});
        }

        console.log("finished");
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "your_jwt_secret"
}, (jwtPayload, callback) => {
    return users.findById(jwtPayload._id)
    .then ((user) => {
        return callback(null, user);
    })
    .catch((error) => {
        return callback(error)
    });
}));

const jwtSecret = "your_jwt_secret";//This has to be the same key used in the JWtStrategy

const jwt = require("jsonwebtoken"),
passport = require("passport");

require("./passport"); //Local passport file


let generateJWTToken = (user) => {
    return jwt.sogn(user, jwtSecret, {
        subject: user.Username, //This is the username that's being encoded in the JWT
        sxpireIn: "7d", //token will expire in 7 days
        algorithm: "HS256"//this is used to "sign" or encode the values of JWT
    });
}


//POST login
module.exports = (router) => {
    router.post("/login", (req, res) => {
        passport.authentication("local", { session: false}, 
        (error,user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: "something is not right",
                    user: user
                });
            }
            res.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
}
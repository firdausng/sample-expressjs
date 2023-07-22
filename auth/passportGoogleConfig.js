const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/api/auth/callback/google",
        passReqToCallback: true
        },
        function(req,accessToken, refreshToken, profile,verifyCb) {
            // console.log(accessToken)

            const token = jwt.sign({user:{"email":profile.emails[0].value}, id:profile.id, name: profile.displayName}, process.env.JWT_KEY, {
                audience: process.env.JWT_AUDIENCE,
                issuer: process.env.JWT_ISSUER,
            } );

            verifyCb(null, {
                accessToken: token,
                profile: profile,
                refreshToken: refreshToken
            })
        }
    ));
}
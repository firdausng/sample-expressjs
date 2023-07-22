const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
opts.issuer = process.env.JWT_ISSUER;
opts.audience =  process.env.JWT_AUDIENCE;


module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload)
        // jwt.verify(jwt_payload, publicKey);
        done(null, true);
    }));
}
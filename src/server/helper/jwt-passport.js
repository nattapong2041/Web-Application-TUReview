// jwt-passport.js
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/UserModel');
const config = require('./jwtConfig');

module.exports = function () {
    let params = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: config.jwtSecret,
    }
    var strategy = new JwtStrategy(params, (jwt_payload, done) => {
        User.findOne({ email: jwt_payload.email })
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => {
                return done(err, false);
            })
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            /*            return passport.authenticate('jwt', {
                            successRedirect: '/secret',
                            failureRedirect: '/login'
                        })
                    */
            return passport.authenticate('jwt', config.jwtSession);
        }
    }
};


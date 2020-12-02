// Bearer-passport.js
var passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
var Strategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const config = require('../config/jwtConfig');

module.exports = function () {
    let params = {
        jwtFromRequest: ExtractJwt.versionOneCompatibility({
            authScheme: 'Bearer',
            tokenBodyField: 'access_token'
        }),
        authScheme: 'Bearer',
        secretOrKey: config.jwtSecret,
    }

    var strategy = new Strategy((jwt_payload, done) => {
        if (jwt_payload) {
            jwt.verify(jwt_payload, config.jwtSecret, function (err, decoded) {
                if (err) return done(err, false);
                User.find({ email: decoded.email })
                    .then(user => {
                        if (user) {
                            return done(null, "success");
                        }
                        return done(null, false);
                    })
                    .catch(err => {
                        return done(err, false);
                    })
            });
        }
        else return done({ error: "No Payload" }, false);
    });
    passport.use(strategy);
    return {
        initialize: function () {
            return passport.initialize();
        },
        session: function () { return passport.session() },
        authenticate: function (req, res) {
            return passport.authenticate('bearer', { session: false });
        }
    }
};




const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Passport local configuration
module.exports = function (passport) {

    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {

        // Compare email in the database with the email from the form POST request
        User.findOne({email: email})
        .then(user => {

            // Check if user exists
            if (!user) {

                return done(null, false);
            }

            // Compare plain text password with the hash in the database
            bcrypt.compare(password, user.password, (err, isMatch) => {

                // Check if internal server errors exist
                if (err) { 
                    
                    return done(err); 
                }

                // Check if passwords match
                if (isMatch) {

                    return done(null, user);
                    
                } else {

                    return done(null, false);
                }
            });
        });
    }));

    // Passport serialize and deserialize user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
        done(err, user);
        });
    });
};
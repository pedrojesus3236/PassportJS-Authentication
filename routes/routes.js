

const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require("../models/User.js")
const { Authenticated, NotAuthenticated } = require('../config/auth');


// Login GET route
router.get("/login", (req, res) => {

    res.render("login")
})

// Login POST route
router.post("/login", passport.authenticate('local'),  (req, res) => {
    
    res.send(req.session)
})

// Signup GET route
router.get("/signup", (req, res) => {

    res.render("signup")
});

// Signup POST route
router.post("/signup" , (req, res) => {
    
    const { username, email, password } = req.body;

    let errors = [];

    if (!username || !email || !password) {

        errors.push({ msg: 'Please enter all fields' });
    }

    if (password.length < 6) {

        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {

        res.render('signup', {errors, username, email, password});
    
    } else {

        User.findOne({ email: email }).then(user => {

            if (user) {

                errors.push({ msg: 'Email already exists' });

                res.render('signup', {errors, username, email, password});

            } else {

                bcrypt.hash(req.body.password, 10, (err, hash) => {
        
                    new User({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash
                    }).save()
                });

                res.render("signup");
            }
        })
    }
})

module.exports = router;
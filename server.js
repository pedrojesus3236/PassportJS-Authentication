

// Importing packages
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

require('./config/passport')(passport);
// Variable declaration
const app = express();
const PORT = process.env.PORT || 3000;

// Importing other files
const User = require("./models/User.js")
const routes = require('./routes/routes.js');

// Connect to mongodb
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Scrummer', { useNewUrlParser: true })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => {console.log(err, "Connection to MongoDB failed");}
);

// Set EJS has view engine 
app.set('view engine', 'ejs');

// Parse the form POST 
app.use(express.urlencoded({extended: true}));

// Serve the files on the public folder
app.use(express.static("public"));

// Start a server
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});

// Enable express sessions
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));

// Connect passport with express
app.use(passport.initialize());
app.use(passport.session());

// Enable connect flash
app.use(flash());

// Enable routes from routes.js
app.use(routes);
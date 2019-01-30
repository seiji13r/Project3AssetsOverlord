// Require Modules
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store); // <---------- Mongo Session Store
// Passport and Passport Strategy Required
const routes = require("./routes");
const passport = require("./passport"); // <- Passport configuration has been done in ./passport

// Create the Server/App Object
const app = express();
// Set the HTTP Listening Port
const PORT = process.env.PORT || 3001;

// *********  DATABASE SECTION  *************
// DB Connection Settings can be found in ./config
const db = require("./models");

// *********  MIDDLEWARE SET UP SECTION  *************
// Set Up URL encoded to allow understanding of body's Data coming from Form POST
app.use(express.urlencoded({ extended: true }));
// Set Up URL encoded to allow understanding of body's Data coming from json POST
app.use(express.json());
// Set Up the public directory that will serve the static files under /.
app.use(express.static("public"));
// Set Up the Session Middleware require("express-session")
// https://github.com/expressjs/session
app.use(
  session({
    store: new SequelizeStore({
      db: db.sequelize
    }), // <---------- Session Store
    secret: "shhh this is super super secret", // This is the secret used to sign the session ID cookie.
    resave: false,
    saveUninitialized: true
  })
);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// *********  STATIC ASSETS  *************
// Serve up static assets (usually on heroku) <----- This contains React compiled Files.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// *********  ROUTES  *************
app.use(routes);

var syncOptions = {
  force: true
};

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Initialize the Server
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, () =>
    console.log(
      `Server Listening in Port: ${PORT}, http://localhost:${PORT} 🌎`
    )
  );
});

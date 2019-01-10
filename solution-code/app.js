/*jshint esversion: 6 */
const express           = require("express");
const path              = require("path");
const logger            = require("morgan");
const cookieParser      = require("cookie-parser");
const bodyParser        = require("body-parser");
const flash             = require("connect-flash");
const User              = require("./models/user");
const Course            = require("./models/course");
const authController    = require("./routes/authController");
const siteController    = require("./routes/siteController");
const coursesController = require("./routes/coursesController");
const usersController   = require("./routes/usersController");
const session           = require("express-session");
const expressLayouts    = require("express-ejs-layouts");
const passport          = require("passport");
const mongoose          = require("mongoose");
const moment            = require("moment");
const {isLoggedIn}      = require("./middleware/user-roles-auth")
mongoose.connect("mongodb://localhost/lab-passport-roles", {
  useMongoClient: true,
});
require("dotenv").config();

var app = express();
app.use(flash());
app.locals.moment = moment
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "passport-local-strategy",
  resave: true,
  saveUninitialized: true
}));
require("./config/passport")(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use("/", isLoggedIn);

app.use("/", authController);
app.use("/", siteController);
app.use("/courses", coursesController);
app.use("/users", usersController);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
//var fx = require("money");

var usersRouter = require("./authentication/routes/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);

//----------------------------------------- END OF IMPORTS---------------------------------------------------

const connectToDB = require('./config/mongooseConnect')
connectToDB()

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
app.listen(4000, () => {
  console.log("Server Has Started");
});
module.exports = app;

// not for here
function decreaseCoinCost(cost) {
  let costNow = (cost - 0.001) * changeToDollar(1);
}
function changeToDollar(amont) {
  return //need to use api to exchange to dollar
}

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
const authRoutes = require("./features/chat/routes/auth");
const messageRoutes = require("./features/chat/routes/messages");
const socket = require("socket.io");

var app = express();
var usersRouter = require("./features/authentication/routes/auth");
var allRouters = require("./routes");
const port = 4000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/routes", allRouters);

//----------------------------------------- END OF IMPORTS---------------------------------------------------
// Middlewares
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

const server = app.listen(port, () => {
  console.log("Server is listening to", port);
});

const connectToDB = require("./config/mongooseConnect");
connectToDB();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

/*const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);*/

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

module.exports = app;

// not for here
function decreaseCoinCost(cost) {
  let costNow = (cost - 0.001) * changeToDollar(1);
}
function changeToDollar(amont) {
  return; //need to use api to exchange to dollar
}

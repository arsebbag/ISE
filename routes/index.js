//general router - front controller
var express = require('express');
var router = express.Router();
//var app = express();
var app = require('../app') 

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use("/account", require("../features/account/routes/index"))
router.use("/transaction", require("../features/transactions/routes/transactionsR"))
//router.use("/messages", require("../features/messages/routes/"))
router.use("/loan", require("../features/loan/routes/index"))
router.use("/account", require("../features/account/routes/index"))


// // setRouter("/users/:username/:password", '../');
// // setRouter("/upload", "./routes/upload")
// setRouter("/u", "./features/authentication/routes/auth");

//router.use("/u", require("../features/authentication/routes/auth"))
//router.get('/')
module.exports = router;

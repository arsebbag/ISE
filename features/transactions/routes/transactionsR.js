const router = require("express").Router();
const User = require("../../authentication/models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

router.route("/").post((req, res, next) => {

});

router.route("/create").post((req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                birthday: req.body.birthday,
                username: req.body.username,
                password: hashedPassword,
                userType: req.body.userType
            });
            await newUser.save();
            res.send("User Created");
        }
    });
});

module.exports = router
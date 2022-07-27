const router = require("express").Router();
const Admin = require("../../authentication/models/admin")
const User = require("../../authentication/models/user");
const Account = require("../models/account")
const bcrypt = require("bcryptjs");
const passport = require("passport");
//const session = require("express-session");

// encrypt the session details.
// router.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//     })
// );
// router.use(passport.session());

router.route("/").get((req, res, next) => {
    res.send("in account routes")
});
router.route("/account").get((req, res, next) => {
    res.send("in account/account routes")
});

router.route("/create").post(async (req, res) => {
    //need to check if the session is a admin 
    const data = req.body
    let newAccount = await new Account({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthday: data.birthday,
        balance: data.balance,
        username: data.username,
        password: data.password,
        //userType: data.userType
    });
    await newAccount.save();
    res.send("Account created");
});
router.route("/update/:id").post(async (req, res) => {
    try {
        const id = req.params.id;
        const uAccount = await Account.findByIdAndUpdate(id, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            birthday: data.birthday,
            username: data.username,
            password: data.password,
            //userType: data.userType
        }, { new: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
    console.log("1 document updated");
});
// router.route("/delete/:id").post(deleteAccount);


//controllers funcs - (maybe passe it to new controllers folder/file).
// const addAccount = async (req, res) => {
//     //need to check if the session is a admin 
//     const data = req.body
//     let newAccount = await new Account({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         birthday: data.birthday,
//         balance: data.balance,
//         username: data.username,
//         password: data.password,
//         //userType: data.userType
//     });
//     await newAccount.save();
//     res.send("Account created");
// }

// const updateAccount = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const uAccount = await Account.findByIdAndUpdate(id, {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             email: data.email,
//             birthday: data.birthday,
//             username: data.username,
//             password: data.password,
//             //userType: data.userType
//         }, { new: true });
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
//     console.log("1 document updated");
// }

const deleteAccount = async (req, res) => {
    //need to check if the session is a admin 
    try {
        const id = req.params.id;
        const account = await Account.findByIdAndRemove(id);
        if (!account) return res.status(404).send("account with the given id doesn't found");
    } catch (error) { res.status(400).send(error.message); }
    res.send("Account deleted");
}
router.route("/delete/:id").post(deleteAccount);

module.exports = router
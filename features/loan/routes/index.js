const router = require("express").Router();
const Account = require("../../account/models/account")
const User = require("../../authentication/models/user");
const Loan = require("../model/loan")

const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");
// encrypt the session details.
// router.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//     })
// );
// router.use(passport.session());

router.route("/").post((req, res, next) => {
    res.send("in Loan route")
});

//controllers funcs - (maybe passe it to new controllers folder/file).
const addLoan = async (req, res) => {
    //need to check if the session is a admin 
    const data = req.body
    const params = req.params
    let newLoan = new Loan({
        destAccount: data.destAccount,
        amount: data.amount,
        managerID: data.managerID,
        dateOfLoan: Date.now(),
        duration: data.duration
    });
    await newLoan.save();
    
    const account = await Account.findById(data.destAccount).exec();
    console.log(account)
    const user = await User.findById(account.id).exec();
    console.log(user.id)
    
    res.send("Loan created");
}


const deleteLoan = async (req, res) => {
    //need to check if the session is a admin 
    try {
        const id = req.params.id;
        const account = await Account.findByIdAndRemove(id);
        if (!account) return res.status(404).send("account with the given id doesn't found");
    } catch (error) { res.status(400).send(error.message); }
    res.send("Account deleted");
}

router.route("/create").post(addLoan);
router.route("/delete/:id").post(deleteLoan);

//function loanAutorization 
module.exports = router


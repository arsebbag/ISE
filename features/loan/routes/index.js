const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const Account = require("../../account/models/account")
const User = require("../../authentication/models/user");
const Loan = require("../model/loan")
const Utils = require("../../../utils/common")

// encrypt the session details.
// router.use(
//     session({
//         secret: "secretcode",
//         resave: true,
//         saveUninitialized: true,
//     })
// );
// router.use(passport.session());

//insomnia
// {
//     "srcAccount": "62e2f64b7d9b8c57953c9fd7",
//         "destAccount": "62e2f63f7d9b8c57953c9fd4",
//             "amount": "20",
//                 "managerID": "111",
//                     "dateOfLoan": "",
//                         "duration": "2"
// }

// loan's controllers
router.route("/").post((req, res, next) => {
    res.send("in Loan route")
});

//controllers funcs - (maybe passe it to new controllers folder/file).
const addLoan = async (req, res) => {
    const data = req.body
    const params = req.params
    let newLoan = new Loan({
        srcAccountId: data.srcAccountId,
        destAccountId: data.destAccountId,
        amount: data.amount,
        managerID: data.managerID,
        dateOfLoan: Date.now(),
        duration: data.duration
    });
    // if (req.session.user.role == 'M') {
    //     //check account - amount enough to validate the loan
    // }
    //dbg////////////////
    
    let srcAcc = await Utils.findAccountDetails(newLoan.srcAccountId)
    let dstAcc = await Utils.findAccountDetails(newLoan.destAccountId)
    // let srcUser = await Utils.findUserDetails(srcAcc.ownerId)
    // let dstUser = await Utils.findUserDetails(dstAcc.ownerId)
    let getAuth = loanAutorization(srcAcc.balance, dstAcc.balance, newLoan.amount); //verification of accounts balances

    //dbg/////////////////
    // console.log("srcacc\n",srcAcc)
    // console.log("srcacc\n", srcUser)
    // console.log(dstAccId)
    /////////////////

    if (!getAuth.cond) {
        console.log((await getAuth).message)
        //res.send((await getAuth).message);
    }
    await newLoan.save();
    res.send("Loan created");
}

const deleteLoan = async (req, res) => {
    //need to check if the session is a admin 
    try {
        const id = req.params.id;
        const loan = await Loan.findByIdAndRemove(id);
        if (!loan) return res.status(404).send("loan with the given id doesn't found");
    } catch (error) { res.status(400).send(error.message); }
    res.send("Loan deleted");
}

const getAllLoans = async (req, res) => {
    Loan.find()
        .then((loan) => res.json(loan))
        .catch((err) => res.status(400).json("Error: " + err));
}

//loan's routes
router.route("/create").post(addLoan);
router.route("/delete/:id").post(deleteLoan);
router.route("/loans").get(getAllLoans);


//TODO - move it to utils after it working
function loanAutorization(srcBalance, dstBalance, amount) {
    if (amount > 0.6 * srcBalance)//not autorized
    {
        return { "cond": 0, "message": "src account not have enough money for this loan amount" };
    }
    else if (amount > 0.5 * dstBalance)//not autorized
    {
        return { "cond": 0, "message": "dst account not have enough money for this loan amount" };
    }
    else {
        return { "cond": 1, "message": "Loan autorized" };
    }
}

module.exports = router


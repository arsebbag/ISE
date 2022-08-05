const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const Account = require("../../account/models/account")
const User = require("../../authentication/models/user");
const Loan = require("../model/loan")
const Utils = require("../../../utils/common")

// loan's controllers
router.route("/").post((req, res, next) => {
    res.send("in Loan route")
});

//CREATE LOAN 
// {
//     "srcAccountId": "62ecde84c444f977b9bc2ec8",
//         "destAccountId": "62ecdeaac444f977b9bc2ecc",
//             "amount": "10",
//                 "managerID": "111",
//                     "dateOfLoan": "",
//                         "duration": "2"
// }
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

    let srcAcc = await Utils.findAccountDetails(newLoan.srcAccountId)
    let dstAcc = await Utils.findAccountDetails(newLoan.destAccountId)
    // let srcUser = await Utils.findUserDetails(srcAcc.ownerId)
    // let dstUser = await Utils.findUserDetails(dstAcc.ownerId)

    /////check authorizations/////
    let getAuth = Utils.loanAutorization(srcAcc.balance, dstAcc.balance, newLoan.amount); //verification of accounts balances

    if (!getAuth.cond) {
        //console.log((await getAuth).message)
        res.send((await getAuth).message);
    }
    else {
        //handleAccountBalances(newLoan.srcAccountId, newLoan.destAccountId, newLoan.amount);
        await newLoan.save();
        res.send("Loan created");
    }
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

const deleteAllLoan = async (req, res) => {
    //need to check if the session is a admin 
    try {
        await Loan.remove({})
    } catch (error) { res.status(400).send(error.message); }
    res.send("All loans deleted");
}

const updateLoan = async (req, res) => {
    try {
        const id = req.params._id;
        const data = req.body;
        const uLoan = await Loan.findOneAndUpdate({ id: id }, {
            srcAccountId: data.srcAccountId,
            destAccountId: data.destAccountId,
            amount: data.amount,
            managerId: data.managerId,
            duration: data.duration
            //userType: data.userType
        }, { new: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
    console.log("1 document updated");
    res.send("ok")
}

const getAllLoans = async (req, res) => {

    Loan.find()
        .then((loan) => res.json(loan))
        .catch((err) => res.status(400).json("Error: " + err));
}

//loan's routes
router.route("/create").post(addLoan);
router.route("/delete/:id").post(deleteLoan);
router.route("/deleteAll").get(deleteAllLoan);
router.route("/update/:id").put(updateLoan);
router.route("/loans").get(getAllLoans);

module.exports = router


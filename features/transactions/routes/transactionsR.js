const router = require("express").Router();

const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const User = require("../../authentication/models/user");
const Transaction = require("../models/transactionsM")
router.route("/").post((req, res, next) => {

});

const addTransaction = async (req, res) => {
    const data = req.body
    const params = req.params
    let newTran = new Loan({
        sourceAccount: data.owner,
        destAccount: data.destAccount,
        balance: data.balance,
        dateOfTrans: Date.now()
    });
    if (req.session.user.role != 'M') {
        res.send("Need to get autorization from manager")
    }
    
    let getAuth = TransactionAutorization(newLoan.srcAccount, newLoan.destAccount, newLoan.amount)

    if (!getAuth.cond) {
        res.send((await getAuth).message);
    }
    await newTran.save();
    res.send("Transaction created");
}

const deleteTransaction = async (req, res) => {
    //need to check if the session is a admin 
    try {
        const id = req.params.id;
        const tran = await Transaction.findByIdAndRemove(id);
        if (!tran) return res.status(404).send("transaction with the given id doesn't found");
    } catch (error) { res.status(400).send(error.message); }
    res.send("Transaction deleted");
}

//need check not sure is ok
const getTransactions = async (req, res) => {
    Transaction.find()
        .then((tran) => res.json(tran))
        .catch((err) => res.status(400).json("Error: " + err));
}

router.route("/create").post(addTransaction);
router.route("/delete/:id").post(deleteTransaction);
router.route("/getTran").get(getTransactions);

async function TransactionAutorization(srcAccount, destAccount, amount) {
    if (amount > 0.6 * srcAccount.balance)//not autorized
    {
        return { "cond": 0, "message": "src account not have enough money for this Transaction amount" };
    }
    else if (amount > 0.5 * destAccount.balance)//not autorized
    {
        return { "cond": 0, "message": "dst account not have enough money for this Transaction amount" };
    }
    else {
        return { "cond": 1, "message": "Transaction autorized" };
    }
}
module.exports = router
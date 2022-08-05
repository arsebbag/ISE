const router = require("express").Router();

const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const User = require("../../authentication/models/user");
const Transaction = require("../models/transactions");
const BlockChain = require("../../../BlockChain/BlockChain");
const Utils = require("../../../utils/common");
//const Block = require("../../../BlockChain/Block");
router.route("/").post((req, res, next) => {
});

//Transaction's controller
const addTransaction = async (req, res) => {
    const data = req.body
    const params = req.params
    let newTran = new Transaction({ //need to change here
        id: 0,
        sourceAccountId: data.owner,
        destAccountId: data.destAccount,
        balance: data.balance,
        dateOfTrans: Date.now()
    });
    // if (req.session.user.role != 'M') {
    //     res.send("Need to get autorization from manager")
    // }

    //let getAuth = TransactionAutorization(newLoan.srcAccount, newLoan.destAccount, newLoan.amount)

    // if (!getAuth.cond) {
    //     res.send((await getAuth).message);
    // }
    if (!Utils.checkBalance(newTran.sourceAccountId)) {
        res.send("Transaction unauthorized - source account don't have enough money for this transaction");
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

const updateTransaction = async (req, res) => {
    try {
        const id = req.params._id;
        const data = req.body;
        await Transaction.findOneAndUpdate({ id: id }, {
            amount: data.amount
        }, { new: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
    console.log("1 document updated");
    res.send("1 document updated");
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
router.route("/update/:id").put(updateTransaction);

async function TransactionAutorization(srcBalance, dstBalance, amount) {
    //need to check: balance srAcccount have enough monney 
    if (amount > 0.6 * srcBalance)//not autorized
    {
        return { "cond": 0, "message": "src account not have enough money for this Transaction amount" };
    }
    else if (amount > 0.5 * dstBalance)//not autorized
    {
        return { "cond": 0, "message": "dst account not have enough money for this Transaction amount" };
    }
    else {
        return { "cond": 1, "message": "Transaction autorized" };
    }
}
module.exports = router
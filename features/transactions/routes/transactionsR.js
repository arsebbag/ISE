const router = require("express").Router();

const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const User = require("../../authentication/models/user");
const Transaction = require("../models/transactions");
const BlockChain = require("../../../BlockChain/BlockChain");
const Utils = require("../../../utils/common");
const Block = require("../../../BlockChain/Block");
const mongoose = require("mongoose")
router.route("/").post((req, res, next) => {
});

//Transaction's controller
const addTransaction = async (req, res) => {
    const Data = req.body;
    let srcAcc = await Utils.findAccountDetails(Data.data.srcAccountId)
    let dstAcc = await Utils.findAccountDetails(Data.data.destAccountId)

    //first check and after fill and save in database
    let getAuth = Utils.transactionAutorization(srcAcc.balance, dstAcc.balance, Data.amount); //verification of accounts balances
    if (!getAuth.cond) {
        //console.log(getAuth.message)
        res.send(getAuth.message);
    }
    if (!Utils.checkBalance(Data.data.srcAccountId)) {
        res.send("Transaction unauthorized - source account don't have enough money for this transaction");
    }
    let block = new Block()
    let newTran = new Transaction({ //need to change here
        id: Data.id,
        thisHash: Data.thisHash,
        prevHash: Data.prevHash,
        data: Data.data,
        dateOfTrans: Date.now()
    });
    // if (req.session.user.role != 'M') {
    //     res.send("Need to get autorization from manager")
    // }
    await newTran.save();
    res.send("Transaction created");
}

const deleteTransaction = async (req, res) => {
    const id = req.params.id.slice(1);
    const tran = await Transaction.findByIdAndRemove(id).exec(function (err, item) {
        if (err) {
            return res.json({ success: false, msg: 'Cannot remove item' });
        }
        if (!item) {
            return res.status(404).json({ success: false, msg: 'Transaction not found' });
        }
        res.json({ success: true, msg: 'Transaction deleted.' });
    });

}

const updateTransaction = async (req, res) => {
    try {
        const id = req.params.id.slice(1);
        const Data = req.body;
        await Transaction.findOneAndUpdate({ _id: id }, {
            data: { amount: Data.data.amount }
        }, { new: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
    console.log("1 document updated");
    res.send("1 document updated");
}

const getTransactions = async (req, res) => {
    Transaction.find()
        .then((tran) => res.json(tran))
        .catch((err) => res.status(400).json("Error: " + err));
}

const getOneTransaction = async (req, res) => {
    const id = req.params.id.slice(1);
    Transaction.findById({ _id: id })
        .then((tran) => res.json(tran))
        .catch((err) => res.status(400).json("Error: " + err));
}

const deleteAllTran = async (req, res) => {
    //need to check if the session is a admin 
    try {
        await Transaction.remove({})
    } catch (error) { res.status(400).send(error.message); }
    res.send("All transactions deleted");
}

router.route("/create").post(addTransaction);
router.route("/delete/:id").get(deleteTransaction);
router.route("/getAll").get(getTransactions);
router.route("/update/:id").put(updateTransaction);
router.route("/getOne/:id").get(getOneTransaction);
router.route("/deleteAll").get(deleteAllTran);


module.exports = router
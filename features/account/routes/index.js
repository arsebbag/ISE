const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const User = require("../../authentication/models/user");
const Account = require("../models/account")
const exchange = require("../../api/moneyExchange")
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

//Account controllers
router.route("/").get((req, res, next) => {
    res.send("in account routes")
});

router.route("/create").post(async (req, res) => {
    //need to check if the session is a admin 
    const data = req.body
    let newAccount = new Account({
        ownerId: data.ownerId,
        balance: data.balance,
        managerId: data.managerId
    });

    let srcUser = await Utils.findUserDetails(newAccount.ownerId)
    console.log(srcUser.username)
    //check if this user have already an account
    let accountsCount = await CountUserID(newAccount.ownerId);//.then(res => console.log(res)).catch(err => console.log(err);
    //dbg
    console.log(accountsCount)

    if (accountsCount > 1) {
        console.log(`user no. ${newAccount.ownerId} already have an account!`);
        res.send(`user ${srcUser.username}, no. ${newAccount.ownerId} already have an account!`);
    } else {
        await newAccount.save();
        res.send("Account created");
        console.log("good");
    }
});

async function CountUserID(userId) {
    return Account.countDocuments({ ownerId: userId }).then(res => {
        console.log(res)
        return res;
    })
    // console.log("Aaa")
    // let a = await Account.countDocuments({ owner: userId });
    // console.log(a);
    // return a;
}

router.route("/update/:id").post(async (req, res) => {
    try {
        const id = req.params.id;
        const uAccount = await Account.findByIdAndUpdate(id, {
            ownerId: data.ownerId,
            balance: data.balance,
            managerId: data.managerId
            //userType: data.userType
        }, { new: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
    console.log("1 document updated");
});

const deleteAccount = async (req, res) => {
    //need to check if the session is a admin 
    try {
        const id = req.params.id;
        const account = await Account.findByIdAndRemove(id);
        if (!account) return res.status(404).send("account with the given id doesn't found");
    } catch (error) { res.status(400).send(error.message); }
    res.send("Account deleted");
}

const getAllAccounts = async (req, res) => {
    //need to check if the session is a admin 
    Account.find()
        .then((account) => res.json(account))
        .catch((err) => res.status(400).json("Error: " + err));
}

//not working
const deleteAllAccounts = async (req, res) => {
    //need to check if the session is a admin 
    console.log("here")
    Account.deleteMany({ owner: "62e2f63f7d9b8c57953c9fd4" }).catch(err => {
        console.log(err)
    });
}

function addMoneyToAccount(account, amount) {
    account.balance += amount //maybe put all the money in LevCoin
}
function subMoneyfromAccount(account, amount) {
    account.balance -= amount// if <= 0 need to create event to manager
}function getAllBalanceCurrencies(balance) {
    return {
        "LEVCOIN": balance,
        "ILS": exchange.LEVCOINILS * balance,
        "USD": exchange.LEVCOIN * balance
    }
}
//Account routes 
router.route("/delete/:id").post(deleteAccount);
router.route("/accounts").get(getAllAccounts);
router.route("/deleteAll").get(deleteAllAccounts);
router.route("/accounts").get(getAllAccounts);


module.exports = router
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
        balance: data.balance,// - not need it if the manager give money + create func addMoneyToAccount()
        managerId: data.managerId
    });

    let srcUser = await Utils.findUserDetails(newAccount.ownerId)
    //check if user exist
    if (srcUser == null) {
        res.send(`user ID - ${newAccount.ownerId} doesn't exist, can't create this account!`)
    }
    //check if this user have already an account
    let accountsCount = await CountUserID(newAccount.ownerId);//.then(res => console.log(res)).catch(err => console.log(err);
    if (accountsCount >= 1) {
        res.send(`user ${srcUser.username}, no. ${newAccount.ownerId} already have an account!`);
    } else {
        await newAccount.save();
        res.send("Account created");
    }
});
//TODO -change to boolean func
async function CountUserID(userId) {
    return Account.countDocuments({ ownerId: userId }).then(res => {
        console.log(res)
        return res;
    })
}

const updateAccount = async (req, res) => {
    try {
        const id = req.params._id;
        const data = req.body;
        await Account.findOneAndUpdate({ id: id }, {
            balance: data.balance,
            managerId: data.managerId,
        }, { new: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
    console.log("1 document updated");
    res.send("1 document updated");
}


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
    Account.remove({}).catch(err => {
        console.log(err)
    });
    res.send("All accounts deleted");
}

function addMoneyToAccount(account, amount) {
    account.balance += amount //maybe put all the money in LevCoin
}
function subMoneyfromAccount(account, amount) {
    account.balance -= amount// if <= 0 need to create event to manager
}
function getAllBalanceCurrencies(balance) {
    return {
        "LEVCOIN": balance,
        "ILS": exchange.LEVCOINILS * balance,
        "USD": exchange.LEVCOIN * balance
    }
}
//Account routes 

router.route("/accounts").get(getAllAccounts);
router.route("/delete/:id").post(deleteAccount);
router.route("/deleteAll").get(deleteAllAccounts);
router.route("/update/:id").put(updateAccount);


module.exports = router
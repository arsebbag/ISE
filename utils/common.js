
//moved to API
// var LEVCOIN = 5; // 1 LevCoin is equals to 5 dollars
// var countLevCoin = 0;

// function buyLevCoin(num) {
//     countLevCoin += num;
//     LEVCOIN = Math.ceil(LEVCOIN - (LEVCOIN/1000 + countLevCoin))
// }
const Account = require("../features/account/models/account")
const User = require("../features/authentication/models/user") 
const mongoose = require('mongoose')


function getCurrentDateTime() {
    return getStringFromDateTime(new Date());
}

function getCurrentDate() {
    return getStringFromDate(new Date());
}

function getStringFromDateTime(dateobj) {
    return getStringFromTime(dateobj) + " " + getStringFromDate(dateobj);
}

function getStringFromDate(dateobj) {
    return dateobj.getDate().toString().padStart(2, '0') +
        "/" +
        (dateobj.getMonth() + 1).toString().padStart(2, '0') +
        "/" +
        dateobj.getFullYear();
}

function getStringFromTime(dateobj) {
    return dateobj.getHours().toString().padStart(2, '0') + ":" +
        dateobj.getMinutes().toString().padStart(2, '0');
}

function getDateTimeFromString(dateStr) {
    let splitDate = dateStr.split(" ");
    let time = splitDate[0];
    let date = splitDate[1].split("/");
    return Date.parse(`${time} ${date[1]}/${date[0]}/${date[2]}`);
}

function getDateFromString(dateStr) {
    let splitDate = dateStr.split("/");
    return new Date(`${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`);
}
function isManager(user) {
    return user.role == "M";
}
async function findAccountDetails(accountId){
    return Account.findById(accountId).then(res=>{
        return res;
    }).catch(err=>{
        console.log(err)
    })//{id:accountId}
}
async function findUserDetails(userId) {
    return await User.findById(userId)//{ id: userId }
}

module.exports = {
    getCurrentDateTime,
    getCurrentDate,
    getStringFromDate,
    getDateTimeFromString,
    getStringFromDateTime,
    getDateFromString,
    isManager,
    findAccountDetails,
    findUserDetails
};
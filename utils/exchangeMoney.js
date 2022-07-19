var fx = require("money");

function changeDollarToIls(amount) {
    if(amount == undefined || amount < 0)  
        return;
    return fx(amount).from("USD").to("ILS");

}

function changeIlsToDollar(amount) {
    if (amount == undefined || amount < 0)
        return;
    return fx(amount).from("ILS").to("USD");
}
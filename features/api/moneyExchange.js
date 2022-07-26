// js file to change money(USD, ILS, LevCoin) via api of money exchange
const axios = require("axios")

const strUSDtoILS = "&base=USD&target=ILS"
const strILStoUSD = "&base=ILS&target=USD"
const connectionString = "https://exchange-rates.abstractapi.com/v1/live/?api_key=a5d23cd37c184fbd9115982deba4f48f"

async function changeUSDtoILS(amount) {
    return axios.get(connectionString + strUSDtoILS)
        .then(response => {
            return response.data.exchange_rates.ILS * amount
        })
        .catch(error => {
            return error
        });
}

async function changeILStoUSD(amount) {
    return axios.get(connectionString + strILStoUSD)
        .then(response => {
            return response.data.exchange_rates.USD * amount
        })
        .catch(error => {
            return error
        });
}

async function changeLevToUSD() {
}
//dbg
changeUSDtoILS(4).then((result) => {
    console.log(result)
})
//changeILStoUSD()


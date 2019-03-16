
var latestRates = {};
var weakestCurrency;

function fixerNotes() {
    // Fixer API
    // Documentation: https://fixer.io/documentation
    
    // 5 Available Endpoints:
    // Latest Rates- Returns real-time exchange rate data for all available or a specific set of currencies
    // Convert- Allows for conversion of any amount from one currency to another.
    // Historical Rates- Returns historical exchange rate data for all available or a specific set of currencies.
    // Time-Series Data- Returns daily historical exchange rate data between two specified dates for all available or a specific set of currencies.
    // Fluctuation Data- Returns fluctuation data between two specified dates for all available or a specific set of currencies. 
};

function getLatestRates() {
    var APIKey = "7be7f813f8d8b80f94d0bb9ddd6684fa";
    var getLatestRatesURL = "http://data.fixer.io/api/latest?access_key=" + APIKey;
    $.ajax({
        url: getLatestRatesURL,
        method: "GET"
    }).then(function (response) {
        // setup USD as base currency (free version uses EUR base)
        var base = response.rates.USD/response.rates.EUR;
        // https://stackoverflow.com/questions/16095301/finding-highest-values-amongst-javascript-variables
        latestRates = [
            {symbol: "USD", rate: response.rates.USD/base}, // US Dollar
            {symbol: "BTC", rate: response.rates.BTC/base}, // BitCoin
            {symbol: "AUD", rate: response.rates.AUD/base}, // Australian Dollar
            {symbol: "EUR", rate: response.rates.EUR/base}, // Euro
            {symbol: "INR", rate: response.rates.INR/base}, // Indian Rupee
        ];
        console.log(response);
        console.log("latestRates... ", latestRates);
        console.log("BitCoin Price...", latestRates[0].rate/latestRates[1].rate);
    })};


function findWeakestCurrency() {
    var weakestSoFar = 0;
    var result;
    for (var i = 0; i < latestRates.length; i++) {
        if (latestRates[i].rate > weakestSoFar) {
            result = latestRates[i];
            weakestSoFar = latestRates[i].rate;
        }
    }
    return result;
}
weakestCurrency = findWeakestCurrency();
console.log("weakest...",weakestCurrency);








// >>>>>>>>>>>>>>>>>>>> CALL FUNCTIONS <<<<<<<<<<<<<<<<<<<<
getLatestRates();

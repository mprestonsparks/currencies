

var latestRates = {};
var weakestCurrency;
// >*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<

// getLatestRates();
// >*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<>*<

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
        latestRates = [
            {symbol: "USD", rate: response.rates.USD/base}, // US Dollar
            {symbol: "BTC", rate: response.rates.BTC/base}, // BitCoin
            {symbol: "AUD", rate: response.rates.AUD/base}, // Australian Dollar
            {symbol: "EUR", rate: response.rates.EUR/base}, // Euro
            {symbol: "INR", rate: response.rates.INR/base} // Indian Rupee
        ];
        console.log(response);
        console.log(latestRates);
        weakestCurrency = findWeakestCurrency();
        console.log("weakest...",weakestCurrency);

        writeToPage();

    })};

function findWeakestCurrency() {
    var weakestSoFar = 1;
    var result = [];
    var size = Object.keys(latestRates).length;
    console.log("size...",size);
    for (var i = 0; i < size; i++) {
        if (latestRates[i].rate > weakestSoFar) {
            weakestSoFar = latestRates[i].rate;
            result = latestRates[i].symbol;
        };
    };
    return result;
}



function writeToPage() {
    // US Dollar Exchange Rates
        // USD:INR Exchange Rate to 6 decimals
        var USDtoINR_unrounded = latestRates[4].rate;
        var USDtoINR = USDtoINR_unrounded.toFixed(6);
        $("#usd-inr-rate").empty();
        $("#usd-inr-rate").append(USDtoINR);

        // USD:EQC

        // USD:XBT to 6 decimals
        var USDtoXBT_unrounded = latestRates[1].rate;
        var USDtoXBT = USDtoXBT_unrounded.toFixed(6);
        $("#usd-xbt-rate").empty();
        $("#usd-xbt-rate").append(USDtoXBT);

    // US Dollar Wallet Balances
        // USD Wallet Initial Balance
        var USDBalance_Initial = 1000;
        $(".usd-wallet-initial").empty();
        $(".usd-wallet-initial").append("$"+(USDBalance_Initial).toFixed(2));

        // USD Wallet Balance in INR
        var USDBalanceInINR_unrounded = USDBalance_Initial * USDtoINR_unrounded;
        var USDBalanceInINR = USDBalanceInINR_unrounded.toFixed(2);
        $("#usd-inr-balance").empty();
        $("#usd-inr-balance").append("&#8377;"+USDBalanceInINR);

        // USD Wallet Balance in EQC

        // USD Wallet Balance in XBT
        var USDBalanceInXBT_unrounded = USDBalance_Initial * USDtoXBT_unrounded;
        var USDBalanceInXBT = USDBalanceInXBT_unrounded.toFixed(6);
        $("#usd-xbt-balance").empty();
        $("#usd-xbt-balance").append("&#x20BF;"+USDBalanceInXBT);

    // Indian Rupee Exchange Rates
        // INR:USD
        var INRtoUSD_unrounded = (1/latestRates[4].rate)
        var INRtoUSD = INRtoUSD_unrounded.toFixed(6);
        $("#inr-usd-rate").empty();
        $("#inr-usd-rate").append(INRtoUSD);
        
        // INR:EQC

        // INR:XBT
        var INRtoXBT_unrounded = latestRates[1].rate/USDtoINR_unrounded;
        var INRtoXBT = INRtoXBT_unrounded.toFixed(6);
        $("#inr-xbt-rate").empty();
        $("#inr-xbt-rate").append(INRtoXBT);

    // Indian Rupee Wallet Balances
        // INR Wallet Initial Balance
        var INRBalance_Initial = 1000.00;
        $(".inr-wallet-initial").empty();
        $(".inr-wallet-initial").append("&#8377;"+(INRBalance_Initial).toFixed(2));

        // INR Wallet Balance in USD
        var INRBalanceInUSD_unrounded = INRBalance_Initial * INRtoUSD_unrounded;
        var INRBalanceInUSD = INRBalanceInUSD_unrounded.toFixed(2);
        $("#inr-usd-balance").empty();
        $("#inr-usd-balance").append("$"+INRBalanceInUSD);

        // INR Wallet Balance in EQC

        // INR Wallet Balance in XBT
        var INRBalanceInXBT_unrounded = INRBalance_Initial * INRtoXBT_unrounded;
        var INRBalanceInXBT = INRBalanceInXBT_unrounded.toFixed(6);
        $("#inr-xbt-balance").empty();
        $("#inr-xbt-balance").append("&#x20BF;"+INRBalanceInXBT);


        // ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
        var base1 = 1/(USDtoINR_unrounded);
        var USDEQC1 = base1 + 1;
        var USDEQC2 = base1/USDEQC1;

        var base2 = 1;
        var INREQC1 = base2 + base1;
        var INREQC2 = base2 / INREQC1;

        console.log("base 1...",base1);
        console.log("USD 1...",USDEQC2);
        console.log("~~~~~~~~~~~");
        console.log("base 2...",base2);
        console.log("INR 2...",INREQC2);
        console.log("~~~~~~~~~~~");
        console.log(USDEQC2 + INREQC2);

}


// Update rates every 5 seconds
function updateRates() {
    setInterval(getLatestRates,5000);
}
// updateRates();

getLatestRates();


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
        console.log(response);
    })};

getLatestRates();
       
const https = require('https'),
      http = require('http'),
      dotenv = require('dotenv');

dotenv.config();

function printHelp() {
    //Prints usage information
    console.log("USAGE: node app.js STOCKSYMBOL");
}

function makeRequest(sym, callback) {
    //Makes the API request
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sym}&apikey=${process.env.API_KEY}`;
    const request = https.get(url, res => {
        
        if (res.statusCode === 200) { 
            let output = "";
            res.on('data', chunk => {
                output += chunk.toString();
            })
            
            res.on('error', callback);
            
            res.on("end", () => {
                output = JSON.parse(output);
                callback(null, output);
            })
        } else {
            let error = new Error(`Error: ${http.STATUS_CODES[res.statusCode]}`)
            return callback(error);
        }
    }).on('error', e => {
        console.log('Invalid request!');
    })
    
}

function getDate() {
    
    function addZero(num) {
          if (num < 10) {
            return "0" + num;
          } else {
            return num;
          }
          
    }
    
    let d = new Date();
    return d.getFullYear() + "-" + addZero(d.getMonth() + 1) + "-" + addZero(d.getDate());
}

function createOutputString(res) {
    
    const date = Object.keys(res["Time Series (Daily)"])[0]
    return `
    \x1b[34m\x1b[1mInformation for ${res['Meta Data']['2. Symbol']} on ${date}:\x1b[0m
        Open: ${res["Time Series (Daily)"][date]["1. open"]}
        Close: ${res["Time Series (Daily)"][date]["4. close"]}
        High: ${res["Time Series (Daily)"][date]["2. high"]} 
        Low: ${res["Time Series (Daily)"][date]["3. low"]}
        Volume: ${res["Time Series (Daily)"][date]["5. volume"]}
        `;
}

module.exports.getData = makeRequest;
module.exports.getDate = getDate;
module.exports.createOutputString = createOutputString;
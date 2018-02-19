const https = require('https'),
      http = require('http'),
      dotenv = require('dotenv');

dotenv.config();

/*function printHelp() {
    //Prints usage information
    console.log("USAGE: node app.js STOCKSYMBOL ");
}*/

function makeRequest(sym, callback) {
    //Makes the API request
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sym}&apikey=${process.env.API_KEY}&outputsize=full`;
    console.log(url)
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




module.exports.getData = makeRequest;

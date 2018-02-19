const https = require('https'),
      http = require('http'),
      dotenv = require('dotenv');

dotenv.config();

class Request{
    
    constructor(sym) {
        this.sym = sym;
    }
    
    makeRequest(now = null, interval = null, specificDate = null, callback) {
        //Makes api request, based on parameters defined, if specificDate not defined just gets latest stock data,
        //otherwise gets specified date, if now is defined get real time intraday  data(in interval defined)
        let url = `https://www.alphavantage.co/query?function=${now === null ? 'TIME_SERIES_DAILY' : 'TIME_SERIES_INTRADAY'}&symbol=${this.sym}${interval !== null ? '&interval=' + interval + 'min' : ''}&apikey=${process.env.API_KEY}`;
        url += specificDate !== null ? '&outputsize=full' : '';
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
    
    verifyDate(date) {
        return /^(\d\d\d\d) - 
    }
}






module.exports = Request;

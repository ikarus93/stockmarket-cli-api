const https = require('https'),
      http = require('http'),
      dotenv = require('dotenv'),
      fs = require('fs-extra'),
      os = require('os');
      
dotenv.config();   //configurates environment variables

class Request{
//Contains all logic regarding request making, response parsing and output as well as error handling and input parameter validation
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
    
    checkRequest(err, response, date, intra) {
         if (err) console.log(`Request or Server Error: ${err.message}! `)
        try { 
            if(!intra) {
                console.log(this.createOutputRegular(response, date));
            } else {
               this.createOutputIntra(response);
            }
            
        } catch (e) {
            if (e instanceof TypeError) {
                if(!date) {
                    console.log(`\nWrong or invalid symbol: \x1b[1m\x1b[31m${this.sym}\u001b[0m. Please try again with a valid stock marker.\n\x1b[32mFor a full list of stock symbols visit http://eoddata.com/symbols.aspx\n`);
                } else {
                    console.log(`\nWrong Date: \x1b[1m\x1b[31m${date}\u001b[0m was not a trading day, so there is no stock information available.\nPlease try again with a valid date specification `)
                }
                
            }
        }
    }
    
    createOutputRegular(res, date) {
            //Creates output string for all non intra-day data, use date to differ between request by date or just the latest data
            const d = date !== null ? date : Object.keys(res['Time Series (Daily)'])[0];
            return `
            \x1b[34m\x1b[1mInformation for "${res['Meta Data']['2. Symbol']}" on ${d}:\x1b[0m
                Open: ${res['Time Series (Daily)'][d]['1. open']}
                Close: ${res['Time Series (Daily)'][d]['4. close']}
                High: ${res['Time Series (Daily)'][d]['2. high']} 
                Low: ${res['Time Series (Daily)'][d]['3. low']}
                Volume: ${res['Time Series (Daily)'][d]['5. volume']}
                `;
}

    createOutputIntra(res) {
        //takes intraday data and writes it to file
        let resHead = res['Meta Data'];
        let dir = os.homedir() + `/intraday_logs/${this.sym}/`;
            
        let path = `${dir}/${resHead['3. Last Refreshed']}.txt`.replace(" ", "-");
        console.log(path)
        fs.outputJson(path, res, err => {
            if (err) {
                console.log(`Error creating file at ${path}. Please try again`);
            } else {
                console.log(`Success: File saved at ${path}`)
            }
        })
    }

    verifyDate(date) {
        try {
            let dateArr = date.split("-");
            let correctYear = dateArr[0] >= new Date().getFullYear() - 15;;
            let correctMonth = dateArr[1] > 0 && dateArr[1] <= 12;
            let correctDay = dateArr[2] > 0 && dateArr[2] <= 31;
            return /^(\d\d\d\d)-(\d\d)-(\d\d)/.test(date) &&  correctYear && correctMonth && correctDay;
        } catch(e) {
            return false;
        }
        
    }
}






module.exports = Request;

const Request = require('./logic/request'),
      data = require('./logic/dataHandling');

const req = new Request(process.argv[2]); //instantiates request object

if (!process.argv[3]) { //meaning that users requests default = latest stock data from closed trading day
    req.makeRequest(null, null, null, (err, res) => {
        if (err) console.log(`Error: ${err.message}! `)
        try { //try/catch determines if stocksymbol was valid and a parsable response was returned
            console.log(data.createOutputString(res));
        } catch (e) {
            if (e instanceof TypeError) {
                console.log(`\nWrong or invalid symbol: \x1b[1m\x1b[31m${process.argv[2]}\u001b[0m. Please try again with a valid stock marker.\n\x1b[32mFor a full list of stock symbols visit http://eoddata.com/symbols.aspx\n`);
            }
        }
    })

} else if(process.argv[3] === 'now' && [1,5,15,30,60].indexOf(parseInt(process.argv[4])) !== -1) {
    //Case that User wants interday data and has supplied a valid time interval for the two consecutive data points
    req.makeRequest(true, process.argv[4], null, (err, res) => {
        if (err) console.log(`Error: ${err.message}! `)
        try { 
            console.log(res)
        } catch (e) {
            if (e instanceof TypeError) {
                console.log(`\nWrong or invalid symbol: \x1b[1m\x1b[31m${process.argv[2]}\u001b[0m. Please try again with a valid stock marker.\n\x1b[32mFor a full list of stock symbols visit http://eoddata.com/symbols.aspx\n`);
            }
        }
    })
} else if(process.argv[3]) {
    
}
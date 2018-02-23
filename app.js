const Request = require('./logic/request');
const req = new Request(process.argv[2]); //instantiates request object

if (!process.argv[3]) { //meaning that users requests default = latest stock data from closed trading day
    req.makeRequest(null, null, null, (err, res) => {
        req.checkRequest(err, res, null, false)
    })

} else if(process.argv[3] === 'now' && [1,5,15,30,60].indexOf(parseInt(process.argv[4])) !== -1) {
    //Case that User wants interday data and has supplied a valid time interval for the two consecutive data points
    req.makeRequest(true, process.argv[4], null, (err, res) => {
       req.checkRequest(err, res, null, true);
    })
} else if(req.verifyDate(process.argv[3])) {
    req.makeRequest(null, null, process.argv[3], (err, res) => {
        req.checkRequest(err, res, process.argv[3], false)
  
    })
} else {
    console.log("Invalid argument list or date. Check documentation for how to properly input arguments.\nWhen looking for intraday data, make sure to add an interval as final parameter [1,5,15,30,60]!")
}
const request = require('./logic/request'),
      data = require('./logic/dataHandling');
      
request.getData(process.argv[2], (err, res) => {
    
    if(err) {
        console.log(`Error: ${err.message}! `)
    }
    
    try {
        console.log(data.createOutputString(res));
    } catch (e) {
        if (e instanceof TypeError) {
            console.log(`\nWrong or invalid symbol: \x1b[1m\x1b[31m${process.argv[2]}\u001b[0m. Please try again with a valid stock marker.\n\x1b[32mFor a full list of stock symbols visit http://eoddata.com/symbols.aspx\n`);
        }
    }
    
});
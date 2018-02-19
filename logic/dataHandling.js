function createOutputString(res, date) {
    
    const d = date || Object.keys(res['Time Series (Daily)'])[0]
    return `
    \x1b[34m\x1b[1mInformation for ${res['Meta Data']['2. Symbol']} on ${d}:\x1b[0m
        Open: ${res['Time Series (Daily)'][d]['1. open']}
        Close: ${res['Time Series (Daily)'][d]['4. close']}
        High: ${res['Time Series (Daily)'][d]['2. high']} 
        Low: ${res['Time Series (Daily)'][d]['3. low']}
        Volume: ${res['Time Series (Daily)'][d]['5. volume']}
        `;
}


function parseDataSet(data, date) {
    console.log(createOutputString(data, date))
}

module.exports.parseDataSet = parseDataSet;
module.exports.createOutputString = createOutputString;
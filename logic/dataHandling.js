



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

module.exports.createOutputString = createOutputString;
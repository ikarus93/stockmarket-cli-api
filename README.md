Small command-line interfaced app to retrieve stockdata for a specific stock for up to 15 years.
Also supports intraday-data which is written to a file.

USAGE: 
    Retrieve latest stockdata:
        node app.js [STOCKNAME] 
    
    Retrieve data for a specific data point for up to 15 years in the past
        node app.js [STOCKNAME] [YYYY-MM-DD]
    
    Retrieve intraday data (possible intervals are (1,5,15,30,60)
        node app.js [STOCKNAME] now [INTERVAL]
        


Created by Farid Wilhelm Zimmermann
import { get } from 'request';
import { waterfall } from 'async';

export function fetchCSVArray(csvUrl, delimiter = ',', callback) {
    get(csvUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let csv = body;
            // Continue with csv processing here.
            // Split the result to an array of lines
            let lines = csv.split('\r\n');
            // Split the lines themselves by the specified
            // delimiter, such as a comma
            let result = lines.map(function (line) {
                return line.split(delimiter);
            });
            callback(null, result);
        } else {
            callback(error);
        }
    });
}

export function fetchCSVColumns(csvUrl, delimiter, columnNames, callback) {
    waterfall([
        function (cb) {
            // get the csv Array
            fetchCSVArray(csvUrl, delimiter, (err, res) => {
                cb(err, res);
            });
        },
        function (csvArray, cb) {
            // extract the columns from csv Array
            let columnsArr = extractCSVColumnsArr(csvArray, columnNames);
            cb(null, columnsArr);
        }
    ], function (err, result) {
        return callback(err, result);
    });
}

// todo write test for this function
export function fetchCSVHColumns(csvUrl, delimiter, columnNames, callback) {
    waterfall([
        function (cb) {
            // get the csv Array
            fetchCSVArray(csvUrl, delimiter, (err, res) => {
                cb(err, res);
            });
        },
        function (csvArray, cb) {
            // extract the columns from csv Array
            let columnsArr = extractCSVHColumnsArr(csvArray, columnNames);
            cb(null, columnsArr);
        }
    ], function (err, result) {
        return callback(err, result);
    });
}

export function extractCSVColumnsArr(csvArray, columnNames) {
    let csvColsArr = []
    //initialize the result
    for (let i = 0; i < columnNames.length; i++) {
        csvColsArr[i] = [];
    }
    // check if the csv has atleast 2 rows
    if (csvArray.length < 2) {
        return csvColsArr;
    }
    // check if the csv header has atleast one column
    if (csvArray[0].length < 1) {
        return csvColsArr;
    }
    for (let i = 0; i < columnNames.length; i++) {
        let colDataArr = [];
        // get the index of columnName in the csvHeader
        let colIndex = csvArray[0].indexOf(columnNames[i]);
        if (colIndex < 0) {
            continue;
        }
        // push data into the array
        for (let k = 1; k < csvArray.length; k++) {
            //check if row has enough columns as the header
            if (csvArray[k].length >= csvArray[0].length) {
                colDataArr.push(csvArray[k][colIndex]);
            }
        }
        // store data in the result dictionary
        csvColsArr[i] = colDataArr;
    }
    return csvColsArr;
}

// todo write test for this function
export function extractCSVHColumnsArr(csvArray, columnNames) {
    //initialize the result
    let csvColsArr = []
    for (let i = 0; i < columnNames.length; i++) {
        csvColsArr[i] = [];
    }

    // check if the csv has atleast 2 columns
    if (csvArray[0].length < 2) {
        return csvColsArr;
    }
    // check if the csv header has atleast one row
    if (csvArray.length < 1) {
        return csvColsArr;
    }

    // get the array headers
    let arrayHeaders = [];
    for (let i = 0; i < csvArray.length; i++) {
        arrayHeaders.push(csvArray[i][0]);
    }

    for (let i = 0; i < columnNames.length; i++) {
        let colDataArr = [];

        // get the index of columnName in the arrayHeaders
        let colIndex = arrayHeaders.indexOf(columnNames[i]);
        if (colIndex < 0) {
            continue;
        }

        // check if we have atleast one column
        if (csvArray[colIndex].length > 0) {
            // push data into the array
            colDataArr = csvArray[colIndex].slice(1);
        }

        // store data in the result dictionary
        csvColsArr[i] = colDataArr;
    }

    return csvColsArr;
}
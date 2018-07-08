import { get } from 'request';
import { waterfall } from 'async';

export function fetchCSVArray(csvUrl, callback) {
    get(csvUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let csv = body;
            let delimiter = ',';
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

export function fetchCSVColumns(csvUrl, columnNames, callback) {
    waterfall([
        function (cb) {
            // get the csv Array
            fetchCSVArray(csvUrl, (err, res) => {
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
            colDataArr.push(csvArray[k][colIndex]);
        }
        // store data in the result dictionary
        csvColsArr[i] = colDataArr;
    }
    return csvColsArr;
}
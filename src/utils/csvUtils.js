import { get } from 'request';

export function fetchCSVArray(csvUrl, callback) {
    get(csvUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
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
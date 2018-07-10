import { fetchCSVArray, fetchCSVColumns, fetchCSVHColumns } from './csvUtils';
import { waterfall } from 'async';

/*
async waterfall example
https://stackoverflow.com/questions/22424592/nodejs-async-series-pass-arguments-to-next-callback

jest testing callback functions
https://stackoverflow.com/questions/45149744/how-does-jests-callback-testing-actually-work
*/

it('tests the fetchCSVArray function', done => {
    waterfall([
        function (callback) {
            // get the csv Array
            fetchCSVArray('http://localhost:8807/sample_1.csv', undefined, (err, res) => {
                callback(err, res);
            });
        }
    ], function (err, result) {
        expect(err).toBe(null);
        expect(result).not.toBe(null);
        expect(Array.isArray(result)).toBe(true);
        console.log(result);
        done();
    });
});

it('tests the fetchCSVColumns function', done => {
    waterfall([
        function (callback) {
            // get the csv Array
            fetchCSVColumns('http://localhost:8807/sample_1.csv', undefined, ['x', 'y', 'z'], (err, res) => {
                callback(err, res);
            });
        }
    ], function (err, result) {
        expect(err).toBe(null);
        expect(result).not.toBe(null);
        expect(Array.isArray(result)).toBe(true);
        expect(Array.isArray(result[0])).toBe(true);
        expect(Array.isArray(result[1])).toBe(true);
        expect(Array.isArray(result[2])).toBe(true);
        console.log(result);
        done();
    });
});

it('tests the fetchCSVHColumns function', done => {
    waterfall([
        function (callback) {
            // get the csv Array
            fetchCSVHColumns('http://localhost:8807/sample_3.csv', undefined, ['x', 'y', 'z'], (err, res) => {
                callback(err, res);
            });
        }
    ], function (err, result) {
        expect(err).toBe(null);
        expect(result).not.toBe(null);
        expect(Array.isArray(result)).toBe(true);
        expect(Array.isArray(result[0])).toBe(true);
        expect(Array.isArray(result[1])).toBe(true);
        expect(Array.isArray(result[2])).toBe(true);
        console.log(result);
        done();
    });
});

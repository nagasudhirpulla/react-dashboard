import { fetchCSVArray } from './csvUtils';
import { waterfall } from 'async';

/*
async waterfall example
https://stackoverflow.com/questions/22424592/nodejs-async-series-pass-arguments-to-next-callback

jest testing callback functions
https://stackoverflow.com/questions/45149744/how-does-jests-callback-testing-actually-work
*/

it('tests the fetchCSVArray function', done => {
    waterfall([
        function(callback){
            fetchCSVArray('http://localhost:8807/sample_1.csv', (err, res)=>{
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
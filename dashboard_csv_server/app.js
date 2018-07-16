var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var cors = require('cors');
var fs = require('fs');

var app = express();
app.use(cors());

// default serve path
app.use(serveStatic(path.join(__dirname, 'csv_files')));

// read the config json file for path settings
var configObj = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var pathsDict = configObj.paths;
var routeStrs = Object.keys(pathsDict);

for (let routeStrIter = 0; routeStrIter < routeStrs.length; routeStrIter++) {
    // make the app to use routes as per the setting
    var routeStr = routeStrs[routeStrIter];
    app.use(routeStr, serveStatic(pathsDict[routeStr]));
}

// app.use('/sudhir', serveStatic(path.join(__dirname, 'csv_files')));

app.listen(8807, () => console.log('Example app listening on port 8807!'))
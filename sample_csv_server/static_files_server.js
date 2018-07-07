/*
http://stackabuse.com/node-http-servers-for-static-file-serving/
*/

/*
var http = require('http');
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var staticBasePath = './csv_files';

var serve = serveStatic(staticBasePath, { 'index': false });

var server = http.createServer(function (req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
})

server.listen(8807);
*/

var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(path.join(__dirname, 'csv_files')));
//app.use(serveStatic(path.join(__dirname, 'public')));
app.listen(8807);
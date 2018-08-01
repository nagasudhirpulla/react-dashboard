var router = require('express').Router();
var path = require('path');
var fs = require('fs');

var defaultFilesPath = path.resolve('./dashboards');

router.post('/create', function (req, res, next) {
    //console.log((typeof req.user == 'undefined') ? "undefined" : req.user.username);
    // create the file

    var filename = req.body.filename;
    var rewrite = req.body.rewrite;
    // check if filename already exists
    var fullFilename = path.join(defaultFilesPath, filename);
    var exists = fs.existsSync(fullFilename);
    if (exists && rewrite != true) {
        // file already exists, hence send an error
        return res.json({ success: false, message: 'File already exists...' });
    }
    var file_stuff = req.body.file_stuff;
    fs.writeFile(fullFilename, file_stuff, function (err) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: err });
        }
        console.log("The file " + fullFilename + " was saved!");
        return res.json({ success: true, message: "File saved successfully!" });
    });
});

router.get('/', function (req, res, next) {
    // list all the files of the directory
    //console.log(defaultFilesPath);
    fs.readdir(defaultFilesPath, function(err, items) {
        if (err) {
            console.log(err);
            return res.json({ success: false, message: err });
        }
        //console.log(items);
        return res.json({ success: true, files: items });
    });
});

module.exports = router;
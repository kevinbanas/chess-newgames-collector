var Chess = require('./node_modules/chess.js/chess').Chess;
var fs = require('file-system');

var chess = new Chess();
var myPositions = [];
var myFiles = [];

function processFile(input) {
    var file = './fens/' + input;
    fs.readFile(file, function read(err, data) {
        if (err) {
            throw err;
        }
        var result = data.toString();
        console.log(result);
        myPositions.push(result);
    });
}

function collectFenFiles() {
    fs.readdir('./fens', function read(err, files) {
        if (err) {
            throw err;
        }
        myFiles = files;
        collectFens();
    });
}

function collectFens() {
    for (var i=0; i<myFiles.length; i++) {
        processFile(myFiles[i]);
    }
    printFenStrings();
}

function printFenStrings() {
    console.log(myPositions)
}

collectFenFiles();

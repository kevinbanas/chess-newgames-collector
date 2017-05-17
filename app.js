var Chess = require('./node_modules/chess.js/chess').Chess;
var chess = new Chess();
var fs = require('file-system');

var myPositions = [];
var myFiles = [];

function processFile() {
    console.log(myPositions);
}

function collectFiles() {
    console.log(myFiles)
}

fs.readFile('./fens/french-advance.txt', function read(err, data) {
    if (err) {
        throw err;
    }
    myPositions.push(data);
    processFile();
});

fs.readdir('./fens', function read(err, files) {
    if (err) {
        throw err;
    }
    myFiles = files;
    collectFiles();
})
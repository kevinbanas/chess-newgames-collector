var Chess = require('./node_modules/chess.js/chess').Chess;
var fs = require('file-system');
var express = require('express');
// var app = express();

var chess = new Chess();

var gStart = 0,
	gEnd = 0,
	mStart = 0,
	mEnd = 0,
	currentIndex = 0,
	counter = 1,
	matchedCounter = 0,
	whiteWins = 0,
	blackWins = 0,
	draws = 0,
	holderString = '',
	gameMoves = [],
	MatchedGames = [],
	arrayOfGamesMoves = [];

var blackWon = /0\-1/;
var whiteWon = /1\-0/;
var drawnGame = /1\/2\-1\/2/;

var fenFiles = collectFenFiles();
var pgnFiles = collectPgnFiles();
var recentGames = fs.readFileSync("./pgns/twic1175.pgn").toString();
var singleFen = fs.readFileSync("./fens/french-general.txt").toString();


function getFenStringFromFile(input) {
    var file = './fens/' + input;
    console.log(file);
    var data = fs.readFileSync(file);
    return data.toString();
}

function collectFenFiles() {
    return fs.readdirSync('./fens');
}

function collectPgnFiles() {
    return fs.readdirSync('./pgn-french-nc3');
}

function collectFens(files) {
    var myPositions = [];
    for (var i=0; i<fenFiles.length; i++) {
        var fenString = getFenStringFromFile(files[i]);
        myPositions.push(fenString);
        
    }
    return myPositions;
}

function printFenStrings(myPositions) {
    console.log(myPositions);
}

// updates holderString
function getOneGamesMovesAsString() {
	currentIndex = recentGames.indexOf('1. ', (currentIndex + 1));
	while ((recentGames[currentIndex] !== '[') && (currentIndex !== recentGames.length)) {
		holderString += recentGames[currentIndex];
		currentIndex++;
	}
	// trimGameResult();
}

// cleans up holderString by trimming game result from the end
function trimGameResult() {
	holderString = holderString.replace('1-0', '');
	holderString = holderString.replace('0-1', '');
	holderString = holderString.replace('1/2-1/2', '');
}

function getAllGamesMovesAsStrings() {
	while (currentIndex < recentGames.length) {
		getOneGamesMovesAsString();
		arrayOfGamesMoves.push(holderString);
		clearHolder();
	}
	// all game strings now exist in arrayOfGamesMoves
}

function clearHolder() {
	holderString = '';
}

// loops through each game in arrayOfGamesMoves
function testAllGames() {
	for (var i=0; i<arrayOfGamesMoves.length; i++) {
		extractGameMoves(arrayOfGamesMoves[i]);
		testAgainstFenString();
		gameMoves = [];
		chess = new Chess();
	}
}

// pushes a single game's moves to the array gameMoves
function extractGameMoves(game) {
	var myArray = game.split(' ');
	var throwAway1 = /\d+\./;
	var throwAway2 = '';

	for (var i=0; i<myArray.length; i++) {
		if (throwAway1.test(myArray[i]) || myArray[i] == '') {
			//do nothing
		} 
		else {
			gameMoves.push(myArray[i]);
		}
	}
	// the array gameMoves now has a game's moves
}

function determineWinner() {
	var result = gameMoves.slice(-1);
	if (whiteWon.test(result)) {
		whiteWins++;
	} else if (blackWon.test(result)) {
		blackWins++;
	} else {
		draws++;
	}
}

function showStats() {
	console.log("There were " + arrayOfGamesMoves.length + ' total games in this set and ' + matchedCounter + ' of them matched your desired position');
	console.log('White wins: ' + whiteWins + '/' + matchedCounter + ' = ' + (whiteWins / matchedCounter * 100).toFixed(1) + '%');
	console.log('Black wins: ' + blackWins + '/' + matchedCounter + ' = ' + (blackWins / matchedCounter * 100).toFixed(1) + '%');
	console.log('Draws: ' + draws + '/' + matchedCounter + ' = ' + (draws / matchedCounter * 100).toFixed(1) + '%');
}

function testAgainstFenString() {
	// console.log(gameMoves);
	var match = 0;
	for (var i=0; i<gameMoves.length; i++) {
		chess.move(gameMoves[i]);
		if (chess.fen().slice(-1) > singleFen.slice(-1)) {
			break;
			// if the position you're looking for has already been passed, it doesn't test the remaining moves
		}
		if (chess.fen() === singleFen) {
			match = 1;
			matchedCounter++;
			break;
			// if the position you're looking for has been found, it doesn't test the remaining moves
		}
	}

	if (match === 1) {
		var x = gameMoves.join(' ');
		MatchedGames.push(x);
		console.log('game is a match! (' + matchedCounter + ')');
		determineWinner();
	} 
	// else {
	// 	console.log('no match');
	// }
}

getAllGamesMovesAsStrings();
testAllGames();
console.log(MatchedGames);
showStats();
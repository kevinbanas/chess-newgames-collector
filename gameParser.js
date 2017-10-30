var Chess = require('./node_modules/chess.js/chess').Chess;
var fs = require('file-system');

var chess = new Chess();
var gameStats = createEmptyGameStats();
var severalPgns = loopMultipleTwicPgnFiles(1140, 1198);
var singleFen = getFenStringFromFile("e4-e6-d4-d5-nc3-nf6");
var firstMoveToAvoid = "c4";

// function collectPgnFiles() {
//     return fs.readdirSync('./pgns');
// }

function getPgnsString(pgnFile){
	return fs.readFileSync('./pgns/' + pgnFile + '.pgn').toString();
}

function loopMultipleTwicPgnFiles(startNum, endNum){
	var allGamesCombined;
	for (var i=startNum; i<=endNum; i++) {
		allGamesCombined += getPgnsString('twic' + i);
	}
	return allGamesCombined;
}

function getFenStringFromFile(input) {
    var file = './fens/' + input + '.txt';
    var data = fs.readFileSync(file).toString();
    return data;
}

function createEmptyGameStats(){
	var gameStatsObj = {
		"blackWon": 0,
		"whiteWon": 0,
		"drawnGame": 0
	}
	return gameStatsObj;
}

// returns an array containing multiple game strings
function extractGamesFromPgnString(pgnString){
	var gamesArray = [];
	var currentIndex = 0;
	var holderString;

	while (currentIndex < pgnString.length){
		if ((pgnString.indexOf("]\n\n1. "), currentIndex) !== -1){
			currentIndex = pgnString.indexOf("]\n\n1. ", currentIndex + 1) ;
			holderString = getOneGamesMovesAsString(pgnString, currentIndex + 3);
			holderString = holderString.replace("\n\n", "");
			holderString = holderString.replace("\n", " ");
			if(holderString != ""){
				gamesArray.push(holderString);
			}
		} else {
			currentIndex = pgnString.length;
		}
	}
	return gamesArray;
}

// returns a string containing one game's moves
function getOneGamesMovesAsString(pgnString, index) {
	var oneGamesMoves = "";
	if(pgnString[index] == "1"){
		while ((pgnString[index] !== "[") && (index !== pgnString.length)) {
			oneGamesMoves += pgnString[index];
			index++;
		}
	}
	return oneGamesMoves;
}

// marks one game (game requires numbers and game result) as a W/L/D
function recordGame(oneGame) {
	var result = oneGame.slice(-1);
	switch(result) {
		case "1":
			gameStats.blackWon++;
			break;
		case "0":
			gameStats.whiteWon++;
			break;
		case "2":
			gameStats.drawnGame++;
			break;
	}
	// return gameStats;
}

function recordAllGamesFromGamesArray(gamesArray){
	for (var i=0; i<gamesArray.length; i++){
		recordGame(gamesArray[i]);
	}
	return gameStats;
}

function extractGameMoves(game) {
	var oneGamesMoves = game.split(' ');
	var containsMoveNum = /\./;
	var containsGameResult = /-/;
	var gameMoves = [];

	for (var i=0; i<oneGamesMoves.length; i++) {
		if (containsMoveNum.test(oneGamesMoves[i])) {
			//don't push item to gameMoves array if it's a move number
		}
		else {
			if (oneGamesMoves[i].length <=4) {
				gameMoves.push(oneGamesMoves[i]);
			} else {
				if (containsGameResult.test(oneGamesMoves[i])) {
					//don't push item to gameMoves array if it's a game result
				} else {
					var x = oneGamesMoves[i].split("\n");
					gameMoves.push(x[0]);
					gameMoves.push(x[1]);
				}
			}
		}
	}
	return gameMoves;
}

//tests one game's moves against a given fen string
function testAgainstFenString(oneGamesMoves, fenString, fullGame) {
	var match = 0;
	chess = new Chess();
	if (oneGamesMoves[0] === firstMoveToAvoid) { // checks first move for e4 or d4 or c4, so you can quickly skip a ton of games without testing every node
		// do nothing
	} else {
		for (var i=0; i<oneGamesMoves.length; i++) {
			chess.move(oneGamesMoves[i]);
			if (chess.fen().slice(-1) > fenString.slice(-1)) {
				break;
				// if the move # of your FEN has already been exceeded without a match, it doesn't test the remaining moves
			}
			if (chess.fen() === fenString) {
				match = 1;
				break;
				// if the position you're looking for has been found, it doesn't test the remaining moves
			}
		}
	}
	if (match === 1) {
		// console.log('game is a match!');
		recordGame(fullGame);
	}
}

// updates the 
function testAllGamesAgainstFen(allGamesArray, fenString){
	var start = new Date().getTime();
	var gameToTest; // will just be the game's moves
	var matchedTotal; // total number of matched games

	for (var i=0; i<allGamesArray.length; i++) {
		if (i%10000 == 0) {
			console.log(i);
		}
		gameToTest = extractGameMoves(allGamesArray[i]); // one game's moves only
		testAgainstFenString(gameToTest, singleFen, allGamesArray[i]); // determines if there's a match
	}
	matchedTotal = gameStats.blackWon + gameStats.whiteWon + gameStats.drawnGame;

	console.log("There were " + (allGamesArray.length) + " total games in this set and " + matchedTotal + " of them matched your desired position");
	console.log("White wins: " + gameStats.whiteWon + "/" + matchedTotal + " = " + (gameStats.whiteWon / matchedTotal * 100).toFixed(1) + '%');
	console.log("Black wins: " + gameStats.blackWon + "/" + matchedTotal + " = " + (gameStats.blackWon / matchedTotal * 100).toFixed(1) + '%');
	console.log('Draws: ' + gameStats.drawnGame + '/' + matchedTotal + ' = ' + (gameStats.drawnGame / matchedTotal * 100).toFixed(1) + '%');
	console.log('White scores ' + ((gameStats.whiteWon + gameStats.drawnGame/2)/matchedTotal*100).toFixed(2) + '%')
	console.log("App took " + (new Date().getTime() - start) + "ms to execute");
}



module.exports = {
	"severalPgns": severalPgns,
	"singleFen": singleFen
}

module.exports.createEmptyGameStats = createEmptyGameStats;
module.exports.extractGamesFromPgnString = extractGamesFromPgnString;
module.exports.testAllGamesAgainstFen = testAllGamesAgainstFen;
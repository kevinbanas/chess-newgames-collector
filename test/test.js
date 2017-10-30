const assert = require('chai').assert;
const gameparser = require('../gameParser');

// Results
var gameStatsObj = gameparser.createEmptyGameStats();

describe('GameParser', function(){
	describe('createEmptyGameStats()', function(){
		it('should return an object with 3 keys that all have values of 0', function(){
			gameparser.createEmptyGameStats();
			assert.equal(gameStatsObj.blackWon, 0);
			assert.equal(gameStatsObj.whiteWon, 0);
			assert.equal(gameStatsObj.drawnGame, 0);
		});
	});
});
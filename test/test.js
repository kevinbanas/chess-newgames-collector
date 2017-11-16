const assert = require('chai').assert;
const gameparser = require('../gameParser');

var gameStatsObj = gameparser.createEmptyGameStats();
var pgnsFromOneFile = gameparser.getPgnsString("twic1198");
var singleFen = gameparser.getFenStringFromFile("d4-f5");
var gamesArray = gameparser.extractGamesFromPgnString(`[Event "Ivanchuk-Wei Yi m 2017"]
[Site "Hoogeveen NED"]
[Date "2017.10.21"]
[Round "1"]
[White "Ivanchuk,V"]
[Black "Wei Yi"]
[Result "1/2-1/2"]
[WhiteTitle "GM"]
[BlackTitle "GM"]
[WhiteElo "2732"]
[BlackElo "2740"]
[ECO "E32"]
[Opening "Nimzo-Indian"]
[Variation "classical variation"]
[WhiteFideId "14100010"]
[BlackFideId "8603405"]
[EventDate "2017.10.21"]

1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 O-O 5. a3 Bxc3+ 6. Qxc3 d5 7. Bg5 h6 8.
Bxf6 Qxf6 9. Nf3 dxc4 10. Qxc4 Nc6 11. Qc3 Re8 12. Rd1 e5 13. d5 Nb8 14. e4 c6
15. Bc4 Bg4 16. h3 Bxf3 17. Qxf3 Qxf3 18. gxf3 cxd5 19. Bxd5 Nc6 20. Bxc6 bxc6
21. Ke2 Reb8 22. Rd2 Rb3 23. Rc1 Rab8 24. Rxc6 Rxb2 25. Ra6 Rxd2+ 26. Kxd2 Rb1
27. Rxa7 Rh1 28. Ke2 Rxh3 29. Rd7 f5 30. exf5 Rh4 31. Ra7 Rf4 32. a4 Rxf5 33. a5
Kh7 34. Re7 e4 35. fxe4 Rxa5 36. Kf3 Kg6 37. Re6+ Kf7 38. Rb6 h5 39. Kg3 g5 40.
Rh6 Ra3+ 41. f3 g4 42. Rxh5 gxf3 43. Rf5+ 1/2-1/2

[Event "Ivanchuk-Wei Yi m 2017"]
[Site "Hoogeveen NED"]
[Date "2017.10.22"]
[Round "2"]
[White "Wei Yi"]
[Black "Ivanchuk,V"]
[Result "1/2-1/2"]
[WhiteTitle "GM"]
[BlackTitle "GM"]
[WhiteElo "2740"]
[BlackElo "2732"]
[ECO "B84"]
[Opening "Sicilian"]
[Variation "Scheveningen (Paulsen), classical variation"]
[WhiteFideId "8603405"]
[BlackFideId "14100010"]
[EventDate "2017.10.21"]

1. e4 c5 2. Nf3 e6 3. Nc3 a6 4. Be2 d6 5. d4 cxd4 6. Nxd4 Nf6 7. Be3 Qc7 8. Qd2
b5 9. f3 Nbd7 10. a3 h5 11. O-O Bb7 12. Rfd1 d5 13. exd5 Nxd5 14. Nxd5 Bxd5 15.
Bf4 Bd6 16. Bxd6 Qxd6 17. Nf5 Qe5 18. Bd3 g6 19. Re1 Qxb2 20. Bxb5 gxf5 21.
Bxd7+ Kxd7 22. Reb1 Qe5 23. c4 Rhb8 24. h4 Ke7 25. cxd5 Qxd5 26. Qg5+ Kf8 27.
Qh6+ Ke7 28. Qg5+ Kf8 29. Qh6+ 1/2-1/2

[Event "Ivanchuk-Wei Yi m 2017"]
[Site "Hoogeveen NED"]
[Date "2017.10.23"]
[Round "3"]
[White "Ivanchuk,V"]
[Black "Wei Yi"]
[Result "1-0"]
[WhiteTitle "GM"]
[BlackTitle "GM"]
[WhiteElo "2732"]
[BlackElo "2740"]
[ECO "D38"]
[Opening "QGD"]
[Variation "Ragozin variation"]
[WhiteFideId "14100010"]
[BlackFideId "8603405"]
[EventDate "2017.10.21"]

1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Nf3 d5 5. cxd5 exd5 6. Bg5 h6 7. Bh4 O-O 8. e3
Bf5 9. Rc1 Nbd7 10. Qb3 Bxc3+ 11. Rxc3 c6 12. Nd2 Qa5 13. f3 Rfe8 14. Kf2 Rac8
15. Be2 c5 16. dxc5 Rxc5 17. Rhc1 g5 18. Bg3 Rxe3 19. Kxe3 d4+ 20. Kxd4 Re5 21.
Bd3 Be6 22. Qxb7 Kg7 23. Ne4 Nd5 24. Bxe5+ Nxe5 25. Rc5 1-0

[Event "Van Foreest-Adhiban m"]
[Site "Hoogeveen NED"]
[Date "2017.10.21"]
[Round "1"]
[White "Adhiban,Baskaran"]
[Black "Van Foreest,Jorden"]
[Result "1/2-1/2"]
[WhiteTitle "GM"]
[BlackTitle "GM"]
[WhiteElo "2671"]
[BlackElo "2609"]
[ECO "D26"]
[Opening "QGA"]
[Variation "classical variation, 6.O-O"]
[WhiteFideId "5018471"]
[BlackFideId "1039784"]
[EventDate "2017.10.21"]

1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O Nc6 7. Nc3 a6 8. dxc5
Qxd1 9. Rxd1 Bxc5 10. b3 b5 11. Nxb5 axb5 12. Bxb5 Bb7 13. Bb2 O-O 14. Rdc1 Nd7
15. b4 Nxb4 16. Bxd7 Nd3 17. Rc3 Nxb2 18. Rxc5 Nd3 19. Rc3 Bxf3 20. Rxd3 Be4 21.
Rd4 Bd5 22. a4 Rfb8 23. Rc1 Bb3 24. f4 h6 25. Bb5 Ra5 26. Rc3 Ba2 27. Rc7 e5 28.
fxe5 Raxb5 29. axb5 Rxb5 30. Rd8+ Kh7 31. Re7 Be6 32. Rf8 Kg6 33. Kf2 Rb4 34. h3
h5 35. Kg3 Ra4 36. Rd8 Re4 37. Kf3 Rxe5 38. e4 Bg4+ 39. hxg4 hxg4+ 40. Kxg4 Rxe7 1/2-1/2

[Event "Van Foreest-Adhiban m"]
[Site "Hoogeveen NED"]
[Date "2017.10.22"]
[Round "2"]
[White "Van Foreest,Jorden"]
[Black "Adhiban,Baskaran"]
[Result "0-1"]
[WhiteTitle "GM"]
[BlackTitle "GM"]
[WhiteElo "2609"]
[BlackElo "2671"]
[ECO "C50"]
[Opening "Giuoco Pianissimo"]
[WhiteFideId "1039784"]
[BlackFideId "5018471"]
[EventDate "2017.10.21"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. c3 d6 6. O-O a6 7. a4 Ba7 8. Re1 Ng4
9. Re2 Qf6 10. Na3 O-O 11. Nc2 Be6 12. h3 Nh6 13. Bg5 Qg6 14. Qd2 Bxc4 15. dxc4
Na5 16. Nh4 Qh5 17. Kh2 Nxc4 18. g4 Qxh4 19. Bxh4 Nxd2 20. Rxd2 f6 21. a5 Nf7
22. f3 Nd8 23. Nb4 Ne6 24. Nd5 Kf7 25. Bf2 Bxf2 26. Rxf2 Rad8 27. Rd1 h5 28. Kg3
Rh8 29. h4 g5 30. hxg5 Nxg5 31. Rh1 hxg4 32. Rxh8 Rxh8 33. Kxg4 Rg8 34. Kh4 Ne6
35. Rd2 Rg1 36. Rd3 Ra1 37. b4 Rg1 38. Kh3 Rg8 39. Kh2 Rd8 40. Rd2 c6 41. Ne3
Nf4 42. Nf5 d5 43. Kg3 Rg8+ 44. Kf2 Ke6 45. Ke3 Ng2+ 46. Kf2 Nf4 47. Ke3 Rh8 48.
c4 Rh1 49. cxd5+ cxd5 50. Ng7+ Kf7 51. Nf5 Ke6 52. Ng7+ Kd7 53. exd5 Re1+ 54.
Kf2 Rb1 55. Nf5 Rxb4 56. Ne3 Rd4 57. Rxd4 exd4 58. Nf5 d3 59. Ke3 Nxd5+ 60. Kxd3
Nb4+ 61. Ke4 Nc6 62. Ne3 Nxa5 63. Kf5 b5 64. Kxf6 b4 65. f4 b3 66. Nd1 Nc4 67.
f5 b2 68. Nc3 a5 69. Kg7 a4 70. f6 Ne5 71. Nb1 Ke6 72. Na3 Kd5 0-1

`)

var gameZeroMoves = gameparser.extractGameMoves(gamesArray[0]); // array of gamesArray[0] moves


// tests
describe('GameParser', function(){

	describe('createEmptyGameStats()', function(){
		it('should return an object with 3 keys that all have values of 0', function(){
			assert.equal(gameStatsObj.blackWon, 0);
			assert.equal(gameStatsObj.whiteWon, 0);
			assert.equal(gameStatsObj.drawnGame, 0);
		});
	});

	// describe('allPgnsOneString # of games (TWIC1998)', function(){
	// 	it('should equal 2791', function(){
	// 		assert.equal((allPgnsOneString.split("Result").length - 1), 2791);
	// 	});
	// });

	describe('getPgnsString() from file: TWIC1998', function(){
		it('should equal 2791', function(){
			assert.equal((pgnsFromOneFile.split("Result").length - 1), 2791);
		});
	});

	describe('getFenStringFromFile("d4-f5")', function(){
		it('should contain 5p2/3P4', function(){
			assert.include(singleFen, "5p2/3P4");
		});
	});

	describe('extractGamesFromPgnString(pgnString)', function(){
		it('create an array of 5 games, including move numbers and game results', function(){
			assert.typeOf(gamesArray, 'array');
			assert.equal(gamesArray.length, 5);
		});
	});

	describe('recordGame(oneGame, gameStatsObj)', function(){
		it('should update gameStatsObj with the given game', function(){
			gameparser.recordGame(gamesArray[0], gameStatsObj);
			assert.typeOf(gameStatsObj, 'object');
			assert.equal(gameStatsObj.drawnGame, 1);
		});
	});

	describe('extractGameMoves(game)', function(){
		it('should return an array of one games moves', function(){
			assert.typeOf(gameZeroMoves, 'array');
			assert.isAbove(gameZeroMoves.length, 90);
		});
	});
});
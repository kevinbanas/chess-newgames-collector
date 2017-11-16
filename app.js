const gameparser = require('./gameParser');
const request = require('./node_modules/request');
const cheerio = require('./node_modules/cheerio');
const async = require('./node_modules/async');
const unzip = require('./node_modules/unzip');
const fs = require('file-system');


// ****** the code below gets stats for a given FEN string ******

// array of games, where each index is a string containing one game (including move numbers and game result)
var severalGames = gameparser.extractGamesFromPgnString(gameparser.severalPgns);

// prints game outcome stats for all games that match with a given fen string
var allGamesStats = gameparser.testAllGamesAgainstFen(severalGames, gameparser.singleFen, gameparser.gameStats);






// ****** the code below searches the TWIC site for all png zip files on its page, sees which ones aren't already in the local directory, then downloads just those files you need. commented out for now ******

// // downloads one TWIC zip file
// function downloadZip(filename, callback){
// 	if (!fs.existsSync('./pngzipfiles/' + filename + '.zip')) {

// 		var abc = request({url: 'http://www.theweekinchess.com/zips/' + filename + '.zip', encoding: null});
// 		abc
// 			.pipe(fs.createWriteStream('./pngzipfiles/' + filename + '.zip'))
// 			.on('close', function (){
// 				callback();
// 		});
// 	} else {
// 		// console.log('already exists');
// 		callback();
// 	}
// }

// function createsTasksArray(callback){
// 	request('http://theweekinchess.com/twic', function(error, response, html){
// 		var results = [];
// 		if (!error && response.statusCode == 200){
// 			var $ = cheerio.load(html);
// 			$('.results-table td a:contains("PGN")').each(function(i, elem){

// 				var xyz = ($(this).attr('href'));
// 				xyz = xyz.slice(35);
// 				xyz = xyz.substring(0, xyz.length - 4);
// 				results.push(function(callback){
// 					var zip = xyz;
// 					downloadZip(zip, function(){
// 						// console.log(zip);
// 						callback();
// 					});
// 				});
// 			});
// 		}
// 		callback(results);
// 	});
// }

// function downloadEverything(funcsToCall){
// 	async.series(funcsToCall, function(err, results){
// 		console.log('done downloading everything');
// 	});
// }

// createsTasksArray(function(results){
// 	downloadEverything(results);
// });
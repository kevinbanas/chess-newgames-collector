const gameparser = require('./gameParser');

// array of games, where each index is a string containing one game (including move numbers and game result)
var severalGames = gameparser.extractGamesFromPgnString(gameparser.severalPgns);

// prints game outcome stats for all games that match with a given fen string
var allGamesStats = gameparser.testAllGamesAgainstFen(severalGames, gameparser.singleFen, gameparser.gameStats);
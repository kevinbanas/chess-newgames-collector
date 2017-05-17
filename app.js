var Chess = require('./node_modules/chess.js/chess').Chess;
var chess = new Chess();

chess.move('e4');
chess.move('e6');
chess.move('d4');
chess.move('d5');
var h = chess.fen();

console.log(h);
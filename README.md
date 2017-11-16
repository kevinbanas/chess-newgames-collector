# chess-newgames-collector
This app analyzes thousands of new chess games played from the top players around the world. It returns white's "score" for a given line within this collection, defined as (white's win% + (draw% / 2)), which is how many points out of 100 games white might expect on average by playing a given line. 

The app requires that you pass it a line you wish to test for matches within the collection of total games. Set this as the result of the 'singleFen' variable at the beginning of the app. Also note that the FEN string will need to be saved in a .txt file with the same name of the line you wish to test (hyphen-delimited move list).

A sample output might be:

(d4-d5-c4-nc6-nc3)

There were 173626 total games in this set and 66 of them matched your desired position
White wins: 28/66 = 42.4%
Black wins: 21/66 = 31.8%
Draws: 17/66 = 25.8%
White scores 55.30%
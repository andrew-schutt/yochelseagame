var express = require('express');
var request = require('request');
var app = express();
var cfcepl = require('./cfcepl.json');

function findNextGame() {
	for (i in cfcepl.games) {
		var curGame = cfcepl.games[i];
		var gameDate = new Date(curGame.year, curGame.month, curGame.day, curGame.hour, curGame.minute);
		if (gameDate > new Date()) {
			var nextGame = cfcepl.games[i];
			return nextGame;
		};
	};
};

function compareDateToMinute(older, newer) {
	if (Math.abs(older - newer) <= 60000) {
		return true;
	}
	return false;
};

function sendAllYo() {
	request.post('http://api.justyo.co/yoall/',
		{
	        form: {
	          api_token: '30b8c2bc-354e-4647-a1f9-2ec24ffd7a7b'
	        }
		});
}

setInterval(function() {
	var curDate = new Date();
	var nextGame = findNextGame();
	var nextDate = new Date(nextGame.year, nextGame.month, nextGame.day, nextGame.hour, nextGame.minute);
	if (compareDateToMinute(nextDate, curDate)) {
		console.log("chelsea game!");
		sendAllYo()
	} else {
		console.log(Math.abs(nextDate - curDate) + " milliseconds till next game... ")
	};
}, 30000);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

//send all epl chelsea games in JSON
app.get('/', function(request, response) { response.send(cfcepl.games) });
//send upcoming(next) cheslsea game in JSON
app.get('/nextgame', function(request, response) { response.send(nextGame) });

app.listen(app.get('port'), function() { console.log("Node app is running at localhost:" + app.get('port')) });
var express = require('express');
var app = express();
var cfcepl = require('./cfcepl.json');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.send(cfcepl.games);
});

app.get('/nextgame', function(request, response) {
	var gameDate;
	for (game in cfcepl.games) {
		var curGame = cfcepl.games[game];
		gameDate = new Date(curGame.year, curGame.month, curGame.day, curGame.hour, curGame.minute);
		if (gameDate > new Date()) {
			response.send(curGame);
			return;
		}
	};
response.send([]);
});

app.listen(app.get('port'), function() {	
  console.log("Node app is running at localhost:" + app.get('port'))
});

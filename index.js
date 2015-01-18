var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var http = require('http');
var app = express();

function dateDifference(older, newer) {
	return Math.abs(older - newer)
}

function checkWithinMinuteOfGame(older, newer) {
	console.log(dateDifference(older, newer));
    if ( dateDifference(older, newer) <= 60000 && dateDifference(older, newer) <= 15000 ) {
        return true;
    }
    return false;
};

function sendChelseaGameYoAll() {
    request.post('http://api.justyo.co/yoall/', {
        form: {
            api_token: '30b8c2bc-354e-4647-a1f9-2ec24ffd7a7b'
        }
    });
}

function findNextGame(url, callback) {
	var gameDateArray;
	request(url, function (error, response, html) {
	    if (!error && response.statusCode == 200) {
	        var $ = cheerio.load(html);
            gameDateArray = $('div.custom-column.col-3.match').children('span.time').text().split(/[\s,]+/);
			callback(gameDateArray, detectNextGame)
	    }
	});
}

function formatGameDate(gameDateArray, callback) {
	var gameDate = gameDateArray;
	gameDate = new Date(gameDateArray);
	callback(gameDate, findNextGame);
};

function detectNextGame(gameDate, callback) {
	setInterval(function () {
	    var curDate = new Date();
		console.log(gameDate);
	    if (checkWithinMinuteOfGame(gameDate, curDate)) {
	        console.log("chelsea game!");
	        sendChelseaGameYoAll();
			setTimeout(function() {
				console.log('waiting for site to update')
			}, 600000)
			callback('http://www.chelseafc.com/matches/fixtures---results.html', formatGameDate)
	    } else { 
		    console.log('no chelsea game'); }
	}, 30000);
}

function keep_awake() {setInterval(function() {
      http.get("http://<your app name>.herokuapp.com");
  }, 300000); 
}

findNextGame('http://www.chelseafc.com/matches/fixtures---results.html', formatGameDate);

app.set('port', (process.env.PORT || 5050));
app.use(express.static(__dirname + '/public'));
//send all epl chelsea games in JSON
app.get('/', function (request, response) { response.send(cfcepl.games); });
//send upcoming(next) cheslsea game in JSON
app.get('/nextgame', function (request, response) { response.send(nextGame); });
app.listen(app.get('port'), function () { console.log("Running at port: " + app.get('port')); });
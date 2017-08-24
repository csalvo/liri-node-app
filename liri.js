var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');

var twitCient = new twitter(keys.twitterKeys);
var spotClient = new spotify(keys.spotifyKeys);

switch (process.argv[2]) {
    case "my-tweets":
        myTweets();
    case "spotify-this-song":
    	spotifyStuff();
}


//twitter
function myTweets() {
    var screenName = "monkeysareneat";

    console.log("here are tweets from " + screenName);
    console.log("-------------------------------");

    var params = { screen_name: screenName };

    twitClient.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + " at " + tweets[i].created_at);
                console.log("-------------------------------");
            }

        }
    });
}

//spotify
function spotifyStuff() {
	spotClient.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0]); 
});


}
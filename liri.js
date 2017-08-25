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

    var userQuery = process.argv[3];
    if (userQuery) {
        for (var i = 4; i < process.argv.length; i++) {
            userQuery = userQuery + " " + process.argv[i];
        }
    } else {
        userQuery = "The Sign";
    }

    console.log("Here is info for the song: " + userQuery);
    console.log("--------------------------------------------");

    spotClient.search({ type: 'track', query: userQuery }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //go back and make this case insensitive
        for (var i = 0; i < data.tracks.items.length; i++) {
            if (userQuery === data.tracks.items[i].name) {
                console.log("Artist: " + data.tracks.items[i].artists[0].name);
                console.log("Song title: " + data.tracks.items[i].name);
                console.log("Album: " + data.tracks.items[i].album.name);
                if (data.tracks.items[i].preview_url != null) {
                    console.log("Preview: " + data.tracks.items[i].preview_url);
                } else {
                    console.log("No preview available.")
                }
                console.log("-------------------------------");

            }

        }
    });
}
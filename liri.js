// read and set any environment variables with the dotenv package...
require("dotenv").config();

// assigning variable for corresponding npm packages
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var fs = require("fs");
// file with links to external keys, user populates .env file with twitter and spotify keys
var keys = require("./keys.js");

console.log("\n");
createLog();
showOptions();

function showOptions() {
	inquirer.prompt([
		{
			type: "list",
			message: "Which would you like to do?",
			choices: ["Movie Info", "Twitter", "Spotify A Song", "IDK, whatever"],
			name: "userChoice"
		}
		]).then(function(result) {
			// switch statement to run the function corresponding to the operation the user input (userOper)
			switch (result.userChoice) {
				case "Movie Info":
					runMovieThis();
					break;
				case "Twitter":
					runMyTweets();
					break;
				case "Spotify A Song":
				 	runSpotifyThisSong();
				 	break;
				case "IDK, whatever":
					runDoWhatItSays();
					break;
			};
		});
};


// =============================================
//       MOVIE-THIS
// =============================================
function runMovieThis(randomInput) {

	var movieName = ""

	if (!randomInput) {
		inquirer.prompt([
		{
			type: "input",
			message: "What movie would you like info about?",
			name: "userInput"
		}
		]).then(function(result) {
			// if statement checking to see if the user input a movie, if they did and there are spaces....
			if (result.userInput && result.userInput.indexOf(" ") > 0) {
				movieName = result.userInput.replace(" ", "+");
			}
			// if no spaces just assign userInput to movieName
			else if (result.userInput) {
				movieName = result.userInput
			}
			// if user did not put a movie in, default to Mr Nobody
			else{
				movieName = "mr+nobody";
			}
			// ... run a request to the OMDB API with the movie specified
			showMovieInfo(movieName);
		});
	}
	else{
		// if statement checking to see if the user input a movie, if they did and there are spaces....
		if (randomInput.indexOf(" ") > 0) {
			movieName = randomInput.replace(" ", "+");
		}
		// if no spaces just assign userInput to movieName
		else if (randomInput) {
			movieName = randomInput
		}
		// ... run a request to the OMDB API with the movie specified
		showMovieInfo(movieName);
	}
} // closing runMovieThis

// =============================================
//       FUNCTION: MY-TWEETS
// =============================================
function runMyTweets() {

	var client = new Twitter(keys.twitter);
	var params = {
        screen_name: 'inagarten'
    };

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error) {
			console.log('Error occurred: ' + error);
		}
		else{
			for (var i = 0; i < tweets.length; i++) {
				var content = "\nCreated: " + tweets[i].created_at +
							  "\nTweet: " + tweets[i].text + "\n";
				console.log(content);
				printToLog("\n********************** \n   Barefoot Tweet:\n**********************\n" + content);
			}
		}
		runPlayAgain();
	});
};


// =============================================
//       FUNCTION: SPOTIFY-THIS-SONG
// =============================================

function runSpotifyThisSong(randomInput) {
	if (!randomInput) {
		inquirer.prompt([
		{
			type: "input",
			message: "What song would you like info about?",
			name: "userInput"
		}
		]).then(function(result) {
			if (result.userInput) {
				showSongInfo(result.userInput);
			}
			else{
				showSongInfo("white houses");
			}
		});
	}
	else {
		showSongInfo(randomInput);
	}
};


// =============================================
//       FUNCTION: DO-WHAT-IT-SAYS
// =============================================
function runDoWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }

		var dataArr = data.split(",");
		var randomOper = dataArr[0];
		var randomInput = dataArr[1];

		switch (randomOper) {
			case "movie-this":
				runMovieThis(randomInput);
				break;
			case "my-tweets":
				runMyTweets();
				break;
			case "spotify-this-song":
				runSpotifyThisSong(randomInput);
				break;
		}
	})
};


function runPlayAgain() {
	inquirer.prompt([
	{
		type: "confirm",
		message: "Would you like to return to the menu?",
		name: "userInput"
	}
	]).then(function(result) {
		if(!result.userInput){
			console.log("\nAlright, Bye!\n");
		}
		else{
			showOptions();
		}
	});

}


function showMovieInfo(input) {
	request("http://www.omdbapi.com/?t=" + input + "&apikey=trilogy", function(error, response, body) {
		if (!error && response.statusCode === 200) {
		  	var content = "\n* Title: " +  JSON.parse(body).Title + 
		  				 "\n* Year: " + JSON.parse(body).Year +
		  				 "\n* IMDB Rating: " + JSON.parse(body).imdbRating +
		  				 "\n* Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
		  				 "\n* Country Produced: " + JSON.parse(body).Country +
		   				 "\n* Language: " + JSON.parse(body).Language +
		  				 "\n* Plot: " + JSON.parse(body).Plot +
		  				 "\n* Actors: " + JSON.parse(body).Actors + "\n";
		  	console.log(content);
		  	printToLog("\n********************** \n        Movie:\n**********************\n" + content);
		  	runPlayAgain();
	  	}
	});
};


function showSongInfo(input) {
	var spotify = new Spotify(keys.spotify);
	spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
		if (err) {
		 	return console.log('Error occurred: ' + err);
		}
	var content = "\n* Artist: " + data.tracks.items[0].artists[0].name +
					"\n* Song Title: " + data.tracks.items[0].name +
					"\n* Album Title: " + data.tracks.items[0].album.name +
					"\n* Preview Link: " + data.tracks.items[0].external_urls.spotify + "\n";
	console.log(content);
	printToLog("\n********************** \n        Song:\n**********************\n" + content)
	runPlayAgain();
	});
};


function createLog() {
	fs.writeFile("log.txt", "Liri Log\n", function(err) {
  		if (err) {
    		return console.log(err);
 		 }
	});
};


function printToLog(content) {
	fs.appendFile("log.txt", content, function(err) {
	  if (err) {
	    console.log(err);
	  }
	});
};














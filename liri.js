// read and set any environment variables with the dotenv package...
require("dotenv").config();

// assigning variable for request npm package
var request = require("request");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var inquirer = require("inquirer");

// fs is a core Node package for reading and writing files
var fs = require("fs");

var keys = require("./keys.js");



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
console.log("\n");
showOptions();

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
			request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function(error, response, body) {
		 		 // If the request is successful (i.e. if the response status code is 200)
		 		 if (!error && response.statusCode === 200) {
			 		// then print the following information...
			    	console.log	("\n* Title:", JSON.parse(body).Title,
			    				 "\n* Year:", JSON.parse(body).Year,
			    				 "\n* IMDB Rating:", JSON.parse(body).imdbRating,
			    				 "\n* Rotton Tomatoes Rating:", JSON.parse(body).Ratings[1].Value,
			    				 "\n* Country Produced:", JSON.parse(body).Country,
			     				 "\n* Language:", JSON.parse(body).Language,
			    				 "\n* Plot:", JSON.parse(body).Plot,
			    				 "\n* Actors:", JSON.parse(body).Actors, "\n")
			    	runPlayAgain();
		  		}
			});
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
		request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function(error, response, body) {
	 		 // If the request is successful (i.e. if the response status code is 200)
	 		 if (!error && response.statusCode === 200) {
		 		// then print the following information...
		    	console.log	("\n* Title:", JSON.parse(body).Title,
		    				 "\n* Year:", JSON.parse(body).Year,
		    				 "\n* IMDB Rating:", JSON.parse(body).imdbRating,
		    				 "\n* Rotton Tomatoes Rating:", JSON.parse(body).Ratings[1].Value,
		    				 "\n* Country Produced:", JSON.parse(body).Country,
		     				 "\n* Language:", JSON.parse(body).Language,
		    				 "\n* Plot:", JSON.parse(body).Plot,
		    				 "\n* Actors:", JSON.parse(body).Actors, "\n")
		    	runPlayAgain();
	  		}
		});
	}
} // closing runMovieThis




// =============================================
//       MY-TWEETS
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
				console.log("\nCreated:",tweets[i].created_at,
							"\nTweet:", tweets[i].text,"\n")
			}
		}
		runPlayAgain();
	});
};


// =============================================
//       SPOTIFY-THIS-SONG
// =============================================

function runSpotifyThisSong(randomInput) {
	
	var spotify = new Spotify(keys.spotify);

	if (!randomInput) {
		inquirer.prompt([
		{
			type: "input",
			message: "What song would you like info about?",
			name: "userInput"
		}
		]).then(function(result) {


			if (result.userInput) {
				spotify.search({ type: 'track', query: result.userInput, limit: 1 }, function(err, data) {
		  			if (err) {
		    			return console.log('Error occurred: ' + err);
		  			}
		  			console.log("\n* Artist:", data.tracks.items[0].artists[0].name,
		  						"\n* Song Title:", data.tracks.items[0].name,
		  						"\n* Album Title:", data.tracks.items[0].album.name,
		  						"\n* Preview Link:", data.tracks.items[0].external_urls.spotify,"\n");
				runPlayAgain();
				});
			}
			else{
				spotify.search({ type: 'track', query: 'white houses',  limit: 1 }, function(err, data) {
		  			if (err) {
		    			return console.log('Error occurred: ' + err);
		  			}
		  			console.log("\n* Artist:", data.tracks.items[0].artists[0].name,
		  						"\n* Song Title:", data.tracks.items[0].name,
		  						"\n* Album Title:", data.tracks.items[0].album.name,
		  						"\n* Preview Link:", data.tracks.items[0].external_urls.spotify,"\n");
				runPlayAgain();
				});
			}

		});
	}
	else {

			spotify.search({ type: 'track', query: randomInput, limit: 1 }, function(err, data) {
	  			if (err) {
	    			return console.log('Error occurred: ' + err);
	  			}
	  			console.log("\n* Artist:", data.tracks.items[0].artists[0].name,
	  						"\n* Song Title:", data.tracks.items[0].name,
	  						"\n* Album Title:", data.tracks.items[0].album.name,
	  						"\n* Preview Link:", data.tracks.items[0].external_urls.spotify,"\n");
	  		runPlayAgain();
			});
	}
};



// =============================================
//       DO-WHAT-IT-SAYS
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















// read and set any environment variables with the dotenv package...
require("dotenv").config();

// assigning variable for request npm package
var request = require("request");

var twitter = require('twitter');

// fs is a core Node package for reading and writing files
var fs = require("fs");

var keys = require("./keys.js");

  // var spotify = new Spotify(keys.spotify);
  // var client = new Twitter(keys.twitter);

// variable storing the user operation
var nodeArgs = process.argv
var userOper = process.argv[2]
var userInput = process.argv[3]




// switch statement to run the function corresponding to the operation the user input (userOper)
switch (userOper) {
	case "movie-this":
		runMovieThis(userInput);
		break;

	// case "my-tweets":
	// 	runMyTweets();
	// 	break;

	// case "spotify-this-song":
	// 	runSpotifyThisSong();
	// 	break;

	case "do-what-it-says":
		runDoWhatItSays();
		break
}



// =============================================
//       MOVIE-THIS
// =============================================


function runMovieThis(userInput) {


	var movieName = ""

	// if statement checking to see if the user input a movie, if they did....
	if (userInput){
		for (var i = 3; i < nodeArgs.length; i++) {
	  		if (i > 3 && i < nodeArgs.length) {
	    		movieName = movieName + "+" + nodeArgs[i];
	  		}
	  		else {
	    		movieName += nodeArgs[i];
	 		 }
		};
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
  		}
	});
} // closing runMovieThis


// =============================================
//       MY-TWEETS
// =============================================

// function runMyTweets() {

// var client = new twitter(keys.twitter);

// };


// =============================================
//       SPOTIFY-THIS-SONG
// =============================================

// function runSpotifyThisSong() {


// };



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

		// case "my-tweets":
		// 	runMyTweets();
		// 	break;

		// case "spotify-this-song":
		// 	runSpotifyThisSong();
		// 	break;
		}

});
};





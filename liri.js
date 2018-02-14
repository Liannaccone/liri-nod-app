// read and set any environment variables with the dotenv package...
require("dotenv").config();

// assigning variable for request npm package
var request = require("request");

var keys = require("./keys.js");

  // var spotify = new Spotify(keys.spotify);
  // var client = new Twitter(keys.twitter);

// variable storing the user operation
var nodeArg = process.argv
var userOper = process.argv[2]

// if the user input movie-this as an operator then...
if(userOper === "movie-this") {

	// assign the movie name to a variable, need to make this work for names with spaces
	var movieName = process.argv[3];

	// ... run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function(error, response, body) {

 		 // If the request is successful (i.e. if the response status code is 200)
 		 if (!error && response.statusCode === 200) {

    	console.log("* Title: " + JSON.parse(body).Title);
    	console.log("* Year: " + JSON.parse(body).Year);
    	console.log("* IMDB Rating: " + JSON.parse(body).imdbRating);
    	console.log("* Rotton Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    	console.log("* Country Produced: " + JSON.parse(body).Country);
     	console.log("* Language: " + JSON.parse(body).Language);
    	console.log("* Plot: " + JSON.parse(body).Plot);
    	console.log("* Actors: " + JSON.parse(body).Actors);
  }
});


}
# liri-node-app

Language Interpretation and Recognition Interface (LIRI) is a command line node application that takes in parameters and returns back data. This version utilizes the node inquirer package to facilitate the user's request for movie information, song information, or tweets from the Barefoot Contessa.

## Setup and Useage
* Clone the repository.
* Install Javascript packages: 
  In order for LIRI to run properly, please obtain Twitter and Spotify API keys and add them to a .env file saved in the same   directory. 

  Next, navigate to the file in your terminal and confirm whether or not the package.json file is in the folder with the         required dependencies. If the package.json file is there, run:

  ```
  npm install
  ```

  Otherwise, install each package as follows:

  ```
  npm install fs twitter dotenv node-spotify-api inquirer
  ```
  
  You will then be able to run the application after entering ```node liri.js``` into the commant line. The inquirer prompts      will then prompt you for input to generate movie information, song information, or tweets from the Barefoot Contessa.
  
  
  
  
  ## Technology Used
  - Javascript
  - Node.js
  - Node Packages:
    - Inquirer
    - Request
    - Open Movie Database (OMDB)
    - Twitter
    - Spotify


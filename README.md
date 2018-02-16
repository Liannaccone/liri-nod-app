# liri-node-app

Language Interpretation and Recognition Interface (LIRI) is a command line node application that takes in parameters and returns back data. This version utilizes the node inquirer package to facilitate the user's request for movie information, song information, or tweets from the Barefoot Contessa.

## Setup and installation

You will need to obtain Twitter and Spotify API keys and add them to a .env file saved in the same directory. 

Next, navigate to the file in your terminal and if the package.json file is in the folder with the required dependencies, simply run:

```
npm install
```

otherwise, install each package individually:

```
npm install fs twitter dotenv node-spotify-api inquirer
```

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
//type 'node server.js' in cmd terminal to run local server 
app.listen(port, () => console.log(`Running on port: ${port}`));

//handles post request
const postWeather = (req, res) => {
    
    newData = req.body;
    projectData = newData;

    console.log(projectData);   

    res.send('Succesful post!');
};

//returns posted data back to user
const getWeather = (req, res) => {
    res.send(projectData);
};
//callback function tells the server what to do when the requested 
//endpoint matches the endpoint stated
app.post('/add', postWeather);

app.get('/all', getWeather);



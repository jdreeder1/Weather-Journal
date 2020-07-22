// Setup empty JS object to act as endpoint for all routes
//cd xampp/htdocs/Udacity/weather-journal-app
//node server.js

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

const server = app.listen(port, () => console.log(`Running on port: ${port}`));

const postWeather = (req, res) => {
    
    newData = req.body;
    projectData = newData;

    console.log(projectData);   
/* 
    projectData['temperature'] = newData.main['temp'];
    projectData['today'] = newData.today;
    projectData['feelings'] = newData.feelings;
*/
    res.send('Succesful post!');
};

const getWeather = (req, res) => {
    res.send(projectData);
};
//callback function tells the server what to do when the requested 
//endpoint matches the endpoint stated
app.post('/add', postWeather);

app.get('/all', getWeather);



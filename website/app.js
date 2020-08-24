/* Global Variables */
const date = document.getElementById('date');
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=089f57c1eb2ff55b6b730d42a4356f24';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

//async keyword gives access to try, await and catch
const postData = async (url ='', data = {}) => {
    console.log(url, data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.text(); //needs to wait for text b/c body stringified
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('error: ', error);
    }
};
//call to weather api
const getZip = async (baseUrl, zp, key) => {
    //wait until data rcvd from api before proceeding
    const res = await fetch (`https://${baseUrl}${zp}&units=imperial${key}`) 
    try {
        //converts data to json
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error: ', error);
    }
};
//updates DOM with info posted to local server
const updateUI = async (url) => {
        const request = await fetch(url);
        try {
            const allData = await request.json();

            console.log(allData);   
            date.innerHTML = allData.today;
            temp.innerHTML = allData.temperature;
            content.innerHTML = allData.feelings;
                
        }
        catch (error) {
            console.log('error: ', error);
        }
    
};
//asynchronously pulls data from weather api, posts that data to the local server, retrieves it and updates the DOM
const performAction = (e) => {
    getZip(baseURL, zip.value, apiKey)
    //initially tried chaining .then statements, but updateUI returned projectData before postData posted.
    //changed function to async and now updateUI waits until after postData successfully posts
        .then(async (data) => {  
            let newTemp = data.main.temp;
            await postData('/add', {temperature: newTemp, today: newDate, feelings: feelings.value});

            try {
                updateUI('/all')
            }
            catch(error) {
                console.log('error: ', error);
            }
        })

};


generate.addEventListener('click', performAction);
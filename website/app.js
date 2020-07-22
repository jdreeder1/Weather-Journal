/* Global Variables */
const date = document.getElementById('date');
const generate = document.getElementById('generate');
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

const baseURL = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=089f57c1eb2ff55b6b730d42a4356f24';

//const baseURL = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

//date.innerHTML = newDate;

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
        //temperature = data.main.temp;
        return data;
    }
    catch (error) {
        console.log('error: ', error);
    }
};
/*
const postGet = () = {
    postData
};
*/
//found that fetch ran synchronously if function pre-assigned url instead of receiving as an argument
const updateUI = async (url) => {
    //console.log(url);
    const request = await fetch(url);
    
    try {
        //const allData = await request.text();
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

const performAction = (e) => {
    //const newZip = zip.value; 
    getZip(baseURL, zip.value, apiKey)

        .then((data) => {
            let newTemp = data.main.temp;
            //console.log(newTemp);
            //POSTMAN ISN'T READING ['temp'] - getting 500 error
            postData('/add', {temperature: newTemp, today: newDate, feelings: feelings.value});
        })
        .then(            
            updateUI('/all')          
        )
};


generate.addEventListener('click', performAction);
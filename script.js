var APIkey = "8aedb52cbdaa6a88589ed59b02b9ef8d";

let bodyImage = document.querySelector('#body');

//user input
var searched = document.querySelector('#searchbar');

//search button
var search = document.querySelector('#searchbtn');

//list of previous searches
var cityList = document.querySelector('#citylist');

//variable for forecast section
var fiveDay = document.querySelector('#fiveday');

//space for full date in main display
var dateDisplay = document.querySelector('#date');

//display area for current weather
var mainDisplay = document.querySelector('#maindisplay');
var displayLabel = document.querySelector('#displaylabel');
var displayTemp = document.querySelector('#temp');
var displayWind = document.querySelector('#wind');
var displayHum = document.querySelector('#humidity');
var displayIcon = document.querySelector('#icon');
let mainWeather = document.querySelector('#mainweather');

//cards for each day of the forecast
var forecast1 = document.querySelector('#one');
var forecast2 = document.querySelector('#two');
var forecast3 = document.querySelector('#three');
var forecast4 = document.querySelector('#four');
var forecast5 = document.querySelector('#five');

let forecasts = [forecast1, forecast2, forecast3, forecast4, forecast5];

let day1Title = document.querySelector('#dayonetitle');
let day2Title = document.querySelector('#daytwotitle');
let day3Title = document.querySelector('#daythreetitle');
let day4Title = document.querySelector('#dayfourtitle');
let day5Title = document.querySelector('#dayfivetitle');

let dayTitles = [day1Title, day2Title, day3Title, day4Title, day5Title];

let day1Icon = document.querySelector('#day1icon');
let day2Icon = document.querySelector('#day2icon');
let day3Icon = document.querySelector('#day3icon');
let day4Icon = document.querySelector('#day4icon');
let day5Icon = document.querySelector('#day5icon');

let dayIcons = [day1Icon, day2Icon, day3Icon, day4Icon, day5Icon];

let sun = '☼';
let cloud = '☁';
let rain = '🌧';
let partlyCloudy = '🌤';
let mistHaze = '🌫';
let snow = '☃';
//TO ADD: Drizzle

function clearInput() {
    searched.value = '';
}

clearInput();
localStorage.clear();

//dayjs date display variables
var date = dayjs().format('dddd, MMMM D, h:mm A');
var foredate1 = dayjs().add(1, 'day').format('ddd, MMM D');
var foredate2 = dayjs().add(2, 'day').format('ddd, MMM D');
var foredate3 = dayjs().add(3, 'day').format('ddd, MMM D');
var foredate4 = dayjs().add(4, 'day').format('ddd, MMM D');
var foredate5 = dayjs().add(5, 'day').format('ddd, MMM D');

let foredates = [foredate1, foredate2, foredate3, foredate4, foredate5];

let gif = document.querySelector('#gif');


//when search button is clicked...
search.addEventListener('click', function () {
    //create a new card in sidebar with city name
    
    //format input for api call
    let inputArray = searched.value.split(',');
    let cityNameSearch = inputArray[0].replaceAll(' ', '+');
    let stateNameSearch = inputArray[1].replaceAll(' ', '');
    let searchInput = cityNameSearch + ',' + stateNameSearch;

    //query for current weather
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + ',840' + "&appid=" + APIkey;
    console.log(queryURL);
    fiveDay.setAttribute('class', 'row');
    var searchedCity = document.createElement('li');
    searchedCity.textContent = searched.value;
    searchedCity.setAttribute('class', 'citycard');
    //add card to list of searched cities
    cityList.appendChild(searchedCity);
    //add city name to main display
    displayLabel.textContent = searched.value;
    dateDisplay.textContent = date;

    clearForecast();

    //fetch current weather api data
    fetch(queryURL)
        //convert to json
        .then(function (response) {
            return response.json();
        })
        //convert temp to farenheit, print each stat in its own field
        .then(function (data) {
            console.log(data);
            let cityName = searched.value;
            localStorage.setItem(cityName, JSON.stringify(data));
            
            bigDisplay(data);

            //fetch forecast data and convert to json
            var FiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + '&lon=' + data.coord.lon + "&cnt=5" + "&appid=" + APIkey;

            fetch(FiveDayQueryURL)
                .then(function (response) {
                    return response.json();
                })
                //print forecast data to info cards
                .then(function (data) {
                    fiveDayForecast(data);
                    console.log(data);
                    let cityForecast = cityName + 'forecast';
                    localStorage.setItem(cityForecast, JSON.stringify(data));
                })
        })
    });

cityList.addEventListener('click', function (event) {
    event.preventDefault();
    let itemName = event.target.textContent
    let itemForecast = itemName + 'forecast';
    let previousCity = JSON.parse(localStorage.getItem(itemName));
    let previousForecast = JSON.parse(localStorage.getItem(itemForecast));
    clearForecast();
    bigDisplay(previousCity);
    fiveDayForecast(previousForecast);
});

function clearForecast() {
    for (var i=0; i<forecasts.length; i++) {
    forecasts[i].textContent = '';
    dayIcons[i].textContent='';
    }
};

function bigDisplay(data) {
            var ktemp = parseFloat(data.main.temp);
            var ftemp = Math.round((ktemp - 273.15) * 9 / 5 + 32);
            displayTemp.textContent = 'Temp: ' + ftemp + '°';
            displayWind.textContent = 'Wind: ' + Math.round(data.wind.speed) + 'mph';
            displayHum.textContent = 'Humidity: ' + data.main.humidity + '%';

            //change icon depending on if it's sunny or cloudy
            if (data.weather[0].main === "Clear") {
                mainWeather.textContent = data.weather[0].main;
                displayIcon.textContent = sun;
                gif.src = './assets/images/sun-gif.gif';
                gif.setAttribute('class', 'gif');
                // bodyImage.setAttribute('class', 'sunny');
            } else if (data.weather[0].main === "Rain") {
                mainWeather.textContent = data.weather[0].main;
                displayIcon.textContent = rain;
                gif.src = './assets/images/rain-gif.gif';
                gif.setAttribute('class', 'gif');
            } else if (data.weather[0].main === "Clouds") {
                if (data.weather[0].description === "overcast clouds") {
                    mainWeather.textContent = "Overcast";
                    displayIcon.textContent = cloud;
                    gif.src = './assets/images/overcast-meme.jpg';
                    gif.setAttribute('class', 'gif');
                } else {
                    displayIcon.textContent = partlyCloudy;
                    mainWeather.textContent = "Partly Cloudy";
                    gif.src = './assets/images/partly-cloudy-gif.gif';
                    gif.setAttribute('class', 'gif');
                }
            } else if (data.weather[0].main === "Snow") {
                mainWeather.textContent = data.weather[0].main;
                displayIcon.textContent = snow;
                gif.src = './assets/images/snow-gif.gif';
                gif.setAttribute('class', 'gif');
            } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Haze") {
                mainWeather.textContent = data.weather[0].main;
                displayIcon.textContent = mistHaze;
                gif.src = './assets/images/mist-haze-gif.gif';
                gif.setAttribute('class', 'gif');
            }
};

function fiveDayForecast(data) {
    for (var i=0; i < forecasts.length; i++) {
        forecasts[i].setAttribute('style', 'white-space: pre;');
        dayTitles[i].textContent = foredates[i] + ' \r\n';
        if (data.list[i].weather[0].main === "Clear") {
            dayIcons[i].textContent += sun + '\r\n';
        } else if (data.list[i].weather[0].main === "Clouds") {
            dayIcons[i].textContent += cloud + '\r\n';
        } else if (data.list[i].weather[0].main === "Rain") {
            dayIcons[i].textContent += rain + '\r\n';
        } else if (data.list[i].weather[0].main === "Snow") {
            dayIcons[i].textContent += snow + '\r\n';
        } else if (data.list[i].weather[0].main === "Mist" || data.list[i].weather[0].main === "Haze" ) {
            dayIcons[i].textContent += mistHaze + '\r\n';
        } else {
            dayIcons[i].textContent += partlyCloudy + '\r\n';
        }
        forecasts[i].textContent += 'Temp: ' + Math.round((data.list[i].main.temp - 273.15) * 9 / 5 + 32) + '° \r\n';
        forecasts[i].textContent += 'Wind: ' + Math.round(data.list[i].wind.speed) + 'mph \r\n';
        forecasts[i].textContent += 'Humidity: ' + data.list[i].main.humidity + '% \r\n';
    }
};

//when previous searches are clicked, they become the main display

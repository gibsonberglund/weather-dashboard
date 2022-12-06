var APIkey = "8aedb52cbdaa6a88589ed59b02b9ef8d";

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

//cards for each day of the forecast
var forecast1 = document.querySelector('#one');
var forecast2 = document.querySelector('#two');
var forecast3 = document.querySelector('#three');
var forecast4 = document.querySelector('#four');
var forecast5 = document.querySelector('#five');

var sun = '☀️';
var cloud = '☁';

function clearInput() {
    searched.value = '';
}

clearInput();

//dayjs date display variables
var date = dayjs().format('dddd, MMMM D, h:mm A');
var foredate1 = dayjs().add(1, 'day').format('ddd, MMM D');
var foredate2 = dayjs().add(2, 'day').format('ddd, MMM D');
var foredate3 = dayjs().add(3, 'day').format('ddd, MMM D');
var foredate4 = dayjs().add(4, 'day').format('ddd, MMM D');
var foredate5 = dayjs().add(5, 'day').format('ddd, MMM D');

//when search button is clicked...
search.addEventListener('click', function () {
    //create a new card in sidebar with city name
    //remove spaces from user input
    var searchedNoSpaces = searched.value.replaceAll(' ', '');

    //query for current weather
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchedNoSpaces + ',840' + "&appid=" + APIkey;
    console.log(queryURL);
    fiveDay.setAttribute('class', 'fiveday');
    var searchedCity = document.createElement('li');
    searchedCity.textContent = searched.value;
    searchedCity.setAttribute('class', 'citycard');
    //add card to list of searched cities
    cityList.appendChild(searchedCity);
    //add city name to main display
    displayLabel.textContent = searched.value;
    dateDisplay.textContent = date;

    //fetch current weather api data
    fetch(queryURL)
        //convert to json
        .then(function (response) {
            return response.json();
        })
        //convert temp to farenheit, print each stat in its own field
        .then(function (data) {
            console.log(data);
            var ktemp = parseFloat(data.main.temp);
            var ftemp = Math.round((ktemp - 273.15) * 9 / 5 + 32);
            displayTemp.textContent = 'Temp: ' + ftemp + '°';
            displayWind.textContent = 'Wind: ' + Math.round(data.wind.speed) + 'mph';
            displayHum.textContent = 'Humidity: ' + data.main.humidity + '%';

            //change icon depending on if it's sunny or cloudy
            if (data.weather[0].main === "Clear") {
                displayIcon.textContent = sun;
            } else {
                displayIcon.textContent = cloud;
            }

            //fetch forecast data and convert to json
            var FiveDayQueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + '&lon=' + data.coord.lon + "&cnt=5" + "&appid=" + APIkey;
            fetch(FiveDayQueryURL)
                .then(function (response) {
                    return response.json();
                })
                //print forecast data to info cards
                .then(function (data) {
                    console.log(data);

                    //forecast day 1
                    forecast1.setAttribute('style', 'white-space: pre;');
                    forecast1.textContent = foredate1 + ' \r\n';
                    if (data.list[0].weather[0].main === "Clear") {
                        forecast1.textContent += sun + '\r\n';
                    } else {
                        forecast1.textContent += cloud + '\r\n';
                    }
                    forecast1.textContent += 'Temp: ' + Math.round((data.list[0].main.temp - 273.15) * 9 / 5 + 32) + '° \r\n';
                    forecast1.textContent += 'Wind: ' + Math.round(data.list[0].wind.speed) + 'mph \r\n';
                    forecast1.textContent += 'Humidity: ' + data.list[0].main.humidity + '% \r\n';

                    //forecast day 2
                    forecast2.setAttribute('style', 'white-space: pre;');
                    forecast2.textContent = foredate2 + ' \r\n';
                    if (data.list[1].weather[0].main === "Clear") {
                        forecast2.textContent += sun + '\r\n';
                    } else {
                        forecast2.textContent += cloud + '\r\n';
                    }
                    forecast2.textContent += 'Temp: ' + Math.round((data.list[1].main.temp - 273.15) * 9 / 5 + 32) + '° \r\n';
                    forecast2.textContent += 'Wind: ' + Math.round(data.list[1].wind.speed) + 'mph \r\n';
                    forecast2.textContent += 'Humidity: ' + data.list[1].main.humidity + '% \r\n';

                    //forecast day 3
                    forecast3.setAttribute('style', 'white-space: pre;');
                    forecast3.textContent = foredate3 + ' \r\n';
                    if (data.list[2].weather[0].main === "Clear") {
                        forecast3.textContent += sun + '\r\n';
                    } else {
                        forecast3.textContent += cloud + '\r\n';
                    }
                    forecast3.textContent += 'Temp: ' + Math.round((data.list[2].main.temp - 273.15) * 9 / 5 + 32) + '° \r\n';
                    forecast3.textContent += 'Wind: ' + Math.round(data.list[2].wind.speed) + 'mph \r\n';
                    forecast3.textContent += 'Humidity: ' + data.list[2].main.humidity + '% \r\n';

                    //forecast day 4
                    forecast4.setAttribute('style', 'white-space: pre;');
                    forecast4.textContent = foredate4 + ' \r\n';
                    if (data.list[3].weather[0].main === "Clear") {
                        forecast4.textContent += sun + '\r\n';
                    } else {
                        forecast4.textContent += cloud + '\r\n';
                    }
                    forecast4.textContent += 'Temp: ' + Math.round((data.list[3].main.temp - 273.15) * 9 / 5 + 32) + '° \r\n';
                    forecast4.textContent += 'Wind: ' + Math.round(data.list[3].wind.speed) + 'mph \r\n';
                    forecast4.textContent += 'Humidity: ' + data.list[3].main.humidity + '% \r\n';

                    //forecast day 5
                    forecast5.setAttribute('style', 'white-space: pre;');
                    forecast5.textContent = foredate5 + ' \r\n';
                    if (data.list[4].weather[0].main === "Clear") {
                        forecast5.textContent += sun + '\r\n';
                    } else {
                        forecast5.textContent += cloud + '\r\n';
                    }
                    forecast5.textContent += 'Temp: ' + Math.round((data.list[4].main.temp - 273.15) * 9 / 5 + 32) + '° \r\n';
                    forecast5.textContent += 'Wind: ' + Math.round(data.list[4].wind.speed) + 'mph \r\n';
                    forecast5.textContent += 'Humidity: ' + data.list[4].main.humidity + '% \r\n';
                })

        })
});


//when previous searches are clicked, they become the main display

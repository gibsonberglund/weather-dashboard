var APIkey = "8aedb52cbdaa6a88589ed59b02b9ef8d";

var searched = document.querySelector('#searchbar');

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searched.value + ',USA' + "&appid=" + APIkey;

var search = document.querySelector('#searchbtn');

var cityList = document.querySelector('#citylist');

var mainDisplay = document.querySelector('#maindisplay');
var displayLabel = document.querySelector('#displaylabel');
var displayTemp = document.querySelector('#temp');
var displayWind = document.querySelector('#wind');
var displayHum = document.querySelector('#humidity');
var displayIcon = document.querySelector('#icon');


//when search button is clicked...
search.addEventListener('click', function(){
//create a new card in sidebar with city name
    var searchedCity = document.createElement('li');
    searchedCity.textContent = searched.value;
    searchedCity.setAttribute('class', 'citycard');
//add card to list of searched cities
    cityList.appendChild(searchedCity);
//add city name to main display
    displayLabel.textContent = searched.value;
    displayIcon.textContent = '☀️';
    displayTemp.textContent = 'Temp: ';
    displayWind.textContent = 'Wind: ';
    displayHum.textContent = 'Humidity: ';

//fetch api data
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.wind.deg);
})});


var requestUrl

//use the user input to request data from the 5 day weather forecast api
//display the data for current weather in main display card
//display the next five days below, each day in their own display card
//diplay list of searched cities on the sidebar
    //when previous searches are clicked, they become the main display

    //US country code : US/USA/840/ISO 3166-2:US, try 840 first
var APIkey = "8aedb52cbdaa6a88589ed59b02b9ef8d";

var searched = document.querySelector('#searchbar');

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searched + "&appid=" + APIkey;

var search = document.querySelector('#searchbtn');

search.querySelector('click', function(){
    fetch(queryURL)
    .then(function(response){
        return console.log(response.JSON);
})});


//list of searched cities appears in sidebar
/*

    const searchedCity = document.createElement('li');
    const node = document.createTextNode('searchbar.value');
    searchedCity.appendChild(node);
    const cityList = document.getElementById('#citylist');
    cityList.appendChild(searchedCity);
});
*/

var requestUrl

//use the user input to request data from the 5 day weather forecast api
//display the data for current weather in main display card
//display the next five days below, each day in their own display card
//diplay list of searched cities on the sidebar
    //when previous searches are clicked, they become the main display
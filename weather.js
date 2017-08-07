// api request limit: 500 per day, 10 per minute
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;
var description;
var uv;
var forecastHtml;


function sendRequest(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText);

            // gets all desired data from json
            var weather = {};
            weather.loc = data.current_observation.display_location.full;
            weather.icon = 'https' + data.current_observation.icon_url.slice(4);
            weather.humidity = data.current_observation.relative_humidity;
            weather.wind = data.current_observation.wind_mph;
            weather.direction = data.current_observation.wind_dir;
            weather.temp = Math.round(data.current_observation.temp_f);
            weather.description = data.current_observation.weather;
            weather.uv = data.current_observation.UV;

            var forecast = [];
            for (var i=1; i<4; i++){
                var day = data.forecast.simpleforecast.forecastday[i];
                forecast[i] = [day.date.weekday, day.high.fahrenheit, day.low.fahrenheit, day.conditions,
                    'https' + day.icon_url.slice(4)];
            }

            // calls update with arrays containing desired info from json
            update([weather, forecast]);
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
}

// weatherAndForecast is an array containing 2 arrays
function update(weatherAndForecast) {
    var weather = weatherAndForecast[0];
    var forecast = weatherAndForecast[1];

    // updates the html with the json data
    loc.innerHTML = weather.loc;
    humidity.innerHTML = 'Humidity: ' + weather.humidity;
    wind.innerHTML = 'Wind: ' + weather.wind + ' mph ' + weather.direction;
    temp.innerHTML = weather.temp + '&#8457;';
    icon.src = weather.icon;
    description.innerHTML = weather.description;
    uv.innerHTML = 'UV Index: ' + weather.uv;

    // remove elements that may have already been created
    document.getElementById('forecast').innerHTML = '';

    // forecast array should hold 3 days of info, each being an array of 5 items
    for (var i=1; i<forecast.length; i++) {

        var day = document.createElement('li');
        var high = document.createElement('li');
        var low = document.createElement('li');
        var pic = document.createElement('img');
        var forecastDescription = document.createElement('p');

        // adds data to elements
        day.appendChild(document.createTextNode(forecast[i][0]));
        forecastDescription.appendChild(document.createTextNode(forecast[i][3]));
        // day.appendChild(document.createTextNode(forecast[i][4]));
        pic.src = forecast[i][4];
        high.appendChild(document.createTextNode('High: ' + forecast[i][1]));
        low.appendChild(document.createTextNode('Low: ' + forecast[i][2]));
        high.innerHTML+='&#8457;';
        low.innerHTML+='&#8457;';


        // style elements
        day.className = 'forecastDay';
        pic.className = 'forecastImage';
        forecastDescription.className = 'forecastDescription';
        high.className = 'forecastHL';
        low.className = 'forecastHL';

        // add <li> elements to <ul> forecastHtml
        day.appendChild(pic);
        forecastHtml.appendChild(day);
        forecastHtml.appendChild(forecastDescription);
        forecastHtml.appendChild(high);
        forecastHtml.appendChild(low);
        forecastHtml.innerHTML += '<hr>';
    }
}


function updateByZip(zip) {
    var url = 'https://api.wunderground.com/api/214e2411900fbb2b/conditions/forecast/q/' + zip + '.json';
    sendRequest(url)
}

function updateByGeo(lat, lon) {
    var url = 'https://api.wunderground.com/api/214e2411900fbb2b/conditions/forecast/qforecast/q/' + lat + ',' + lon + '.json';
    sendRequest(url);
}

function getLocation(position) {
    updateByGeo(position.coords.latitude, position.coords.longitude);
}

function geoFail() {
    var zip = window.prompt('Enter your zip code:');
    updateByZip(zip);
}


window.onload = function () {
    temp = document.getElementById("temperature");
    loc = document.getElementById('location');
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
    description = document.getElementById('description');
    uv = document.getElementById('uv');
    forecastHtml = document.getElementById('forecast');

    if (navigator.geolocation) {
        // if geolocation doesn't work after 5 seconds, it will ask for zipcode
        navigator.geolocation.getCurrentPosition(getLocation,geoFail,{timeout:5000});
    }
    else {
        geoFail();
    }
};


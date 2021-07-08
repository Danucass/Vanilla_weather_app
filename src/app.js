function formatDate(timestamp) {
  // calculate de date, will receive a big number. To see this go to console.log(response.data.dt) //
  let date = new Date(timestamp);
  // give a zero before hours if hours are less than 10. Same to minutes. //
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${minutes}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  /* if I would like to see the weather by hours I should do response.data.hourly*/
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  /* we can inject HTML code because innerHTML accept it, so here is easy to replicate the forecast*/
  /* to replicate the days, we cannot copy and paste this code below because the code will run and will be replaced for the previous content. So is better to use a loop*/
  /* will store the HTML of the forecast*/

  let forecastHTML = `<div class="row">`;
  /* its going to loop through the object at response.data.daily and get "dt"*/
  /* appending a new column to HTML*/
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      /* inside, is going to modify the content of what is inside forecastHTML variable and its adding the all block of HTML below */
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forecastDay.temp.min
          )}°</span>
        </div>
      </div>
    `;
    }
  });
  /* concatenating the existing HTML and putting it inside of forecastElement which was selected before*/
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  /* console.log(coordinates); */
  let apiKey = "59ce39f42345d96674d2542886d2eb2e";
  /* we give the coordinates */
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  /* we say to axios, "hey, can you go and get this apiUrl and once you have the response go and display the forecast"  */
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  // selecting the element that has an id temperature (same to the following elements) //
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  // already declared in the bottom //
  celsiusTemperature = response.data.main.temp;
  // we round temperature and find the temperature doing console.log(response) and in console going through data, main, temp //
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  // we find the city name doing console.log(response) and in console going through data, name //
  cityElement.innerHTML = response.data.name;
  // we find the weather description doing console.log(response) and in console going through data, weather, 0 {array}, description //
  descriptionElement.innerHTML = response.data.weather[0].description;
  // we find the humidity doing console.log(response) and in console going through data, main, humidity //
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // convert date (dt) to miliseconds //
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  // to get the weather icons go to openweather "How to get icon URL" //
  // changing the source (src) of the attribute (icon) to (,) the URL of the icon and change the icon name (10d) for the icon destiny place (response.data.weather[0].icon) //
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  // updating the weather description depending on the city//
  iconElement.setAttribute("alt", response.data.weather[0].description);
  /* go and get the forecast and I will give you the coordinates, latitude and longitude */
  getForecast(response.data.coord);
}

function search(city) {
  // making an API call to openweather map API and then getting the result and then populating the HTML with the data they give us back. //
  let apiKey = "59ce39f42345d96674d2542886d2eb2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // fetch the results of the URL //
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getForecast);
}

function handleSubmit(event) {
  // preventing the page from reloading //
  event.preventDefault();
  // ask for a city //
  let cityInputElement = document.querySelector("#city-input");
  //console.log(cityInputElement.value); //
  // give result of the typed city //
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  // this is a link so to prevent just to not open the browser //
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  // remove the active class from the celsius link and add from fahrenheit //
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  // calculate fahrenheit temperature //
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  // replace the celsius temperature for fahrenheit temperature //
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  // add the active class from the celsius link and remove from fahrenheit //
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

// global variable //
let celsiusTemperature = null;

// linking the search (handleSubmit). Make sure this sure will be controled by JS and not by HTML //
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// Get current location //
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// convert temperature degrees from Celsius to Fahrenheit//
let fahrenheitLink = document.querySelector("#fahrenheit-link");
// whenever this is being clicked show fahrenheit temperature//
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// convert temperature degrees //
let celsiusLink = document.querySelector("#celsius-link");
// whenever this is being clicked show fahrenheit temperature//
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Porto");

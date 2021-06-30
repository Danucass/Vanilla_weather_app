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
}

function search(city) {
  // making an API call to openweather map API and then getting the result and then populating the HTML with the data they give us back. //
  let apiKey = "59ce39f42345d96674d2542886d2eb2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // fetch the results of the URL //
  axios.get(apiUrl).then(displayTemperature);
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

// convert temperature degrees from Celsius to Fahrenheit//
let fahrenheitLink = document.querySelector("#fahrenheit-link");
// whenever this is being clicked show fahrenheit temperature//
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

// convert temperature degrees //
let celsiusLink = document.querySelector("#celsius-link");
// whenever this is being clicked show fahrenheit temperature//
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Porto");

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
  // we round temperature and find the temperature doing console.log(response) and in console going through data, main, temp //
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  // we find the city name doing console.log(response) and in console going through data, name //
  cityElement.innerHTML = response.data.name;
  // we find the weather description doing console.log(response) and in console going through data, weather, 0 {array}, description //
  descriptionElement.innerHTML = response.data.weather[0].description;
  // we find the humidity doing console.log(response) and in console going through data, main, humidity //
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  // convert date (dt) to miliseconds //
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "59ce39f42345d96674d2542886d2eb2e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Porto&appid=${apiKey}&units=metric`;

// fetch the results of the URL //
axios.get(apiUrl).then(displayTemperature);

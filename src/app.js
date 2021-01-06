function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let temperatureForecastElement = document.querySelector(
    "#temperature-forecast"
  );
  let descriptionElement = document.querySelector("#description");
  let descriptionForecastElement = document.querySelector(
    "#description-forecast"
  );
  let windSpeedElement = document.querySelector("#wind-speed-forecast");
  let forecastIconElement = document.querySelector("#forecast-icon");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  temperatureForecastElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].main;
  descriptionForecastElement.innerHTML = response.data.weather[0].main;
  windSpeedElement.innerHTML = response.data.wind.speed;

  forecastIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  forecastIconElement.setAttribute("alt", response.data.weather[0].main);

  /*let precipitationForecastElement = document.querySelector(
    "#precipitation-forecast"
  );
  precipitationForecastElement.innerHTML = response.data.precipitation.value;*/
}
function search(city) {
  let apiKey = "6d0dc84f33996746a53bd0932ee1515d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let cityNameInputElement = document.querySelector("#city-name-input");
  cityNameInputElement;
  search(cityNameInputElement.value);
}

search("Moscow");

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

let now = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let currentTime = now.getHours() + ":" + minute;
  let formattedDate = `${currentDay} ${currentTime}`;
  return formattedDate;
}
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

function displayTemperature(response) {
  console.log(response.data);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  /*
  let weatherForecastIconElement = document.querySelector(
    "#weather-forecast-icon"
  );
  weatherForecastIconElement.innerHTML = response.data.weather.icon;*/

  /*jak te dwa gówna połączyć, próbowałam qselectorAll i nie poszło*/
  let temperatureElement = document.querySelector("#temperature");
  let temperatureForecastElement = document.querySelector(
    "#temperature-forecast"
  );
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  temperatureForecastElement.innerHTML = Math.round(response.data.main.temp);

  /*jak te dwa gówna połączyć, próbowałam qselectorAll i nie poszło*/
  let descriptionElement = document.querySelector("#description");
  let descriptionForecastElement = document.querySelector(
    "#description-forecast"
  );
  descriptionElement.innerHTML = response.data.weather[0].main;
  descriptionForecastElement.innerHTML = response.data.weather[0].main;

  let windSpeedElement = document.querySelector("#wind-speed-forecast");
  windSpeedElement.innerHTML = response.data.wind.speed;
}

let apiKey = "6d0dc84f33996746a53bd0932ee1515d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);

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

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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let currentTime = hours + ":" + minute;
  let formattedDate = `${currentDay} ${currentTime}`;
  return formattedDate;
}

function updateClock() {
  let h2 = document.querySelector("h2");
  h2.innerHTML = formatDate(new Date());
  setTimeout(updateClock, 1000);
}
updateClock();

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hours}:${minute}`;
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  let weatherImage = document.querySelector("#weather-image");
  weatherImage.src = displayWeatherImage(response);
}

function displayWeatherImage(response) {
  let iconID = response.data.weather[0].id;
  let weatherImage = "";
  if (iconID < 623 && iconID > 599) {
    weatherImage = "src/pictures/snow.png";
  } else if (iconID >= 200 && iconID < 600) {
    weatherImage = "src/pictures/rain.png";
  } else if (iconID >= 700 && iconID < 800) {
    weatherImage = "src/pictures/wind_dog_walk.png";
  } else if (iconID === 800) {
    weatherImage = "src/pictures/clear.png";
  } else if (iconID > 800 && iconID < 805) {
    weatherImage = "src/pictures/cloudy.png";
  } else {
    weatherImage = "src/pictures/forecast.png";
  }
  return weatherImage;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = "";
  for (let i = 0; i < 3; ++i) {
    let forecast = response.data.list[i * 2];
    let iconId = forecast.weather[0].id;
    let rain = `<i class="wi wi-rain"></i>`;
    let snow = `<i class="wi wi-snow"></i>`;
    let precNode = "";
    let precValue = 0;
    if (forecast.weather[0].main === "Snow") {
      precValue = forecast.snow["3h"];
      precNode += snow;
    } else if (forecast.weather[0].main === "Rain") {
      precValue = forecast.rain["3h"];
      precNode += rain;
    }

    precNode += `<span id="precipitation-forecast">${Math.ceil(
      precValue
    )} mm</span><br>`;
    forecastElement.innerHTML += `
        <div class="row">
            <div class="col">
              <i src="" alt="" class="wi wi-owm-${iconId} center forecast-icon"></i>
            </div>
            <div class="col">
              <span>${formatHours(forecast.dt * 1000)}</span>
            </div>
            <div class="col right-center forecast-max-temp">
              <span class="forecast-temp" data-celctemp="${Math.round(
                forecast.main.temp_max
              )}">
              ${Math.round(forecast.main.temp_max)}°C</span>
            </div>
            <div class="col right-center">
              <i class="wi wi-strong-wind"></i><span> ${Math.round(
                forecast.wind.speed
              )} m/s</span>
            </div>
            <div class="col right-center">
               ${precNode}
            </div>
          </div>`;
  }
}

function search(city) {
  let apiKey = "6d0dc84f33996746a53bd0932ee1515d";

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let cityNameInputElement = document.querySelector("#city-name-input");
  cityNameInputElement;
  search(cityNameInputElement.value);
}

function convertToFahrenheit(event) {
  let conv = (x) => Math.round((x * 9) / 5 + 32);
  let fahrenheitTemperature = conv(celsiusTemperature);
  let temperatureElement = document.querySelector("#temperature");
  celsiusConversionLink.classList.remove("active-link");
  fahrenheitConversionLink.classList.add("active-link");
  temperatureElement.innerHTML = fahrenheitTemperature;
  document.querySelectorAll(".forecast-temp").forEach((element) => {
    element.innerText = conv(element.dataset.celctemp) + "°F";
  });
}

function convertToCelsius(event) {
  celsiusConversionLink.classList.add("active-link");
  fahrenheitConversionLink.classList.remove("active-link");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  document.querySelectorAll(".forecast-temp").forEach((element) => {
    element.innerText = element.dataset.celctemp + "°C";
  });
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

let fahrenheitConversionLink = document.querySelector("#fahrenheit-conversion");
fahrenheitConversionLink.addEventListener("click", convertToFahrenheit);

let celsiusConversionLink = document.querySelector("#celsius-conversion");
celsiusConversionLink.addEventListener("click", convertToCelsius);

search("Amsterdam");

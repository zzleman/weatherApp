const API_KEY = "2bfc3e28d8dd46c29dc94420231805"
const container = document.querySelector(".container")
const input = document.querySelector("input")
const searchBtn = document.querySelector(".search-btn")
const searchBar = document.querySelector(".search-bar")
const body = document.querySelector("body")

let currentWeather = "";
fetchWeatherData("Baku");

searchBtn.addEventListener("click",()=>{
    let cityname=input.value.trim();
    if(!cityname) return;
    if(currentWeather && currentWeather.location.name === cityname) return;

    fetchWeatherData(cityname);
})

function fetchWeatherData(cityname) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityname}&aqi=no`)
      .then(x => x.json())
      .then(x => {
        currentWeather = x;
        renderWeather(x);
      })
      .catch((error) => {
        console.error("An error occurred while fetching weather data:", error);
        NotFound();})

  }
  function NotFound() {
    const NotFound = document.createElement('span')
    NotFound.classList.add("error");
    NotFound.innerText = 'Invalid City Name!'
    container.appendChild(NotFound)
}
function renderWeather(weather) {
  clearWeather();

  const searchedCity = weather.location.name;
  const searchedCountry = weather.location.country;
  const currentCondition = weather.current.condition.text;
  const weatherIcon = weather.current.condition.icon;
  const localTime = weather.location.localtime.substr(10);
  const tempC = weather.current.temp_c;
  const windKPH = weather.current.wind_kph;
  const currentHumidity = weather.current.humidity;
  const feelsLikeC = weather.current.feelslike_c;
  const uvIndex = weather.current.uv;
  const visKm = weather.current.vis_km;

  const weatherInfoContainer = document.createElement("div");
  weatherInfoContainer.classList.add("weather-info");

  const leftContainer = document.createElement("div");
  leftContainer.classList.add("left-info");

  const localTimeSpan = document.createElement("div");
  localTimeSpan.classList.add("local-time");
  localTimeSpan.innerText = `Local Time: ${localTime}`;


  const windSpeedSpan = document.createElement("div");
  windSpeedSpan.classList.add("wind-speed");
  const speedImg =  document.createElement("img")
  speedImg.src = "./assets/images/wind.png"
  speedImg.classList.add("speed-img");
  const speedText = document.createElement("p")
  speedText.innerText = `Wind Speed`;
  speedText.classList.add("speed-text");
  const speed = document.createElement("p")
  speed.innerText = windKPH
  speed.classList.add("speed");
  const kmH = document.createElement("p")
  kmH.innerText = "km/h"
  kmH.classList.add("kmH");


  const humiditySpan = document.createElement("div");
  humiditySpan.classList.add("humidity");
  const humidityImg =  document.createElement("img")
  humidityImg.src = "./assets/images/humidity.png"
  humidityImg.classList.add("humidity-img");
  const humidityText = document.createElement("p")
  humidityText.innerText = `Humidity`;
  humidityText.classList.add("humidity-text");
  const humidityP = document.createElement("p")
  humidityP.innerText = currentHumidity
  humidityP.classList.add("humidityP");
  const percent = document.createElement("p")
  percent.innerText = "%"
  percent.classList.add("percent");

  const uvIndexSpan = document.createElement("div");
  uvIndexSpan.classList.add("uv-index");
  const uvIndexImg =  document.createElement("img")
  uvIndexImg.src = "./assets/images/uv-index.png"
  uvIndexImg.classList.add("uvIndex-img");
  const uvIndexText = document.createElement("p")
  uvIndexText.innerText = `Humidity`;
  uvIndexText.classList.add("uvIndex-text");
  const uvIndexP = document.createElement("p")
  uvIndexP.innerText = uvIndex
  uvIndexP.classList.add("uvIndexP");

  const visKmSpan = document.createElement("div");
  visKmSpan.classList.add("visibility");
  const visImg =  document.createElement("img")
  visImg.src = "./assets/images/goggles.png"
  visImg.classList.add("vis-img");
  const visText = document.createElement("p")
  visText.innerText = `Visibility`;
  visText.classList.add("vis-text");
  const visP = document.createElement("p")
  visP.innerText = visKm
  visP.classList.add("visP");
  const SeenKm = document.createElement("p")
  SeenKm.innerText = "Km"
  SeenKm.classList.add("SeenKm");

  const cityCountryDiv = document.createElement("div");
  cityCountryDiv.classList.add("city-country");
  cityCountryDiv.innerText = `${searchedCity}, ${searchedCountry}`;

  const currentConditionSection = document.createElement("span");
  currentConditionSection.classList.add("condition");
  currentConditionSection.innerText = `${currentCondition}`;

  const weatherIconSection = document.createElement("img");
  weatherIconSection.classList.add("weather-icon");
  weatherIconSection.src = `https:${weatherIcon}`;

  const temperatureSpan = document.createElement("span");
  temperatureSpan.classList.add("temperature");
  temperatureSpan.innerText = `${tempC}°C`

  const feelsLikeDiv = document.createElement("div");
  feelsLikeDiv.classList.add("feels-like");
  feelsLikeDiv.innerText = `Feels Like ${feelsLikeC}°C`;

  if(tempC <=0 ){
    body.style.backgroundColor="rgb(92, 92, 190)"
  }
  else if(tempC>0 && tempC<=10){
    body.style.backgroundColor="rgb(11, 34, 241)"
  }
  else if(tempC >10 && tempC <=15){
    body.style.backgroundColor="rgb(58, 148, 251)"
  }
  else if(tempC>15 && tempC<=21){
    body.style.backgroundColor="rgb(0, 250, 87)"
  }
   if(tempC>21 && tempC<=26){
    body.style.backgroundColor="rgb(235, 250, 114)"
  }
  else if(tempC>26 && tempC<=30){
    body.style.backgroundColor="rgb(241, 149, 11)"
  }
  else if(tempC>30 && tempC<=40){
    body.style.backgroundColor="rgb(241, 42, 11)"
  }


  windSpeedSpan.appendChild(speedText);
  windSpeedSpan.appendChild(speedImg);
  windSpeedSpan.appendChild(speed)
  windSpeedSpan.appendChild(kmH);

  humiditySpan.appendChild(humidityText)
  humiditySpan.appendChild(humidityImg)
  humiditySpan.appendChild(humidityP)
  humiditySpan.appendChild(percent)

  uvIndexSpan.appendChild(uvIndexImg)
  uvIndexSpan.appendChild(uvIndexText)
  uvIndexSpan.appendChild(uvIndexP)

  visKmSpan.appendChild(visText)
  visKmSpan.appendChild(visImg)
  visKmSpan.appendChild(visP)
  visKmSpan.appendChild(SeenKm)

  container.appendChild(localTimeSpan);

  weatherInfoContainer.appendChild(windSpeedSpan);
  weatherInfoContainer.appendChild(humiditySpan);
  weatherInfoContainer.appendChild(uvIndexSpan);
  weatherInfoContainer.appendChild(visKmSpan);
  weatherInfoContainer.appendChild(searchBar)

  container.appendChild(weatherInfoContainer);
  container.appendChild(leftContainer)

  leftContainer.appendChild(cityCountryDiv);
  leftContainer.appendChild(currentConditionSection);
  leftContainer.appendChild(weatherIconSection);
  leftContainer.appendChild(temperatureSpan);
  leftContainer.appendChild(feelsLikeDiv);
}

function clearWeather() {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
const url =
"https://api.openweathermap.org/data/2.5/weather?lat=13.4833&lon=-88.1833&appid=YOURKEY&units=imperial";

const response = await fetch(url);

const data = await response.json();

document.querySelector("#current-temp").textContent =
`${data.main.temp}°F`;

document.querySelector("#weather-desc").textContent =
data.weather[0].description;
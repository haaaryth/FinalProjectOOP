//string containing the API key for accessing the OpenWeatherMap API
const apiKey = "9fd7a449d055dba26a982a3220f32aa2";
//string containing the base URL for the OpenWeatherMap API's weather endpoint
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

//reference to an HTML select element with the ID "city-select"
const citySelect = document.getElementById("city-select");
//reference to an HTML element with the ID "weather-info"
const weatherInfo = document.getElementById("weather-info");

citySelect.addEventListener("change", () => {
  const city = citySelect.value;
  const url = `${baseUrl}${city}&appid=${apiKey}`;

  // return data in JSON format.
  fetch(url)
    // parse the response data as JSON
    .then((response) => response.json())
    .then((data) => {
      //the temperature in Celsius, rounded to the nearest integer. Convert to Calcius
      const temp = Math.round(data.main.temp - 273.15);
      //description of the weather conditions (e.g. "clear", "clouds", "rain").
      const weather = data.weather[0].main;
      //the URL of an icon representing the weather conditions.
      const icon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      // set time zone in British
      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('tr-TR', { timeZone: 'Europe/London' });
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('tr-TR', { timeZone: 'Europe/London' });

      // retrieve informative data.
      const html = `
      
        <img src="${icon}" alt="${weather}">
        <p>Temperature: ${temp}&deg;C</p>
        <p>Weather: ${weather}</p>
        <p>Sunrise: ${sunriseTime}</p>
        <p>Sunset: ${sunsetTime}</p>
      `;

      weatherInfo.innerHTML = html;
    })
    .catch((error) => console.error(error));
});
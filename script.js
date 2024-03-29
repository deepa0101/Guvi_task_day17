async function fetchCountryData() {

    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;

}


async function fetchWeather(cityName) {
    const apiKey = 'f39da4871c364bc0e7d8b283d7829b72';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const weatherData = await response.json();
    return weatherData;

}


async function createCardsForCountries() {
  const row = document.getElementById("countryCards");
  const countriesData = await fetchCountryData();

  countriesData.forEach(async (countryData) => {
    const cardElement = document.createElement("div");
    cardElement.setAttribute("class", "col-lg-4 col-md-6 col-sm-12 mb-3");

    cardElement.style.marginTop = "10px";
    cardElement.style.marginBottom = "10px";

    cardElement.innerHTML = `
      <div class="card text-white bg-dark mb-3 text-center h-100 w-75" style="border-color:white">
        <div class="card-header"><h4>${countryData.name.common}</h4></div>
        <img src="${countryData.flags.png}" class="card-img-top img"  alt="Flag">
        <div class="card-body">
          <h5 class="card-title">Capital: ${countryData.capital}</h5>
          <p class="card-text">Region: ${countryData.region}</p>
          <p class="card-text">Country codes: ${countryData.cca2}, ${countryData.cca3}</p>
          <p class="card-text">LatLng: ${countryData.latlng.join(", ")}</p>
          <button class="btn btn-primary weather-button" data-city="${countryData.capital}">Click for Weather</button>
          <div class="weather-info"></div>
        </div>
      </div>
    `;

    row.appendChild(cardElement);

  
    const weatherButton = cardElement.querySelector(".weather-button");
    const weatherInfo = cardElement.querySelector(".weather-info");
    weatherButton.addEventListener("click", async () => {
      const cityName = weatherButton.getAttribute("data-city");
      const weatherData = await fetchWeather(cityName);
      if (weatherData) {
       
        weatherInfo.innerHTML = `
          <p class="card-text">Weather: ${weatherData.weather[0].description}</p>
          <p class="card-text">Temperature: ${weatherData.main.temp}°C</p>
        `;
      } else {
        weatherInfo.innerHTML = `<p class="card-text">Failed to fetch weather data for ${cityName}</p>`;
      }
    });
  });
}

createCardsForCountries();
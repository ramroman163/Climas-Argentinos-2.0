import {cityFilter, resetOptions, resetSearch} from "./resources.js";
import "./scroll.js";

let cityCoords = [];

const form = document.querySelector(".search__form");
form.addEventListener("submit", onSubmit, true);

function onSubmit(event) {
  event.preventDefault();
  resetSearch(cityCoords);
  let input = document.querySelector(".search__input");
  cityRequest(input.value);
  form.reset();
}

async function cityRequest(city) {

  try {
    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city},AR&limit=7&lang=sp&appid=5fab11b8cdf9affc7e1236fe4909ad05`;
    const response = await fetch(url);
    const data = await response.json();
  
    let filtedData = cityFilter(data);
    filtedData.length > 1 ? showCities(filtedData): searchWeather({"lat": filtedData[0]["lat"], "lon": filtedData[0]["lon"]});
  } catch (e) {

    document.querySelector(".search__warning").style.display = "block";

    setTimeout(() =>{
      document.querySelector(".search__warning").style.opacity = 1;
    }, 200);

  }
}

function selectCity(){
  let options = document.querySelectorAll(".cities__option");
  options.forEach((option) => {
    option.addEventListener("click", () => searchWeather( cityCoords[ option.getAttribute("pos") ] ) );
  });
}

async function showCities(cities = []){
  const containerCities = document.querySelector(".cities");
  containerCities.classList.add("cities--style");

  let it = 0;

  cities.forEach((city) => {
    let option = document.createElement("input");
    option.setAttribute("type", "button");
    option.classList.add("cities__option");
    option.setAttribute("pos", it);
    
    cityCoords.push({"lat": city["lat"], "lon": city["lon"]});

    let cityName = `${city["name"]}, ${city["state"]}`;
    option.setAttribute("value", cityName);
    containerCities.append(option);

    setTimeout(() => {
      option.style.opacity = 1;
    }, 200);

    it += 1;
  });

  selectCity();
}

async function searchWeather({lat, lon}){
  resetOptions();

  let url = 'https://api.openweathermap.org/data/2.5/weather?' + 'lat=' + lat + '&lon=' + lon + '&lang=es&appid=5fab11b8cdf9affc7e1236fe4909ad05&units=metric';
  
  const response = await fetch(url);
  
  const data = await response.json();
  
  showWeather(data["main"], data["wind"], data["weather"][0]);
}

function showWeather({temp, humidity}, {speed}, {icon, description}){
  setTimeout(() => {
    document.querySelector(".card").style.opacity = 1;
  }, 200);

  document.querySelector(".card").style.display = "block";

  document.querySelector(".card__icon").setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`)

  document.querySelector(".card__weather-desc").innerText = (description[0].toUpperCase() + description.slice(1));

  document.querySelector(".card__temp").innerText = temp;
  document.querySelector(".card__hum").innerText = humidity;
  document.querySelector(".card__wind").innerText = speed;
}
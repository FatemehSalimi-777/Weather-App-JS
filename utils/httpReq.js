import { showModal } from "./modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "877c34b0565be04c5a773122aae50952";

const getWeatherData = async (type, data) => {
  let url = null;

  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
      }
      break;
    default:
      url = `${BASE_URL}/weather?q=dogonbadan&appid=${API_KEY}&units=metric`;

      break;
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
      return json;
    } else {
      showModal(json.message);
    }
  } catch (error) {
    showModal("An error accured!");
  }
};

// const getCurrentWeatherByName = async (city) => {
//   const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

// const getCurrentWeatherByCoordinates = async (lat, lon) => {
//   const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

// const getforecastWeatherByName = async (city) => {
//   const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

// const getForecastWeatherByCoordinates = async (lat, lon) => {
//   const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   const response = await fetch(url);
//   const json = await response.json();
//   return json;
// };

export default getWeatherData;

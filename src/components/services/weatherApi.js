const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/"
const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather(city){
  try {
    const geoRes = await fetch(`${GEOCODING_URL}?name=${city}&count=1`);
    const geoData = await geoRes.json();

    const {latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
      `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherRes.json()

    return {
      city: name,
      country,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      weathercode: weatherData.current_weather.weathercode,
    };
  } catch (error) {
    console.error("Fel i fetchWeather", error)
    throw error;
  }
}

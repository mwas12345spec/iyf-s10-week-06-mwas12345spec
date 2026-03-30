const API_KEY = "YOUR_API_KEY";

const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const display = document.getElementById("weather-display");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

async function getWeather(city) {
    try {
        showLoading();
        hideError();

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!res.ok) throw new Error("City not found");

        const data = await res.json();

        cityName.textContent = data.name;
        temperature.textContent = `Temp: ${data.main.temp}°C`;
        description.textContent = data.weather[0].description;

        display.classList.remove("hidden");

    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError(msg) {
    error.textContent = msg;
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    getWeather(cityInput.value);
});

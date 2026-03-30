async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Enter a city");
        return;
    }

    try {
        const res = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await res.json();

        const current = data.current_condition[0];

        document.getElementById("result").innerHTML = `
            <h2>${city}</h2>
            <p>🌡️ ${current.temp_C}°C</p>
            <p>🌤️ ${current.weatherDesc[0].value}</p>
            <p>💧 Humidity: ${current.humidity}%</p>
            <p>🌬️ Wind: ${current.windspeedKmph} km/h</p>
        `;

        const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const todayIndex = new Date().getDay();

        let forecastHTML = "";
        const forecastDays = data.weather.slice(0, 5); // ONLY 5 DAYS

        forecastDays.forEach((day, index) => {
            let label;

            if (index === 0) {
                label = "Today";
            } else if (index === 1) {
                label = "Tomorrow";
            } else {
                label = weekDays[(todayIndex + index) % 7];
            }

            forecastHTML += `
                <div class="forecast-card">
                    <h4>${label}</h4>
                    <p>🌡️ Max: ${day.maxtempC}°C</p>
                    <p>🌡️ Min: ${day.mintempC}°C</p>
                    <p>🌧️ ${day.hourly[0].weatherDesc[0].value}</p>
                </div>
            `;
        });

        document.getElementById("forecast").innerHTML = forecastHTML;

    } catch (err) {
        document.getElementById("result").innerHTML = "Error loading weather";
        document.getElementById("forecast").innerHTML = "";
    }
}

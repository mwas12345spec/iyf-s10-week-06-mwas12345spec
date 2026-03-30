async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "YOUR_API_KEY_HERE";

    if (!city) {
        alert("Enter a city name");
        return;
    }

    try {
        //  5-day forecast API
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);
        const data = await res.json();

        if (res.status !== 200) {
            document.getElementById("current").innerHTML = "City not found ❌";
            return;
        }

        //  CURRENT WEATHER (first item)
        const current = data.list[0];

        document.getElementById("current").innerHTML = `
            <h2>${data.city.name}</h2>
            <p> ${current.main.temp}°C</p>
            <p> ${current.weather[0].description}</p>
        `;

        //  GROUP DATA INTO 5 DAYS
        const days = {};

        data.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];

            if (!days[date]) {
                days[date] = {
                    temp: [],
                    weather: item.weather[0].description
                };
            }

            days[date].temp.push(item.main.temp);
        });

        //  CREATE 5-DAY CARDS (FOCUSED)
        let forecastHTML = "";
        let count = 0;

        for (let date in days) {
            if (count === 5) break;

            const temps = days[date].temp;
            const min = Math.min(...temps).toFixed(1);
            const max = Math.max(...temps).toFixed(1);

            forecastHTML += `
                <div class="card">
                    <h3>${date}</h3>
                    <p> ${max}°C</p>
                    <p> ${min}°C</p>
                    <p>${days[date].weather}</p>
                </div>
            `;

            count++;
        }

        document.getElementById("forecast").innerHTML = forecastHTML;

    } catch (err) {
        document.getElementById("current").innerHTML = "Error loading weather ";
    }
}

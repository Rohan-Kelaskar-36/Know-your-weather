async function getWeather(city) {
    cityName.innerHTML=city
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(city)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6f592e7169msh509454fc53915dfp1b299bjsnf26b2f032378',  
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data && data.location && data.current) {
            const weatherInfo = {
                location: data.location.name,
                country: data.location.country,
                temperature: data.current.temp_c, 
                condition: data.current.condition.text,
                humidity: data.current.humidity,
                wind: data.current.wind_kph, 
            };

            console.log(weatherInfo);

            const temperatureElement = document.getElementById('temperature');
            const humidityElement = document.getElementById('humidity');
            const windElement = document.getElementById('wind');

            if (temperatureElement) {
                temperatureElement.innerHTML = `${weatherInfo.temperature} °C`;
            }
            if (humidityElement) {
                humidityElement.innerHTML = `${weatherInfo.humidity}%`;
            }
            if (windElement) {
                windElement.innerHTML = `${weatherInfo.wind} km/h`;
            }
        } else {
            alert('Weather data not available for the given city.');
        }

    } catch (error) {
        console.error('Failed to fetch weather data:', error);
    }
}

document.getElementById('submit').addEventListener("click", (e) => {
    e.preventDefault();  

    const cityInput = document.getElementById('City');  
    const cityName = cityInput.value.trim();

    if (cityName) {
        getWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

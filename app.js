$(document).ready(function() {

    const loc = document.getElementById("location");
    const temNum = document.getElementById("temperature-num");
    const temScale = document.getElementById("temperature-scale");
    const weatherCon = document.getElementById("weather-condition");
    const weatherIcon = document.getElementById("weather-icon");

    let climate;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                getWeather(position.coords.latitude, position.coords.longitude);
                //getWeather(20.2961, 85.8245);
            });
        } else {
            loc.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function getWeather(lat, long) {
        console.log("lat" + lat + "long" + long);
        const root = "https://fcc-weather-api.glitch.me/api/current?";
        fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                updateDataToUI(data.name, data.weather, data.main.temp);
            })
            .catch(function(err) {
                console.error(err);
            });
    }

    function updateDataToUI(location, weather, temp) {

        changeColor(weather)
        weatherIcon.innerHTML = `<img src="${weather[0].icon}" />`;
        weatherCon.innerHTML = weather[0].main;
        loc.innerHTML = location;
        temNum.innerHTML = `${temp}`;
        console.log(location);

    }

    window.onload = function() {
        getLocation();
    };

    function changeColor(weather) {
        climate = weather[0].main;
        if (climate === "Haze") {
            $(".container").css("background-color", "grey")
        } else if (climate === "Drizzle") {
            $(".container").css("background-color", "yellow")
        } else if (climate === "Clouds") {
            $(".container").css("background-color", "pink")
        } else if (climate === "Rain") {
            $(".container").css("background-color", "red")
        } else if (climate === "Snow") {
            $(".container").css("background-color", "green")
        } else if (climate === "Clear") {
            $(".container").css("background-color", "blue")
        } else {
            $(".container").css("background-color", "white")
        }


    }

});
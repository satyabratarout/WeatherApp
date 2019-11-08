// function weather() {

//     var location = document.getElementById("location");
//     var apiKey = 'b27c6e5136e305453b74ab695292c44e';
//     var url = 'https://api.forecast.io/forecast/';

//     navigator.geolocation.getCurrentPosition(success, error);

// function success(position) {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;

//     location.innerHTML = 'Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '°';

//     $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
//         $('#temp').html(data.currently.temperature + '° F');
//         $('#minutely').html(data.minutely.summary);
//     });
// }

// function error() {
//     location.innerHTML = "Unable to retrieve your location";
// }

//     location.innerHTML = "Locating...";
// }

// weather();

$(document).ready(function() {
    // var geocoder;

    // function weather() {

    //     const root = "https://fcc-weather-api.glitch.me/api/current?";
    //     navigator.geolocation.getCurrentPosition(success, error);

    //     function success(position) {
    //         latitude = position.coords.latitude;
    //         longitude = position.coords.longitude;
    //         console.log(position);

    //         location.innerHTML = 'Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '°';

    //         fetch(`${root}lat=${latitude}&lon=${longitude}`, { method: "get" })
    //             .then(resp => resp.json())
    //             .then(data => {
    //                 console.log(data);
    //                 //updateDataToUI(data.name, data.weather, data.main.temp);
    //             })
    //             .catch(function(err) {
    //                 console.error(err);
    //             });
    //     }

    //     function error() {
    //         //location.innerHTML = "Unable to retrieve your location";
    //     }
    // }
    // weather();

    const loc = document.getElementById("location");
    const temNum = document.getElementById("temperature-num");
    const temScale = document.getElementById("temperature-scale");
    const weatherCon = document.getElementById("weather-condition");
    const weatherIcon = document.getElementById("weather-icon");

    let climate;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                //getWeather(position.coords.latitude, position.coords.longitude);
                getWeather(20.2961, 85.8245);
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
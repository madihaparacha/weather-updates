let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
function getWeather() {
    document.querySelector(".weather-info").style.display = "block";
    document.querySelector(".header").style.display = "none";
    // document.querySelector(".weather-forecast").value;
    let cityName = document.querySelector("input").value;
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=61bf8b2ccfa57490766b2810f71fc436&units=metric`,
        success: function (data) {
            console.log(data);

            let date = new Date();
            let daytime = new Date(data.sys.sunrise * 1000);
            let nighttime = new Date(data.sys.sunset * 1000);

            if (nighttime > date && daytime < date) {
                document.querySelector("body").style["background-image"] = `url(Capture.png)`;
            } else {
                document.querySelector("body").style["background-image"] = `url(Capture2.png)`;
            }
            console.log(data);
            document.querySelector(".city-name").innerHTML = data.name;
            let icon = data.weather[0].main;

            if (icon === `Haze`) {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-smoke"></i>';
            }
            else if (icon === `Clouds`) {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-cloud"></i>';
            }
            else if (icon === `Rainy`) {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-rainy"></i>';
            }
            else if (icon === `sunny`) {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-sunny"></i>';
            }
            else if (icon === 'Haze') {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-day-haze"></i>';
            }
            else if (icon === 'Clear') {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-night-clear"></i>';
            }
            else if (icon === 'Fog') {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-night-fog"></i>';
            }
            else {
                document.querySelector(".weather-icon").innerHTML = '<i class="wi wi-mist"></i>';
            }
            document.querySelector(".current-temp > span").innerHTML = Math.round(data.main.temp);
            document.querySelector(".min").innerHTML = Math.round(data.main.temp_min);
            document.querySelector(".max").innerHTML = Math.round(data.main.temp_max);
            document.querySelector(".description").innerHTML = data.weather[0].main;

        },
        error: function (err) {
            alert(error.responseJSON.message);

        }
    });


    $.ajax({

        url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=61bf8b2ccfa57490766b2810f71fc436&units=metric`,
        success: function (data) {
            console.log(data);
            let d1 = new Date(data.list[0].dt * 1000);
            let d2 = new Date(data.list[8].dt * 1000);
            let d3 = new Date(data.list[16].dt * 1000);
            let d4 = new Date(data.list[24].dt * 1000);
            let d5 = new Date(data.list[32].dt * 1000);

            //days
            document.querySelector(".monday").innerHTML = days[d1.getDay()];
            document.querySelector(".tuesday").innerHTML = days[d2.getDay()];
            document.querySelector(".wednesday").innerHTML = days[d3.getDay()];
            document.querySelector(".thursday").innerHTML = days[d4.getDay()];
            document.querySelector(".friday").innerHTML = days[d5.getDay()];

            //exp-temp
            let degree = "&#176";
            document.querySelector(".exp-temp-mon").innerHTML = Math.round(data.list[0].main.temp) + degree + "/" + Math.round(data.list[2].main.temp) + degree;
           let forecast1 = data.list[0].weather[0].icon;
                    if(forecast1 == "01d" || forecast1 == "01n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/ios/50/ffffff/sun-filled.png";
                    }
                    else if(forecast1 == "02d" || forecast1 == "02n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/wired/50/ffffff/clouds.png";
                    }
                    else if(forecast1 == "03d" || forecast1 == "03n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/ios/50/ffffff/cloudflare.png";
                    }
                    else if(forecast1 == "04d" || forecast1 == "04n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/ios/50/ffffff/cloudflare.png";
                    }
                    else if(forecast1 == "09d" || forecast1 == "09n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/wired/50/ffffff/rain.png";
                    }
                    else if(forecast1 == "10d" || forecast1 == "10n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/ios/50/ffffff/torrential-rain.png";
                    }
                    else if(forecast1 == "11d" || forecast1 == "11n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/wired/50/ffffff/storm.png";
                    }
                    else if(forecast1 == "13d" || forecast1 == "13n"){
                        document.querySelector(".icons-mon").src = "https://png.icons8.com/ios/50/ffffff/winter.png";
                    }
                    else if(forecast1 == "50d" || forecast1 == "50n"){
                        document.querySelector(".icons-mon").src = "https://www.dovora.com/resources/weather-icons/showcase/simplistic_showcase/mist.png";
                    }
            document.querySelector(".exp-temp-tues").innerHTML = Math.round(data.list[5].main.temp) + degree + "/" + Math.round(data.list[6].main.temp) + degree;
            document.querySelector(".exp-temp-wed").innerHTML = Math.round(data.list[13].main.temp) + degree + "/" + Math.round(data.list[14].main.temp) + degree;
            document.querySelector(".exp-temp-thurs").innerHTML = Math.round(data.list[21].main.temp) + degree + "/" + Math.round(data.list[22].main.temp) + degree;
            document.querySelector(".exp-temp-fri").innerHTML = Math.round(data.list[29].main.temp) + degree + "/" + Math.round(data.list[32].main.temp) + degree;

        },
        error: function (error) {
            console.log(error)
        }

    });

};

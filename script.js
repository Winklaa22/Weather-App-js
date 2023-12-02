var searchButton = document.querySelector(".search-btn");
var boxSelector = document.querySelector(".weather-box");
var contentSelector = document.querySelector(".content")
var cityText = document.getElementById("cityText");
let isOpened = false;

let weatherInfoContent = null;

searchButton.addEventListener('click', function() {
    OpenFullBox();
    const API = 'c027370d3c86f74d371827244fbdffc3';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("searchInput").value}&units=metric&appid=${API}`)
    .then(response => response.json()).then(json => {

        const image = document.getElementById('weather-image');
        const desc = document.querySelector('.weather-desc')
        const temp = document.querySelector(".weather-degrees");

        switch(json.weather[0].main){
            case 'Thunderstorm':
                image.src = "weather-icons/rain_thunder.png"
                break;

            case 'Snow':
                image.src = "weather-icons/day_snow.png"
                break;
                
            case 'Rain':
                image.src = "weather-icons/day_rain.png"
                break;

            case 'Clouds':
                image.src = "weather-icons/day_partial_cloud.png";
                break;

            case 'Clear':
                image.src = "weather-icons/day_clear.png";
                break;

            case 'Mist':
                image.src = "weather-icons/mist.png";
                break;
            
            case 'Fog':
                image.src = "weather-icons/fog.png"
                break;
            
        }

        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        desc.innerHTML = `${json.weather[0].description}`

    });
  });

  function AddContent(){
    weatherInfoContent = document.createElement('div');

    weatherInfoContent.innerHTML = `
    <div class="content">
        <p class="city-text" id="cityText">Wrocław</p>
        <img id="weather-image" src="weather-icons/cloudy.png" alt="">
        <p class="weather-desc">Rainy</p>
        <p class="weather-degrees">16<span>°C</span></p>
    </div> 
    `;

    const container = document.querySelector('.container');
    container.appendChild(weatherInfoContent)
  }

function OpenFullBox(){
    const searchInput = document.querySelector(".city-input");

    if(!isOpened){
        AddContent();
        searchInput.style.height = '30px';
        boxSelector.style.height = '450px';
        boxSelector.style.width = "400px"
        contentSelector.style.opacity = '1';
        cityText.innerHTML = document.getElementById("searchInput").value;
    }
    else{
        contentSelector.style.opacity = '0';
        setTimeout(()=>{
            contentSelector.style.opacity = '1';
            cityText.innerHTML = document.getElementById("searchInput").value;
        }, 100)
    }
    isOpened =! isOpened;
}
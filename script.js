const searchButton = document.querySelector(".search-btn");
const boxSelector = document.querySelector(".weather-box");
const contentSelector = document.querySelector(".content")
const cityText = document.getElementById("cityText");
const errorPanel = document.querySelector(".errorPanel");
const searchInput = document.querySelector(".city-input");
let isOpened = false;

let weatherInfoContent = null;

searchButton.addEventListener('click', function() {
    onButtonClicked();
  });


function onButtonClicked(){

    if(searchInput.value == ""){
        return;
    }
        

    const API = 'c027370d3c86f74d371827244fbdffc3';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("searchInput").value}&units=metric&appid=${API}`)
    .then(response => response.json()).then(json => {
        
        if(json.cod == "404"){
            OpenErrorBox();
            errorPanel.style.opacity = "1";
            contentSelector.style.opacity = "0";
            return;
        }

        OpenInfoBox();
        if(!isOpened){
            contentSelector.style.opacity = '1';
            cityText.innerHTML = document.getElementById("searchInput").value;
            ShowTheWeather(json);
            isOpened = true;
        }
        else{
            contentSelector.style.opacity = '0';
            setTimeout(()=>{
                ShowTheWeather(json);
                contentSelector.style.opacity = '1';
                cityText.innerHTML = document.getElementById("searchInput").value;
            }, 150)
        }

            
        errorPanel.style.opacity = "0";



    });
}

function ShowTheWeather(json){
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

    temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    desc.innerHTML = `${json.weather[0].description}`;
}

function OpenInfoBox(){
    const width = getComputedStyle(boxSelector).getPropertyValue("--weather-info-width");
    const height = getComputedStyle(boxSelector).getPropertyValue("--weather-info-height");

    OpenBox(new BoxState(width, height))
}

function OpenErrorBox(){
    const width = getComputedStyle(boxSelector).getPropertyValue("--error-box-width");
    const height = getComputedStyle(boxSelector).getPropertyValue("--error-box-height");

    OpenBox(new BoxState(width, height))
}

function OpenBox(state){
    searchInput.style.height = '30px';
    boxSelector.style.height = state.height;
    boxSelector.style.width = state.width;
}   


class BoxState{

    constructor(width, height){
        this.height = height;
        this.width = width;
    }


}
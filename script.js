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
        alert("wpisz coś kurwa");
        return;
    }
        

    const API = 'c027370d3c86f74d371827244fbdffc3';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById("searchInput").value}&units=metric&appid=${API}`)
    .then(response => response.json()).then(json => {
        
        if(json.cod == "404"){
            OpenBox()
            errorPanel.style.opacity = "1";
            contentSelector.style.opacity = "0";
            return;
        }
            
        errorPanel.style.opacity = "0";
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

        if(!isOpened){
            OpenBox();
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
    });
}

function OpenBox(){
    searchInput.style.height = '30px';
    boxSelector.style.height = '450px';
    boxSelector.style.width = "400px"
}
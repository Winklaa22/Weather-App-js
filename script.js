var searchButton = document.querySelector(".search-btn");
var boxSelector = document.querySelector(".weather-box");
var contentSelector = document.querySelector(".content")
var cityText = document.getElementById("cityText");
searchButton.addEventListener('click', function() {
    boxSelector.style.height = '500px';
    contentSelector.style.opacity = '1';
    cityText.innerHTML = "In " + document.getElementById("searchInput").value;
  });
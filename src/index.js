function formatDate(today) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendesday",
    "Thursday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentDay = days[today.getDay()];
  let currentMonth = months[today.getMonth()];
  let currentDate = today.getDate();
  let currentHour = today.getHours();
  let currentMinute = today.getMinutes();

  let suffix = "th";

  let currentFullDate = `${currentDay}, ${currentMonth} ${currentDate}${suffix} ${currentHour}:${currentMinute}`;
  let theDate = document.querySelector("#date-current");
  theDate.innerHTML = currentFullDate;

  let daysOfTheWeekSelector = [
    document.querySelector("#day-1"),
    document.querySelector("#day-2"),
    document.querySelector("#day-3"),
    document.querySelector("#day-4"),
    document.querySelector("#day-5"),
  ];
  let daysOfTheWeekFormula = [
    days[today.getDay() + 1],
    days[today.getDay() + 2],
    days[today.getDay() + 3],
    days[today.getDay() + 4],
    days[today.getDay() + 5],
  ];
  daysOfTheWeekSelector[0].innerHTML = daysOfTheWeekFormula[0];
  daysOfTheWeekSelector[1].innerHTML = daysOfTheWeekFormula[1];
  daysOfTheWeekSelector[2].innerHTML = daysOfTheWeekFormula[2];
  daysOfTheWeekSelector[3].innerHTML = daysOfTheWeekFormula[3];
  daysOfTheWeekSelector[4].innerHTML = daysOfTheWeekFormula[4];
}
function citySubmit(submission) {
  submission.preventDefault();
  let city = document.querySelector("#city-input");
  getCurrentWeather(city.value);
}
function fahrenheitClick(submission) {
  submission.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let unit = document.querySelector("#unit");
  unit.innerHTML = "°F";
  currentTemp.innerHTML = "77";
  let day1Temp = document.querySelector("#day1-temp");
  day1Temp.innerHTML = "75";
  let day2Temp = document.querySelector("#day2-temp");
  day2Temp.innerHTML = "73";
  let day3Temp = document.querySelector("#day3-temp");
  day3Temp.innerHTML = "81";
  let day4Temp = document.querySelector("#day4-temp");
  day4Temp.innerHTML = "79";
  let day5Temp = document.querySelector("#day5-temp");
  day5Temp.innerHTML = "81";
}
function celsiusClick(submission) {
  submission.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let unit = document.querySelector("#unit");
  unit.innerHTML = "°C";
  currentTemp.innerHTML = "25";
  let day1Temp = document.querySelector("#day1-temp");
  day1Temp.innerHTML = "24";
  let day2Temp = document.querySelector("#day2-temp");
  day2Temp.innerHTML = "23";
  let day3Temp = document.querySelector("#day3-temp");
  day3Temp.innerHTML = "27";
  let day4Temp = document.querySelector("#day4-temp");
  day4Temp.innerHTML = "26";
  let day5Temp = document.querySelector("#day5-temp");
  day5Temp.innerHTML = "27";
}
function showCurrentWeather(response) {
  let actualTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = actualTemp;
  let countryDisplay = document.querySelector("#country-display");
  let country = response.data.sys.country;
  countryDisplay.innerHTML = country;
  let currentCity = response.data.name;
  let cityDisplay = document.querySelector(`#city-display`);
  cityDisplay.innerHTML = `${currentCity},`;
}
function getCurrentWeather(city) {
  let apiKey = "51dc908a44a3dcbe0039c2e96edff729";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  axios
    .get(`${apiUrl}&appid=${apiKey}&q=${city}&units=${unit}`)
    .then(showCurrentWeather);
}
function getGeoCity() {
  navigator.geolocation.getCurrentPosition(getGeoCurrentWeather);
}
function getGeoCurrentWeather(response) {
  let apiKey = "51dc908a44a3dcbe0039c2e96edff729";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  let longitude = response.coords.longitude;
  let latitude = response.coords.latitude;
  axios
    .get(
      `${apiUrl}&appid=${apiKey}&lon=${longitude}&lat=${latitude}&units=${unit}`
    )
    .then(showCurrentWeather);
}

formatDate(new Date());
let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", citySubmit);
let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
celsiusLink.addEventListener("click", celsiusClick);
fahrenheitLink.addEventListener("click", fahrenheitClick);

let currentLocationButton = document.querySelector("#geo-current-weather");
currentLocationButton.addEventListener("click", getGeoCity);

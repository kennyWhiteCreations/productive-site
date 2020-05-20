import "core-js/features/promise";
import "regenerator-runtime/runtime";
window.addEventListener("load", () => {
  let lat;
  let long;

  let locationTimezone = document.getElementById("location-timezone");
  let headingTemp = document.getElementById("temperature");
  let headingSummary = document.getElementById("summary");
  let lastUpdated = document.getElementById("last-updated");
  let highTemp = document.getElementsByClassName("high-temp");
  let lowTemp = document.getElementsByClassName("low-temp");
  const degree = "&#xb0";
  const percent = "&#65130";
  let dailySummary = document.getElementsByClassName("daily-summary");

  let dailyOne = document.getElementById("daily-1");
  let dailyTwo = document.getElementById("daily-2");
  let dailyThree = document.getElementById("daily-3");
  let dailyFour = document.getElementById("daily-4");
  let dailyFive = document.getElementById("daily-5");
  let dailySix = document.getElementById("daily-6");
  let dailySeven = document.getElementById("daily-7");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;

      let api = `${proxy}https://api.darksky.net/forecast/b051642d3f71f99e1303961e169087a5/${lat},${long}`;

      async function getWeather() {
        const response = await fetch(api);
        const weatherData = await response.json();
        const { temperature, summary, icon } = weatherData.currently;

        locationTimezone.textContent = `${weatherData.timezone}`;
        headingTemp.innerHTML = `${Math.round(temperature)}${degree}`;
        headingSummary.textContent = `${summary}`;
        lastUpdated.innerHTML = `${fullTime()}`;

        function changeHeadingIcon() {
          let iconImg = document.getElementById("icon");
          let rawDate = new Date();
          let hour = rawDate.getHours();
          if (icon === "clear-day") {
            iconImg.src = "images/sunny.svg";
          } else if (icon === "clear-night") {
            iconImg.src = "images/clear_night.svg";
          } else if (icon === "rain") {
            iconImg.src = "images/rainy.svg";
          } else if (icon === "snow") {
            iconImg.src = "images/snow.svg";
          } else if (icon === "wind") {
            iconImg.src = "images/wind.svg";
          } else if (icon === "clear-night") {
            iconImg.src = "images/clear_night.svg";
          } else if (icon === "cloudy" || icon === "partly-cloudy-day") {
            iconImg.src = "images/cloudy.svg";
          } else if (
            icon === "partly-cloudy-night" ||
            (icon === "cloudy" && hour < 18) ||
            (icon === "cloudy" && hour < 5)
          ) {
            iconImg.src = "images/cloudy_night.svg";
          }
        }

        let {
          apparentTemperatureMax,
          apparentTemperatureMin,
        } = weatherData.daily.data;
        // output high temperatures
        highTempNumber(0, 0);
        highTempNumber(1, 1);
        highTempNumber(2, 2);
        highTempNumber(3, 3);
        highTempNumber(4, 4);
        highTempNumber(5, 5);
        highTempNumber(6, 6);

        // output low temperatures
        lowTempNumber(0, 0);
        lowTempNumber(1, 1);
        lowTempNumber(2, 2);
        lowTempNumber(3, 3);
        lowTempNumber(4, 4);
        lowTempNumber(5, 5);
        lowTempNumber(6, 6);

        function highTempNumber(tempIndex, dataIndex) {
          return (highTemp[tempIndex].innerHTML = `${Math.round(
            weatherData.daily.data[dataIndex].apparentTemperatureMax
          )}${degree}`);
        }

        function lowTempNumber(tempIndex, dataIndex) {
          return (lowTemp[tempIndex].innerHTML = `${Math.round(
            weatherData.daily.data[dataIndex].apparentTemperatureMin
          )}${degree}`);
        }

        function dailySummaryOutput() {
          dailySummary[0].textContent = weatherData.daily.data[0].summary;
          dailySummary[1].textContent = weatherData.daily.data[1].summary;
          dailySummary[2].textContent = weatherData.daily.data[2].summary;
          dailySummary[3].textContent = weatherData.daily.data[3].summary;
          dailySummary[4].textContent = weatherData.daily.data[4].summary;
          dailySummary[5].textContent = weatherData.daily.data[5].summary;
          dailySummary[6].textContent = weatherData.daily.data[6].summary;
        }

        function displayHourlyIcon() {
          let hourlyIcon = document.getElementsByClassName("hourly-icon");
          hourlyIcon[0].textContent = `${weatherData.hourly.data[0].icon.replace(
            /\-+/gm,
            " "
          )}`;
          hourlyIcon[1].textContent = `${weatherData.hourly.data[1].icon.replace(
            /\-+/gm,
            " "
          )}`;
          hourlyIcon[2].textContent = `${weatherData.hourly.data[2].icon.replace(
            /\-+/gm,
            " "
          )}`;
          hourlyIcon[3].textContent = `${weatherData.hourly.data[3].icon.replace(
            /\-+/gm,
            " "
          )}`;
          hourlyIcon[4].textContent = `${weatherData.hourly.data[4].icon.replace(
            /\-+/gm,
            " "
          )}`;
          hourlyIcon[5].textContent = `${weatherData.hourly.data[5].icon.replace(
            /\-+/gm,
            " "
          )}`;
          hourlyIcon[6].textContent = `${weatherData.hourly.data[6].icon.replace(
            /\-+/gm,
            " "
          )}`;
        }

        function displayHourlyTemperture() {
          let hourlyTemp = document.getElementsByClassName("hourly-temp");
          hourlyTemp[0].innerHTML = `${Math.round(
            weatherData.hourly.data[0].temperature
          )}${degree}`;
          hourlyTemp[1].innerHTML = `${Math.round(
            weatherData.hourly.data[1].temperature
          )}${degree}`;
          hourlyTemp[2].innerHTML = `${Math.round(
            weatherData.hourly.data[2].temperature
          )}${degree}`;
          hourlyTemp[3].innerHTML = `${Math.round(
            weatherData.hourly.data[3].temperature
          )}${degree}`;
          hourlyTemp[4].innerHTML = `${Math.round(
            weatherData.hourly.data[4].temperature
          )}${degree}`;
          hourlyTemp[5].innerHTML = `${Math.round(
            weatherData.hourly.data[5].temperature
          )}${degree}`;
          hourlyTemp[6].innerHTML = `${Math.round(
            weatherData.hourly.data[6].temperature
          )}${degree}`;
        }

        function displayPrecipProbability() {
          let precipText = document.getElementsByClassName("precip-text");
          precipText[0].innerHTML = `${Math.round(
            weatherData.hourly.data[0].precipProbability
          )}${percent}`;
          precipText[1].innerHTML = `${Math.round(
            weatherData.hourly.data[1].precipProbability
          )}${percent}`;
          precipText[2].innerHTML = `${Math.round(
            weatherData.hourly.data[2].precipProbability
          )}${percent}`;
          precipText[3].innerHTML = `${Math.round(
            weatherData.hourly.data[3].precipProbability
          )}${percent}`;
          precipText[4].innerHTML = `${Math.round(
            weatherData.hourly.data[4].precipProbability
          )}${percent}`;
          precipText[5].innerHTML = `${Math.round(
            weatherData.hourly.data[5].precipProbability
          )}${percent}`;
          precipText[6].innerHTML = `${Math.round(
            weatherData.hourly.data[6].precipProbability
          )}${percent}`;
        }

        function displayWindSpeed() {
          let windMph = document.getElementsByClassName("wind-mph");

          windMph[0].innerHTML = `${Math.round(
            weatherData.hourly.data[0].windSpeed
          )}mph`;
          windMph[1].innerHTML = `${Math.round(
            weatherData.hourly.data[1].windSpeed
          )}mph`;
          windMph[2].innerHTML = `${Math.round(
            weatherData.hourly.data[2].windSpeed
          )}mph`;
          windMph[3].innerHTML = `${Math.round(
            weatherData.hourly.data[3].windSpeed
          )}mph`;
          windMph[4].innerHTML = `${Math.round(
            weatherData.hourly.data[4].windSpeed
          )}mph`;
          windMph[5].innerHTML = `${Math.round(
            weatherData.hourly.data[5].windSpeed
          )}mph`;
          windMph[6].innerHTML = `${Math.round(
            weatherData.hourly.data[6].windSpeed
          )}mph`;
        }

        function displayHours() {
          let hourElement = document.getElementsByClassName("hour");
          let rawDate = new Date();
          let hours = rawDate.getHours();
          const tweleveHourFormatString = [
            "12 AM",
            "1 AM",
            "2 AM",
            "3 AM",
            "4 AM",
            "5 AM",
            "6 AM",
            "7 AM",
            "8 AM",
            "9 AM",
            "10 AM",
            "11 AM",
            "12 PM",
            "1 PM",
            "2 PM",
            "3 PM",
            "4 PM",
            "5 PM",
            "6 PM",
            "7 PM",
            "8 PM",
            "9 PM",
            "10 PM",
            "11 PM",
          ];

          let timeSlots = [];
          for (let i = 0; i < hours + 24; i++) {
            timeSlots.push(tweleveHourFormatString[i % 24]);
          }

          hourElement[0].textContent = `${timeSlots[hours]}`;
          hourElement[1].textContent = `${timeSlots[hours + 1]}`;
          hourElement[2].textContent = `${timeSlots[hours + 2]}`;
          hourElement[3].textContent = `${timeSlots[hours + 3]}`;
          hourElement[4].textContent = `${timeSlots[hours + 4]}`;
          hourElement[5].textContent = `${timeSlots[hours + 5]}`;
          hourElement[6].textContent = `${timeSlots[hours + 6]}`;
        }

        function changeBackground() {
          let rawDate = new Date();
          let hours = rawDate.getHours();
          const morningGradient = "linear-gradient(#c00f1fe3, #f0b96d)";
          const afternoonGradient = "linear-gradient(#6190E8, #A7BFE8)";
          const nightGradient = "linear-gradient(#021f40, #4d4094)";
          if (hours <= 5) {
            document.body.style.background = nightGradient;
          } else if (hours > 5 && hours < 11) {
            document.body.style.background = morningGradient;
          } else if (hours > 11 && hours < 20) {
            document.body.style.background = afternoonGradient;
          } else {
            document.body.style.background = nightGradient;
          }
        }
        changeHeadingIcon();
        changeBackground();
        displayHours();
        displayWindSpeed();
        displayPrecipProbability();
        displayHourlyTemperture();
        displayHourlyIcon();
        days();
        dates();
        dailySummaryOutput();
      }
      getWeather();
    });
  }
});

function fullTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();

  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  const showAmPm = true;

  function addZero(n) {
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
  }

  return `${hour}<span>:</span>${addZero(min)}&nbsp${showAmPm ? amPm : ""}`;
}

function days() {
  let dayOne = document.getElementById("day-1");
  let dayTwo = document.getElementById("day-2");
  let dayThree = document.getElementById("day-3");
  let dayFour = document.getElementById("day-4");
  let dayFive = document.getElementById("day-5");
  let daySix = document.getElementById("day-6");
  let daySeven = document.getElementById("day-7");
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const rawDate = new Date();
  const dayNum = rawDate.getDay();
  const week = [];
  for (let i = 0; i < dayNum + 7; i++) {
    week.push(dayNames[i % 7]);
  }
  dayOne.textContent = `${week[dayNum]}`;
  dayTwo.textContent = `${week[dayNum + 1]}`;
  dayThree.textContent = `${week[dayNum + 2]}`;
  dayFour.textContent = `${week[dayNum + 3]}`;
  dayFive.textContent = `${week[dayNum + 4]}`;
  daySix.textContent = `${week[dayNum + 5]}`;
  daySeven.textContent = `${week[dayNum + 6]}`;
}

function dates() {
  let dateOne = document.getElementById("date-1");
  let dateTwo = document.getElementById("date-2");
  let dateThree = document.getElementById("date-3");
  let dateFour = document.getElementById("date-4");
  let dateFive = document.getElementById("date-5");
  let dateSix = document.getElementById("date-6");
  let dateSeven = document.getElementById("date-7");
  const thirtyOneDates = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  let rawDate = new Date();
  const date = rawDate.getDate();
  const month = rawDate.getMonth();
  let emptyDates = [];

  if (month === 3 || month === 5 || month === 8 || month === 10) {
    emptyDates.splice(30, 1);
    for (let i = 0; i < date + 30; i++) {
      emptyDates.push(thirtyOneDates[i % 30]);
    }
  } else if (month === 1) {
    emptyDates.splice(30, 1);
    emptyDates.splice(29, 1);
    emptyDates.splice(28, 1);
    for (let i = 0; i < date + 28; i++) {
      emptyDates.push(thirtyOneDates[i % 28]);
    }
  } else {
    for (let i = 0; i < date + 31; i++) {
      emptyDates.push(thirtyOneDates[i % 31]);
    }
  }

  dateOne.textContent = `${emptyDates[date - 1]}`;
  dateTwo.textContent = `${emptyDates[date]}`;
  dateThree.textContent = `${emptyDates[date + 1]}`;
  dateFour.textContent = `${emptyDates[date + 2]}`;
  dateFive.textContent = `${emptyDates[date + 3]}`;
  dateSix.textContent = `${emptyDates[date + 4]}`;
  dateSeven.textContent = `${emptyDates[date + 5]}`;
}

function openNav() {
  document
    .getElementById("navbar")
    .classList.replace("navbar-closed", "navbar-open");
  document.getElementById("hamburger-menu").style.width = "0";
  document.getElementById("hamburger-menu").style.opacity = "0";
  document.getElementById("hamburger-menu").style.height = "0";
}
document.getElementById("hamburger-menu").addEventListener("click", openNav);

function closeNav() {
  document
    .getElementById("navbar")
    .classList.replace("navbar-open", "navbar-closed");
  document.getElementById("hamburger-menu").style.width = "10vh";
  document.getElementById("hamburger-menu").style.opacity = "1";
  document.getElementById("hamburger-menu").style.height = "5vh";
}
document.getElementById("menu-close-btn").addEventListener("click", closeNav);

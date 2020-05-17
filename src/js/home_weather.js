window.addEventListener("load", () => {
  let lat;
  let long;
  let centerContain = document.querySelector(".center-container");
  const degree = "&#xb0";
  let rawDate = new Date();
  let hour = rawDate.getHours();

  let title = document.getElementById("title"),
    time = document.getElementById("time"),
    greeting = document.getElementById("greeting"),
    name = document.getElementById("name"),
    focusQuestion = document.getElementById("focus-header"),
    focus = document.getElementById("focus");

  let weatherBox = document.getElementsByClassName("weather")[0];
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature");
  let weatherSummary = document.querySelector(".weather-summary");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      const proxy = "http://cors-anywhere.herokuapp.com/";

      const api = `${proxy}https://api.darksky.net/forecast/b051642d3f71f99e1303961e169087a5/${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature, icon } = data.currently;
          locationTimezone.textContent = `${data.timezone}`;
          temperatureDegree.innerHTML = `${Math.round(temperature)}${degree}`;
          weatherSummary.textContent = `${icon.replace(/\-+/gm, " ")}`;

          if (icon == "clear-day") {
            document.body.style.backgroundImage =
              'URL("images/sunny_fall_compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.color = "#111";
            centerContain.style.color = "#fff";
            return true;
          } else if (icon == "clear-night") {
            document.body.style.backgroundImage =
              'URL("images/clear-night-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            centerContain.style.color = "white";
            weatherBox.style.color = "white";
            weatherBox.style.borderColor = "none";

            return true;
          } else if (icon == "partly-cloudy-night") {
            document.body.style.backgroundImage =
              'URL("images/cloudy-night-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            locationTimezone.style.color = "white";
            temperatureDegree.style.color = "white";
            weatherSummary.style.color = "white";
          } else if (icon == "cloudy" || icon == "partly-cloudy-day") {
            document.body.style.backgroundImage =
              'url("images/overcast_mountain_compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            weatherBox.style.color = "#fff";
            locationTimezone.style.color = "#fff";
            time.style.color = "#777";
            greeting.style.color = "#fff";
            name.style.color = "#fff";
            focus.style.color = "#fff";
            focusQuestion.style.color = "#fff";
            return true;
          } else if (icon == "rain") {
            document.body.style.backgroundImage =
              'url("images/rain-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            locationTimezone.style.color = "#fff";
            weatherBox.style.color = " #fff";
            return true;
          } else if (icon == "wind") {
            document.body.style.backgroundImage =
              'url("images/wind-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            locationTimezone.style.color = "black";
            return true;
          } else if (icon == "snow") {
            document.body.style.backgroundImage =
              'url("images/snow-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            locationTimezone.style.color = "black";
            focus.style.color = "#fff";
            focusQuestion.style.color = "#fff";
            return true;
          } else if (
            (icon == "rain" && hour >= 19 && hour <= 23) ||
            (icon == "rain" && hour >= 0 && hour <= 6)
          ) {
            document.body.style.backgroundImage =
              'url("images/rain-night-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            locationTimezone.style.color = "black";
            focus.style.color = "#fff";
            focusQuestion.style.color = "#fff";
            return true;
          } else if (
            (icon == "snow" && hour >= 19 && hour <= 23) ||
            (icon == "snow" && hour >= 0 && hour <= 6)
          ) {
            document.body.style.backgroundImage =
              'url("images/snow-night-compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            locationTimezone.style.color = "#fff";
            weatherBox.style.color = "#fff";
            focus.style.color = "#fff";
            focusQuestion.style.color = "#fff";
            return true;
          } else {
            document.body.style.backgroundImage =
              'url("file:///C:/Users/kenny/OneDrive/Documents/productive_app/images/lion_else_compressed.jpg")';
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            return true;
          }
        });
    });
  }
});

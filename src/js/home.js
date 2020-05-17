const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  name = document.getElementById("name"),
  focus = document.getElementById("focus"),
  weather = document.getElementsByClassName("weather");

const showAmPm = true;

showTime = () => {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  const amPm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ""}`;

  setTimeout(showTime, 1000);
};

addZero = (n) => {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
};

setBgGreet = () => {
  let today = new Date();
  hour = today.getHours();
  if (hour < 12) {
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    greeting.textContent = "Good Afternoon";
  } else {
    greeting.textContent = "Good Evening";
  }
};

getName = () => {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Enter Name]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
};

getFocus = () => {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
};

setName = (e) => {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
      removeName();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
    removeName();
  }
};

setFocus = (e) => {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
      removeFocus();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
    removeFocus();
  }
};

removeName = () => {
  if (name.textContent === "") {
    localStorage.removeItem("name");
    name.textContent = "[Enter Name]";
  }
};

removeFocus = () => {
  if (focus.textContent === "") {
    localStorage.removeItem("focus");
    name.textContent = "[Enter Focus]";
  }
};

openNav = () => {
  document
    .getElementById("navbar")
    .classList.replace("navbar-closed", "navbar-open");
  document.getElementById("hamburger-menu").style.width = "0";
  document.getElementById("hamburger-menu").style.opacity = "0";
  document.getElementById("hamburger-menu").style.height = "0";
  return false;
};

closeNav = () => {
  document
    .getElementById("navbar")
    .classList.replace("navbar-open", "navbar-closed");
  document.getElementById("hamburger-menu").style.width = "10vh";
  document.getElementById("hamburger-menu").style.opacity = "1";
  document.getElementById("hamburger-menu").style.height = "5vh";
  return false;
};

name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

showTime();
setBgGreet();
getName();
getFocus();
removeName();
removeFocus();

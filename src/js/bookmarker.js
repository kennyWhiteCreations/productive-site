document.querySelector("[data-form]").addEventListener("submit", saveBookmarks);

function saveBookmarks(e) {
  var siteName = document.getElementById("site-name").value;
  var siteUrl = "https://" + document.getElementById("site-url").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.querySelector("[data-form]").reset();

  getBookmarks();

  e.preventDefault();
}



function getBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarkResults = document.querySelector("[data-bookmarks-results]");
  bookmarkResults.innerHTML = "";


  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML = '<div class="well">' +
      '<h3 class ="website-heading">' +
      '<p class="website-name">' +
      name +
      "</p>" +
      ' <a class=" btn btn-success" target = "_blank" href ="' +
      url +
      '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" id ="deleteBtn" href ="#">Delete</a> '
    "</h3>" + "</div>";

  }

}
/* onclick="${deleteBookmark`${url}`}" */
/* function removeBookmark() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bookmarkResults = document.querySelector("[data-bookmarks-results]");
  for (var i = 0; i < bookmarks.length; i++)
    var url = bookmarks[i].url;
  deleteBookmark(url);
  getBookmarks();
  return bookmarkResults;
} */
/* document.body.addEventListener("load", getBookmarks()); */

window.deleteBookmark = function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  getBookmarks();
}


function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("please fill in this field");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var urlRegex = new RegExp(expression);

  if (!siteUrl.match(urlRegex)) {
    alert("please use a valid url");
    return false;
  }
  return true;
}

function changeJumbotronBackground() {
  let jumboheading = document.getElementById("jumbo-heading");
  let submitBtn = document.getElementById("submit-btn");
  let topHeading = document.getElementsByClassName("top-heading")[0];
  let jumbotron = document.querySelector("[data-jumbotron]");
  let form = document.getElementById("form");
  let inputLabels = document.getElementsByClassName("input-labels");
  let rawDate = new Date();
  let hours = rawDate.getHours();
  const morningGradient = "linear-gradient(#FF5F6D, #FFC371)";
  const afternoonGradient = "linear-gradient(#6190E8, #A7BFE8)";
  const nightGradient = "linear-gradient(#021f40, #4d4094)";

  function morningStyles() {
    jumboheading.style.background = morningGradient;
    submitBtn.style.backgroundColor = "#FF5F6D";
    topHeading.style.color = "#FF5F6D";
    jumbotron.style.backgroundColor = "wheat";
    form.style.backgroundColor = "wheat";
    inputLabels[0].style.color = "#FF5F6D";
    inputLabels[1].style.color = "#FF5F6D";
  }

  function nightStyles() {
    jumboheading.style.background = nightGradient;
    submitBtn.style.backgroundColor = "#4d4094";
    topHeading.style.color = "#021f40";
    jumbotron.style.backgroundColor = "#eee";
    form.style.backgroundColor = "#eee";
    inputLabels[0].style.color = "#4d4094";
    inputLabels[1].style.color = "#4d4094";
  }

  function afternoonStyles() {
    jumboheading.style.background = afternoonGradient;
    submitBtn.style.backgroundColor = "#6190E8";
    topHeading.style.color = "#6190E8";
    jumbotron.style.backgroundColor = "#eee";
    form.style.backgroundColor = " #eee";
    inputLabels[0].style.color = "#6190E8";
    inputLabels[1].style.color = "#6190E8";
  }

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

  if (hours <= 5) {
    nightStyles();
  } else if (hours > 5 && hours < 11) {
    morningStyles();
  } else if (hours >= 11 && hours < 20) {
    afternoonStyles();
  } else {
    nightStyles();
  }
}

changeJumbotronBackground();

getBookmarks();
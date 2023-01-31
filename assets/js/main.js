// ---------------
// Page transition
// ---------------

// Add 'current-page' class to the body element
setTimeout(function() {
  document.body.classList.add('current-page');
}, 100);

// Add click event listener to all anchor elements
document.querySelectorAll('a').forEach(function(anchor) {
  // Check if the anchor link is an internal link
  if (anchor.href.startsWith(location.origin)) {
    anchor.addEventListener('click', function(e) {
      // prevent default link behavior
      e.preventDefault();
      // Fade out current page
      setTimeout(function() {
        document.body.classList.add('fade-out');
        // remove the current-page class from the current page
        document.querySelector('.current-page').classList.remove('current-page');
      }, 200);      
      // Wait for the fade out animation to finish
      setTimeout(function() {
        // Navigate to new page
        window.location.href = anchor.href;
      }, 700);
    });
  }
});

// ----------------
// Dark-mode toggle
// ----------------

const themeSwitcher = document.querySelector(".switcher");

let currentTheme = localStorage.getItem("theme");

if (currentTheme === null) {
  localStorage.setItem("theme", "light");
}

if (currentTheme === "dark") {
  document.body.querySelectorAll("[data-theme]").forEach(el => {
    el.setAttribute("data-theme", "light");
  });
  themeSwitcher.firstChild.textContent = "Turn off dark-mode";
}

document.documentElement.setAttribute("data-theme", currentTheme);

const toggleTheme = () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeSwitcher.firstChild.textContent = currentTheme === "light" ? "Turn on dark-mode" : "Turn off dark-mode";
  localStorage.setItem("theme", currentTheme);
  document.body.querySelectorAll("[data-theme]").forEach(el => {
    el.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light")
  });
  setTimeout(() => {themeSwitcher.blur();
  }, 500);
};

themeSwitcher.addEventListener("click", toggleTheme);

document.querySelector("button").addEventListener("touchstart", function(){
  this.blur();
});

// --------------------
// Hide/show navigation
// --------------------

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("nav")) {
    var navigation = document.getElementById("nav");
    var prevScrollpos = window.pageYOffset;
    var offset = 100;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos && currentScrollPos > offset) {
        navigation.classList.remove("hidden");
      } else if (currentScrollPos > offset) {
        navigation.classList.add("hidden");
      }
      prevScrollpos = currentScrollPos;
    };
  }
});
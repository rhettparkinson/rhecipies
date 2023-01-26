document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("navigation")) {
    var navigation = document.getElementById("navigation");
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

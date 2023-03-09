if (document.getElementById("nav")) {
  const navigation = document.getElementById("nav");
  const offsetDown = 160;
  const offsetUp = 80;
  let prevScrollpos = window.pageYOffset;
  let distanceScrolled = 0;
  let userScrolling = false; // flag to track whether user is scrolling

  // Add event listeners for user scrolling behavior
  window.addEventListener("scroll", function () {
    userScrolling = true;
  });

  window.addEventListener("touchstart", function () {
    userScrolling = true;
  });

  window.addEventListener("touchmove", function () {
    userScrolling = true;
  });

  window.addEventListener("touchend", function () {
    userScrolling = false;
  });

  window.addEventListener("mousewheel", function () {
    userScrolling = true;
  });

  window.addEventListener("resize", function () {
    if (!userScrolling) { // only hide/show navbar if user is not scrolling
      navigation.classList.remove("hidden");
    }
  });

  window.setInterval(function () {
    if (userScrolling) {
      var currentScrollPos = window.pageYOffset;

      if (currentScrollPos < prevScrollpos) {
        // If scrolling up, add the distance scrolled
        distanceScrolled += prevScrollpos - currentScrollPos;
      } else {
        // If scrolling down, reset the distance scrolled
        distanceScrolled = 0;
      }

      if (currentScrollPos > prevScrollpos && currentScrollPos >= offsetDown) {
        // If scrolled down by the offset or more, hide the nav element
        navigation.classList.add("hidden");
      } else if (currentScrollPos < prevScrollpos && distanceScrolled >= offsetUp) {
        // If scrolled up by the offset or more, show the nav element
        navigation.classList.remove("hidden");
      }

      prevScrollpos = currentScrollPos;
    }
  }, 100); // Check every 100ms for user scrolling behavior
}


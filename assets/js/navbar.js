if (document.getElementById("nav")) {
  const offsetDown = 360;
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
      document.body.classList.remove("nav--hidden");
    }
  });

  // Define a function to update the navbar based on scrolling behavior
  function updateNavbar() {
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
        document.body.classList.add("nav--hidden");
      } else if (currentScrollPos < prevScrollpos && distanceScrolled >= offsetUp) {
        // If scrolled up by the offset or more, show the nav element
        document.body.classList.remove("nav--hidden");
      }

      prevScrollpos = currentScrollPos;
    }

    // Schedule the function to run again before the next repaint
    window.requestAnimationFrame(updateNavbar);
  }

  // Start the animation loop
  updateNavbar();
}

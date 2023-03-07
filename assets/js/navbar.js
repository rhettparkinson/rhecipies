if (document.getElementById("nav")) {
  const navigation = document.getElementById("nav");
  const offsetDown = 160;
  const offsetUp = 80;  
  let prevScrollpos = window.pageYOffset;
  let distanceScrolled = 0;

  window.onscroll = function () {
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
  };

  window.addEventListener("resize", function () {
    navigation.classList.remove("hidden");
  });
}

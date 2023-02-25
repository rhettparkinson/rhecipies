document.addEventListener("DOMContentLoaded", function () {

  // ---------------
  // Page transition
  // ---------------

  // Add 'current-page' class to the body element
  setTimeout(function() {
    document.body.classList.add('current-page');
    // Trigger card animations
    document.querySelectorAll('.card').forEach(function(card, index) {
      setTimeout(function() {
        card.classList.add('animate');
      }, index * 100); // Stagger the animations by 100ms
    });
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
  }, {passive: true});

  // ----------------
  // Hide/show navbar
  // ----------------

  if (document.getElementById("nav")) {
    var navigation = document.getElementById("nav");
    var prevScrollpos = window.pageYOffset;
    var offset = 160;

    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos && currentScrollPos > offset) {
        navigation.classList.remove("hidden");
      } else if (currentScrollPos > offset) {
        navigation.classList.add("hidden");
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("resize", function() {
      navigation.classList.remove("hidden");
    });
  }
});

/*
* Modal
*
* Pico.css - https://picocss.com
* Copyright 2019-2023 - Licensed under MIT
*/

// Config
const isOpenClass = 'modal-is-open';
const openingClass = 'modal-is-opening';
const closingClass = 'modal-is-closing';
const animationDuration = 400; // ms
let visibleModal = null;


// Toggle modal
const toggleModal = event => {
  event.preventDefault();
  const modal = document.getElementById(event.currentTarget.getAttribute('data-target'));
  (typeof(modal) != 'undefined' && modal != null)
    && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
}

// Is modal open
const isModalOpen = modal => {
  return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
}

// Open modal
const openModal = modal => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute('open', true);
}

// Close modal
const closeModal = modal => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty('--scrollbar-width');
    modal.removeAttribute('open');
  }, animationDuration);
}

// Close with a click outside
document.addEventListener('click', event => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector('article');
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {

  // Creating invisible container
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
}
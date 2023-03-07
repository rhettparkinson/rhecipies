// ----------------
// Dark-mode toggle
// ----------------

const themeSwitcher = document.querySelector(".switcher");
let currentTheme = localStorage.getItem("theme");

if (currentTheme === null) {
  localStorage.setItem("theme", "light");
}

if (currentTheme === "dark") {
  document.body.querySelectorAll("[data-theme]").forEach((el) => {
    el.setAttribute("data-theme", "light");
  });
  themeSwitcher.firstChild.textContent = "Turn off dark-mode";
}

document.documentElement.setAttribute("data-theme", currentTheme);

const toggleTheme = () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeSwitcher.firstChild.textContent =
    currentTheme === "light" ? "Turn on dark-mode" : "Turn off dark-mode";
  localStorage.setItem("theme", currentTheme);
  document.body.querySelectorAll("[data-theme]").forEach((el) => {
    el.setAttribute(
      "data-theme",
      currentTheme === "light" ? "dark" : "light"
    );
  });
  themeSwitcher.classList.toggle("rotate");
};

themeSwitcher.addEventListener("click", toggleTheme);

document.querySelector("button").addEventListener(
  "touchend",
  function () {
    this.blur();
  },
  { passive: true }
);

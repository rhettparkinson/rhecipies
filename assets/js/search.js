// ----------------------------
// Initialize the search plugin
// ----------------------------

console.log("Initializing search...");
// Initialize the search plugin
var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById("search-input"),
  resultsContainer: document.getElementById("search-results"),
  json: "/search.json",
  searchResultTemplate:
    '<div class="card"><a href="{url}" x-data="{ shown: false }" x-intersect.once="shown = true" :style="\'visibility: \' + (shown ? \'visible\' : \'hidden\')"><article class="card__content" :class="{ \'fadeInUp\': shown }"><header class="card__header"><div class="card__meta"><div class="pills"><span>{cuisine}</span><span>{tags}</div></div><div class="card__title"><h2>{title}</h2></div></header><div class="card__content"><p>{desc}</p></div></article></a></div>',
});

document.getElementById("search-input").focus();

function animateSearchResults() {
  var cards = document.querySelectorAll(".card");
  var delay = 0;
  cards.forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add("animate");
    }, index * 100); // Stagger the animations by 100ms
  });
}

document
  .getElementById("search-results")
  .addEventListener("DOMNodeInserted", animateSearchResults);

// Prevent form submission with the enter key
// https://github.com/christian-fei/Simple-Jekyll-Search/issues/21
document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

const formInput = document.querySelector("#search-form .form__input");
const formElements = document.querySelector("#search-form .form__elements");

window.addEventListener("scroll", () => {
  const formElementsRect = formElements.getBoundingClientRect();
  const formInputRect = formInput.getBoundingClientRect();
  const top = formInputRect.top - formElementsRect.top;
  if (!top <= 0) {
    formInput.classList.add("stuck");
  } else {
    formInput.classList.remove("stuck");
  }
});

// --------
// Babra.js
// --------

const defaultTransition = {
  name: "default-transition",
  leave(data) {
    return data.current.container.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 500,
      easing: "ease-in-out",
    }).finished;
  },
  enter(data) {
    const container = data.next.container;
    container.style.opacity = 0;
    container
      .animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        easing: "ease-in-out",
      })
      .finished.then(() => {
        container.style.opacity = 1;
      });
  },
};

barba.init({
  transitions: [defaultTransition],
  views: [{
    namespace: 'search',
    beforeEnter({ next }) {
        let script = document.createElement('script');
        script.src = '/assets/js/search.js';
        next.container.appendChild(script);
    }
  }]
});

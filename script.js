document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll (buttery)
  function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const ease = timeElapsed < duration / 2
        ? 4 * timeElapsed * timeElapsed * timeElapsed / (duration * duration * duration)
        : 1 - Math.pow(-2 * (timeElapsed / duration - 1), 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) smoothScroll(target, 900);
    });
  });

  // Buttons
  document.querySelector(".primary-btn").addEventListener("click", () => {
    alert("Feature coming soon 🚀");
  });

  document.querySelector(".secondary-btn").addEventListener("click", () => {
    window.open("https://github.com/dragonkidsnake13/UnknownCrypt", "_blank");
  });

  // Smooth reveal animation
  const elements = document.querySelectorAll(".hero-content, .card, .open-source, .about");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

});

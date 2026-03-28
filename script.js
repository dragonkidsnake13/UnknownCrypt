document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll for nav links
  document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Hero buttons
  const primaryBtn = document.querySelector(".primary-btn");
  const secondaryBtn = document.querySelector(".secondary-btn");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", () => {
      alert("Feature coming soon 🚀");
    });
  }

  if (secondaryBtn) {
    secondaryBtn.addEventListener("click", () => {
      window.open("https://github.com/", "_blank");
    });
  }

  // Scroll animation (fade-in)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".card, .hero-content, .open-source, .about").forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

});

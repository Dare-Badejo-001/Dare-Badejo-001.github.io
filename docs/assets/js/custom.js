/* ============================================
   Dare Badejo Portfolio - Custom Scripts v2
   ============================================ */

/* --- Scroll-in animation for cards --- */
function initCardAnimations() {
  var cards = document.querySelectorAll(
    ".home-card, .impact-card, .contact-card"
  );
  if (!cards.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  cards.forEach(function (card) {
    card.classList.remove("visible");
    observer.observe(card);
  });
}

/* --- Smooth anchor scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* --- Hero parallax-lite on scroll --- */
function initHeroParallax() {
  var hero = document.querySelector(".hero-section");
  if (!hero) return;

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var scroll = window.pageYOffset;
        if (scroll < 600) {
          hero.style.transform = "translateY(" + scroll * 0.15 + "px)";
          hero.style.opacity = Math.max(1 - scroll / 700, 0.3);
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Init on page load --- */
document.addEventListener("DOMContentLoaded", function () {
  initCardAnimations();
  initSmoothScroll();
  initHeroParallax();
});

/* --- Re-init on MkDocs Material instant navigation --- */
if (typeof document$ !== "undefined") {
  document$.subscribe(function () {
    initCardAnimations();
    initSmoothScroll();
    initHeroParallax();
  });
}

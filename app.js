/* ============================================
   SLIMSHEDDY MAKEUP ARTISTRY — app.js
   ============================================ */

(function () {
  "use strict";

  /* ---- PAGE LOADER ---- */
  const loader = document.getElementById("page-loader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) loader.classList.add("hidden");
    }, 1800);
  });

  /* ---- BACK TO TOP ---- */
  const backTop = document.getElementById("back-to-top");
  if (backTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backTop.classList.add("visible");
      } else {
        backTop.classList.remove("visible");
      }
    });
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- NAVBAR ---- */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
  }

  // Close mobile nav when link clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger && hamburger.classList.remove("open");
      navLinks && navLinks.classList.remove("open");
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /* ---- HERO SLIDER ---- */
  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.getElementById("sliderDots");
  let currentSlide = 0;
  let sliderInterval;

  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Slide " + (i + 1));
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    function goToSlide(n) {
      slides[currentSlide].classList.remove("active");
      dotsContainer.querySelectorAll(".slider-dot")[currentSlide].classList.remove("active");
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add("active");
      dotsContainer.querySelectorAll(".slider-dot")[currentSlide].classList.add("active");
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    sliderInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const heroSection = document.getElementById("home");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => clearInterval(sliderInterval));
      heroSection.addEventListener("mouseleave", () => {
        sliderInterval = setInterval(nextSlide, 5000);
      });
    }
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(".reveal-fade, .reveal-up, .reveal-left, .reveal-right");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("revealed"));
  }

  /* ---- COUNTER ANIMATION ---- */
  const statNums = document.querySelectorAll(".stat-num");

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statNums.forEach((el) => counterObserver.observe(el));
  }

  /* ---- FAQ ACCORDION ---- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (btn) {
      btn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        faqItems.forEach((f) => f.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    }
  });

  /* ---- REVIEWS SLIDER ---- */
  const reviewsSlider = document.getElementById("reviewsSlider");
  const reviewPrev = document.getElementById("reviewPrev");
  const reviewNext = document.getElementById("reviewNext");
  const reviewDotsContainer = document.getElementById("reviewDots");
  const reviewCards = document.querySelectorAll(".review-card");

  if (reviewsSlider && reviewCards.length > 0) {
    let currentReview = 0;
    const visibleCount = window.innerWidth < 768 ? 1 : window.innerWidth < 960 ? 2 : 3;
    const totalSlides = Math.ceil(reviewCards.length / visibleCount);

    // Build dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = "review-dot" + (i === 0 ? " active" : "");
      dot.addEventListener("click", () => goToReview(i));
      reviewDotsContainer.appendChild(dot);
    }

    function goToReview(n) {
      currentReview = (n + totalSlides) % totalSlides;
      const cardWidth = reviewCards[0].offsetWidth + 24;
      const offset = currentReview * cardWidth * visibleCount;
      reviewsSlider.style.transform = `translateX(-${offset}px)`;
      document.querySelectorAll(".review-dot").forEach((d, i) => {
        d.classList.toggle("active", i === currentReview);
      });
    }

    reviewPrev && reviewPrev.addEventListener("click", () => goToReview(currentReview - 1));
    reviewNext && reviewNext.addEventListener("click", () => goToReview(currentReview + 1));

    // Auto-slide reviews
    setInterval(() => goToReview(currentReview + 1), 6000);
  }

  /* ---- FOOTER YEAR ---- */
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  /* ---- LAZY LOADING FALLBACK ---- */
  if ("loading" in HTMLImageElement.prototype === false) {
    const lazyImgs = document.querySelectorAll("img[loading='lazy']");
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          imgObserver.unobserve(img);
        }
      });
    });
    lazyImgs.forEach((img) => imgObserver.observe(img));
  }
})();

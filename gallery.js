/* ============================================
   SLIMSHEDDY MAKEUP ARTISTRY — gallery.js
   Portfolio Filter + Image Modal
   ============================================ */

(function () {
  "use strict";

  /* ---- PORTFOLIO FILTER ---- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.classList.remove("filtered-out");
          item.style.animation = "none";
          setTimeout(() => {
            item.style.animation = "";
          }, 10);
        } else {
          item.classList.add("filtered-out");
        }
      });
    });
  });

  /* ---- IMAGE MODAL ---- */
  const imgModal = document.getElementById("imgModal");
  const imgModalImg = document.getElementById("imgModalImg");
  const imgModalCaption = document.getElementById("imgModalCaption");
  const imgModalClose = document.getElementById("imgModalClose");
  const imgModalBackdrop = document.getElementById("imgModalBackdrop");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  let currentModalIndex = 0;
  let modalImages = [];

  // Build the images list from visible portfolio items
  function buildModalImages() {
    modalImages = [];
    document.querySelectorAll(".portfolio-item:not(.filtered-out) .portfolio-view").forEach((btn) => {
      modalImages.push({
        src: btn.getAttribute("data-src"),
        caption: btn.getAttribute("data-caption"),
      });
    });
  }

  function openModal(index) {
    buildModalImages();
    if (modalImages.length === 0) return;
    currentModalIndex = Math.max(0, Math.min(index, modalImages.length - 1));
    updateModal();
    imgModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    imgModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function updateModal() {
    const item = modalImages[currentModalIndex];
    if (!item) return;
    imgModalImg.src = item.src;
    imgModalImg.alt = item.caption;
    imgModalCaption.textContent = item.caption;
  }

  function showPrev() {
    currentModalIndex = (currentModalIndex - 1 + modalImages.length) % modalImages.length;
    updateModal();
  }

  function showNext() {
    currentModalIndex = (currentModalIndex + 1) % modalImages.length;
    updateModal();
  }

  // Attach click events to all portfolio view buttons
  document.querySelectorAll(".portfolio-view").forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      buildModalImages();
      // Find the index in the current visible set
      const src = btn.getAttribute("data-src");
      const foundIndex = modalImages.findIndex((img) => img.src === src);
      openModal(foundIndex >= 0 ? foundIndex : 0);
    });
  });

  // Also make entire portfolio item clickable
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    item.addEventListener("click", () => {
      const viewBtn = item.querySelector(".portfolio-view");
      if (viewBtn) viewBtn.click();
    });
  });

  // Close events
  if (imgModalClose) imgModalClose.addEventListener("click", closeModal);
  if (imgModalBackdrop) imgModalBackdrop.addEventListener("click", closeModal);
  if (modalPrev) modalPrev.addEventListener("click", showPrev);
  if (modalNext) modalNext.addEventListener("click", showNext);

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!imgModal || !imgModal.classList.contains("open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  // Touch swipe support
  if (imgModal) {
    let touchStartX = 0;
    imgModal.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    imgModal.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? showNext() : showPrev();
      }
    }, { passive: true });
  }
})();

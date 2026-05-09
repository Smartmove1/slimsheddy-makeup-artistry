/* ============================================
   SLIMSHEDDY MAKEUP ARTISTRY — video.js
   Video Modal System
   ============================================ */

(function () {
  "use strict";

  const videoModal = document.getElementById("videoModal");
  const videoModalBackdrop = document.getElementById("videoModalBackdrop");
  const videoModalClose = document.getElementById("videoModalClose");
  const videoPlayer = document.getElementById("videoPlayer");

  function openVideoModal(videoSrc) {
    if (!videoModal || !videoPlayer) return;
    const source = videoPlayer.querySelector("source");
    if (source) source.src = videoSrc;
    videoPlayer.load();
    videoModal.classList.add("open");
    document.body.style.overflow = "hidden";
    // Auto-play after a brief delay
    setTimeout(() => {
      videoPlayer.play().catch(() => {
        // Play prevented by browser policy; user can press play manually
      });
    }, 200);
  }

  function closeVideoModal() {
    if (!videoModal || !videoPlayer) return;
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    videoModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Attach click events to all video thumbnails
  document.querySelectorAll(".video-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const videoSrc = thumb.getAttribute("data-video");
      if (videoSrc) {
        openVideoModal(videoSrc);
      }
    });
  });

  // Close events
  if (videoModalClose) videoModalClose.addEventListener("click", closeVideoModal);
  if (videoModalBackdrop) videoModalBackdrop.addEventListener("click", closeVideoModal);

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (videoModal && videoModal.classList.contains("open") && e.key === "Escape") {
      closeVideoModal();
    }
  });
})();

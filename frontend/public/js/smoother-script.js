$(function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof ScrollSmoother === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollTrigger.normalizeScroll(false);

  // Check if smooth wrapper exists on page
  var wrapper = document.getElementById("smooth-wrapper");
  var content = document.getElementById("smooth-content");
  if (!wrapper || !content) {
    return;
  }

  // Create the smooth scroller
  var smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true,
  });

  function refreshScroller() {
    try {
      ScrollTrigger.refresh();
      if (smoother && typeof smoother.refresh === "function") {
        smoother.refresh();
      }
      // Keep WOW elements visible
      if (typeof $ !== "undefined") {
        $(".wow").css("visibility", "visible");
      }
    } catch (_) {}
  }

  // Refresh when images finish loading
  if (typeof imagesLoaded !== "undefined") {
    imagesLoaded("#smooth-content", function () {
      refreshScroller();
    });
  }

  window.addEventListener("load", refreshScroller);
  setTimeout(refreshScroller, 300);
  setTimeout(refreshScroller, 800);
  setTimeout(refreshScroller, 1800);
  setTimeout(refreshScroller, 3000);

  // Expose globally for preloader and route transitions
  window.refreshKarnishScroller = refreshScroller;
});
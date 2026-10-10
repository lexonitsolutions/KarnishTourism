(function () {
  "use strict";

  var activeSmoother = null;
  var refreshFrame = null;

  function librariesReady() {
    return (
      typeof window.gsap !== "undefined" &&
      typeof window.ScrollTrigger !== "undefined" &&
      typeof window.ScrollSmoother !== "undefined"
    );
  }

  function refreshScroller() {
    window.cancelAnimationFrame(refreshFrame);
    refreshFrame = window.requestAnimationFrame(function () {
      try {
        window.ScrollTrigger && window.ScrollTrigger.refresh();
        activeSmoother && activeSmoother.refresh && activeSmoother.refresh();
        document.querySelectorAll(".wow").forEach(function (element) {
          element.style.visibility = "visible";
        });
      } catch (_) {}
    });
  }

  function initializeScroller() {
    if (!librariesReady()) return;

    var wrapper = document.getElementById("smooth-wrapper");
    var content = document.getElementById("smooth-content");

    try {
      var previous = window.ScrollSmoother.get && window.ScrollSmoother.get();
      if (previous) previous.kill();
    } catch (_) {}
    activeSmoother = null;

    if (!wrapper || !content) {
      refreshScroller();
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger, window.ScrollSmoother);
    window.ScrollTrigger.normalizeScroll(false);

    activeSmoother = window.ScrollSmoother.create({
      wrapper: wrapper,
      content: content,
      smooth: 1.5,
      effects: true,
    });

    if (typeof window.imagesLoaded !== "undefined") {
      window.imagesLoaded(content, refreshScroller);
    }

    refreshScroller();
  }

  window.refreshKarnishScroller = refreshScroller;
  window.reinitializeKarnishScroller = initializeScroller;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeScroller, { once: true });
  } else {
    initializeScroller();
  }

  window.addEventListener("load", refreshScroller, { once: true });
})();

/**
 * Smooth Scroll Assist System for Concave Lankafushi Website
 * Provides seamless section-to-section navigation that prevents mid-section stops
 * and continuous scrolling issues with high section padding.
 */

class ScrollAssist {
  constructor() {
    this.sections = [];
    this.currentSectionIndex = 0;
    this.isAnimating = false;
    this.scrollVelocity = 0;
    this.lastScrollY = window.scrollY;
    this.lastScrollTime = Date.now();
    this.scrollHistory = [];
    this.velocityThreshold = 2000; // Extremely high threshold to prevent unintentional triggers
    this.boundaryThreshold = 300; // Very large zone near boundaries
    this.minScrollDistance = 100; // Minimum scroll distance in direction before assisting
    this.animationDuration = 600; // Faster, smoother animation
    this.easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    this.init();
  }

  init() {
    this.collectSections();
    this.bindEvents();
    this.updateCurrentSection();
  }

  collectSections() {
    // Collect all main sections in order
    const sectionSelectors = [
      ".hero",
      ".intro-section",
      ".menu-highlight",
      ".interior-section",
      ".gallery-section",
      ".testimonials-section",
      ".footer",
    ];

    sectionSelectors.forEach((selector) => {
      const section = document.querySelector(selector);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = window.scrollY + rect.top;
        const height = rect.height;
        this.sections.push({
          element: section,
          top: top,
          height: height,
          bottom: top + height,
        });
      }
    });
  }

  bindEvents() {
    window.addEventListener("scroll", this.handleScroll.bind(this), {
      passive: true,
    });
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  handleScroll() {
    const now = Date.now();
    const currentScrollY = window.scrollY;
    const timeDelta = now - this.lastScrollTime;

    if (timeDelta > 0) {
      this.scrollVelocity =
        Math.abs(currentScrollY - this.lastScrollY) / (timeDelta / 1000);
    }

    // Track scroll direction and history
    const direction = currentScrollY > this.lastScrollY ? "down" : "up";
    this.scrollHistory.push({ y: currentScrollY, time: now, direction });

    // Keep only recent history (last 1000ms for more stable direction detection)
    this.scrollHistory = this.scrollHistory.filter(
      (entry) => now - entry.time < 1000
    );

    this.lastScrollY = currentScrollY;
    this.lastScrollTime = now;

    this.updateCurrentSection();
    this.checkForAssist();
  }

  handleResize() {
    // Recalculate section positions on resize
    this.sections.forEach((section) => {
      const rect = section.element.getBoundingClientRect();
      section.top = window.scrollY + rect.top;
      section.height = rect.height;
      section.bottom = section.top + section.height;
    });
    this.updateCurrentSection();
  }

  updateCurrentSection() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    for (let i = 0; i < this.sections.length; i++) {
      const section = this.sections[i];
      if (
        scrollY >= section.top - windowHeight / 2 &&
        scrollY < section.bottom - windowHeight / 2
      ) {
        this.currentSectionIndex = i;
        break;
      }
    }
  }

  checkForAssist() {
    if (this.isAnimating) return;

    const scrollY = window.scrollY;
    const currentSection = this.sections[this.currentSectionIndex];

    if (!currentSection) return;

    // Determine scroll direction from recent history
    const recentDirections = this.scrollHistory
      .slice(-10)
      .map((entry) => entry.direction);
    const downCount = recentDirections.filter((dir) => dir === "down").length;
    const direction = downCount > recentDirections.length / 2 ? "down" : "up";

    // Only assist if there are enough recent scroll events to confirm direction
    if (recentDirections.length < 15) return;

    // Check if user has scrolled a minimum distance in the current direction
    const recentScrolls = this.scrollHistory.slice(-15);
    const startY = recentScrolls[0].y;
    const endY = recentScrolls[recentScrolls.length - 1].y;
    const scrollDistance = Math.abs(endY - startY);
    if (scrollDistance < this.minScrollDistance) return;

    // Check if we're near a section boundary and scrolling has slowed
    let shouldAssist = false;
    let targetSectionIndex = this.currentSectionIndex;

    if (direction === "down") {
      // Scrolling down, check if near bottom of current section
      const distanceToBottom =
        currentSection.bottom - (scrollY + window.innerHeight);
      if (distanceToBottom <= this.boundaryThreshold && distanceToBottom > 0) {
        shouldAssist = this.scrollVelocity < this.velocityThreshold;
        targetSectionIndex = Math.min(
          this.currentSectionIndex + 1,
          this.sections.length - 1
        );
      }
    } else {
      // Scrolling up, check if near top of current section
      const distanceToTop = scrollY - currentSection.top;
      if (distanceToTop <= this.boundaryThreshold && distanceToTop > 0) {
        shouldAssist = this.scrollVelocity < this.velocityThreshold;
        targetSectionIndex = Math.max(this.currentSectionIndex - 1, 0);
      }
    }

    if (shouldAssist && targetSectionIndex !== this.currentSectionIndex) {
      this.assistScroll(targetSectionIndex);
    }
  }

  assistScroll(targetSectionIndex) {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const targetSection = this.sections[targetSectionIndex];
    const startY = window.scrollY;
    const endY = targetSection.top;
    const distance = endY - startY;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / this.animationDuration, 1);
      const easedProgress = this.easeOutCubic(progress);

      const currentY = startY + distance * easedProgress;
      window.scrollTo(0, currentY);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
        this.updateCurrentSection();
      }
    };

    requestAnimationFrame(animate);
  }
}

// Initialize scroll assist when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new ScrollAssist();
  });
} else {
  new ScrollAssist();
}

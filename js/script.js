import menuData from "./menuData.js";

// Cache frequently accessed DOM elements for performance
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const filterButtons = document.querySelectorAll(".filter-btn");
const subFilterButtons = document.querySelectorAll(".sub-filter-btn");
const subFilterContainers = document.querySelectorAll(".sub-filter-container");
const menuCategories = document.querySelectorAll(".menu-category");
const menuFilters = document.querySelector(".menu-filters");
const contactForm = document.getElementById("contactForm");
const filterToggleBtn = document.getElementById("filter-toggle");
const filterButtonsContainer = document.querySelector(".filter-buttons");

// Testimonials carousel elements
const carouselTrack = document.querySelector(".carousel-track");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const carouselPrev = document.querySelector(".carousel-prev");
const carouselNext = document.querySelector(".carousel-next");
const carouselDots = document.querySelectorAll(".carousel-dot");

// Track scroll position for navigation effects
let lastScrollY = window.scrollY;

// Testimonials carousel state
let currentSlide = 0;
let autoScrollInterval;
const autoScrollDelay = 6000; // 6 seconds

// Handle navigation bar styling based on scroll position
function handleScroll() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    nav.classList.add("nav-scrolled");
  } else {
    nav.classList.remove("nav-scrolled");
  }

  lastScrollY = currentScrollY;
}

// Toggle mobile navigation menu visibility and prevent body scrolling
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// Close mobile menu and restore body scrolling
function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "";
}

// Gallery lightbox state and image data
let currentImageIndex = 0;
const galleryImages = Array.from(galleryItems).map((item) => {
  const img = item.querySelector("img");
  return {
    src: img.src,
    alt: img.alt,
  };
});

// Display lightbox modal with selected image and disable page scrolling
function openLightbox(index) {
  currentImageIndex = index;
  lightboxImage.src = galleryImages[index].src;
  lightboxImage.alt = galleryImages[index].alt;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Hide lightbox modal and restore page scrolling
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// Navigate to next image in gallery lightbox
function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex].src;
  lightboxImage.alt = galleryImages[currentImageIndex].alt;
}

// Navigate to previous image in gallery lightbox
function showPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentImageIndex].src;
  lightboxImage.alt = galleryImages[currentImageIndex].alt;
}

// Filter menu items by category and optional subcategory, updating visibility and active states
function filterMenu(category, subCategory = null) {
  menuCategories.forEach((categoryElement) => {
    const categoryType = categoryElement.getAttribute("data-category");

    if (category === "all") {
      categoryElement.classList.remove("hidden");
    } else if (categoryType === category) {
      if (subCategory) {
        // Filter by sub-category
        const menuItems = categoryElement.querySelectorAll(".menu-item");
        let hasVisibleItems = false;
        menuItems.forEach((item) => {
          const itemSub = item.getAttribute("data-sub");
          if (itemSub === subCategory) {
            item.style.display = "block";
            hasVisibleItems = true;
          } else {
            item.style.display = "none";
          }
        });
        if (hasVisibleItems) {
          categoryElement.classList.remove("hidden");
        } else {
          categoryElement.classList.add("hidden");
        }
      } else {
        // Show all items in category
        const menuItems = categoryElement.querySelectorAll(".menu-item");
        menuItems.forEach((item) => (item.style.display = "block"));
        categoryElement.classList.remove("hidden");
      }
    } else {
      categoryElement.classList.add("hidden");
    }
  });

  // Update active filter button
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  subFilterButtons.forEach((btn) => btn.classList.remove("active"));

  if (subCategory) {
    document
      .querySelector(`[data-sub="${subCategory}"]`)
      .classList.add("active");
    // Also activate the parent
    const parentFilter = document.querySelector(`[data-filter="${category}"]`);
    if (parentFilter) parentFilter.classList.add("active");
  } else {
    document
      .querySelector(`[data-filter="${category}"]`)
      .classList.add("active");
  }
}

// Show or hide sub-filter options for a parent category
function toggleSubMenu(parentFilter) {
  subFilterContainers.forEach((container) => {
    const parent = container.getAttribute("data-parent");
    if (parent === parentFilter) {
      container.classList.toggle("active");
    } else {
      container.classList.remove("active");
    }
  });
}

// Process contact form submission, validate, and provide user feedback
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Here you would typically send the data to a server
  console.log("Form submitted:", data);

  // Show success message (you can customize this)
  alert(
    "Thank you for your reservation request! We will contact you shortly to confirm your booking."
  );

  // Reset form
  contactForm.reset();
}

// Scroll smoothly to a specified element on the page
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Set up intersection observer to trigger fade-in animations when elements enter viewport
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  const elementsToObserve = document.querySelectorAll(
    ".intro-text, .menu-highlight-text, .interior-text, .editorial-text, .team-member, .philosophy-item"
  );

  elementsToObserve.forEach((el) => observer.observe(el));
}

// Apply parallax scrolling effect to hero background image for visual depth
function handleParallax() {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-bg img");

  if (heroImage) {
    const speed = scrolled * 0.5;
    heroImage.style.transform = `scale(1.1) translateY(${speed}px)`;
  }
}

// Toggle visibility of menu filter buttons on mobile devices
function toggleMobileFilters() {
  if (window.innerWidth <= 768) {
    const isVisible =
      filterButtonsContainer.classList.contains("mobile-visible");

    if (isVisible) {
      // Hide filters
      filterButtonsContainer.classList.remove("mobile-visible");
      filterToggleBtn.classList.remove("active");
      filterToggleBtn.innerHTML =
        '<i class="fas fa-filter"></i><span>Filters</span>';
    } else {
      // Show filters
      filterButtonsContainer.classList.add("mobile-visible");
      filterToggleBtn.classList.add("active");
      filterToggleBtn.innerHTML =
        '<i class="fas fa-times"></i><span>Hide Filters</span>';
    }
  }
}

// Enable horizontal scrolling for filter buttons on mobile devices with touch support
function initHorizontalScroll() {
  if (window.innerWidth <= 768 && filterButtonsContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    filterButtonsContainer.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - filterButtonsContainer.offsetLeft;
      scrollLeft = filterButtonsContainer.scrollLeft;
      filterButtonsContainer.style.cursor = "grabbing";
    });

    filterButtonsContainer.addEventListener("mouseleave", () => {
      isDown = false;
      filterButtonsContainer.style.cursor = "grab";
    });

    filterButtonsContainer.addEventListener("mouseup", () => {
      isDown = false;
      filterButtonsContainer.style.cursor = "grab";
    });

    filterButtonsContainer.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - filterButtonsContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      filterButtonsContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile swipe
    filterButtonsContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - filterButtonsContainer.offsetLeft;
      scrollLeft = filterButtonsContainer.scrollLeft;
    });

    filterButtonsContainer.addEventListener("touchmove", (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX - filterButtonsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      filterButtonsContainer.scrollLeft = scrollLeft - walk;
    });

    filterButtonsContainer.addEventListener("touchend", () => {
      startX = null;
    });
  }
}

// Dynamically generate and insert menu items into DOM based on menuData structure
function populateMenu() {
  Object.keys(menuData).forEach((categoryKey) => {
    const category = menuData[categoryKey];
    const categoryElement = document.querySelector(
      `.menu-category[data-category="${categoryKey}"]`
    );
    if (!categoryElement) return;

    const menuGrid = categoryElement.querySelector(".menu-grid");
    if (!menuGrid) return;

    // Clear existing items
    menuGrid.innerHTML = "";

    Object.keys(category).forEach((subCategoryKey) => {
      const items = category[subCategoryKey];
      items.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.setAttribute("data-sub", subCategoryKey);

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("menu-item-image");
        const img = document.createElement("img");
        img.src = item.image || "";
        img.alt = item.name || "";
        imageDiv.appendChild(img);

        const headerDiv = document.createElement("div");
        headerDiv.classList.add("menu-item-header");
        const h3 = document.createElement("h3");
        h3.textContent = item.name || "";
        const priceSpan = document.createElement("span");
        priceSpan.classList.add("price");
        priceSpan.textContent = item.price || "";
        headerDiv.appendChild(h3);
        headerDiv.appendChild(priceSpan);
        const descP = document.createElement("p");
        descP.textContent = item.description || "";

        menuItem.appendChild(imageDiv);
        menuItem.appendChild(headerDiv);
        menuItem.appendChild(descP);

        menuGrid.appendChild(menuItem);
      });
    });
  });
}

// Set up all event listeners and initialize page functionality
function init() {
  // Navigation
  if (navToggle) {
    navToggle.addEventListener("click", toggleMobileMenu);
  }

  // Mobile menu links
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-content a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Gallery
  if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
      item.addEventListener("click", () => openLightbox(index));
    });
  }

  // Lightbox controls
  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", showPrevImage);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", showNextImage);
  }

  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (
        e.target === lightbox ||
        e.target.classList.contains("lightbox-content")
      ) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          showPrevImage();
          break;
        case "ArrowRight":
          showNextImage();
          break;
      }
    }
  });

  // Menu filters
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        if (filter === "all") {
          filterMenu(filter);
          // Hide all sub-menus
          subFilterContainers.forEach((container) =>
            container.classList.remove("active")
          );
        } else {
          toggleSubMenu(filter);
          filterMenu(filter);
        }
      });
    });
  }

  // Sub-menu filters
  if (subFilterButtons.length > 0) {
    subFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const subFilter = button.getAttribute("data-sub");
        const parentContainer = button.closest(".sub-filter-container");
        const parentFilter = parentContainer.getAttribute("data-parent");
        filterMenu(parentFilter, subFilter);
      });
    });
  }

  // Drinks "+ More" toggle functionality
  const drinksMoreToggle = document.getElementById("drinks-more-toggle");
  const hiddenFilters = document.querySelector(".hidden-filters");

  if (drinksMoreToggle && hiddenFilters) {
    drinksMoreToggle.addEventListener("click", () => {
      const isExpanded = hiddenFilters.classList.contains("expanded");

      if (isExpanded) {
        // Collapse
        hiddenFilters.classList.remove("expanded");
        drinksMoreToggle.classList.remove("expanded");
        drinksMoreToggle.textContent = " More +";
      } else {
        // Expand
        hiddenFilters.classList.add("expanded");
        drinksMoreToggle.classList.add("expanded");
        drinksMoreToggle.textContent = "− Less";
      }
    });
  }

  // Mobile filter toggle functionality
  if (filterToggleBtn) {
    filterToggleBtn.addEventListener("click", toggleMobileFilters);
  }

  // Initialize horizontal scroll for mobile filters
  initHorizontalScroll();

  // Contact form
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  // Scroll effects
  window.addEventListener("scroll", () => {
    handleScroll();

    // Sticky menu filters
    if (menuFilters) {
      const menuFiltersTop = menuFilters.offsetTop;
      if (window.scrollY > menuFiltersTop - 80) {
        menuFilters.classList.add("sticky");
      } else {
        menuFilters.classList.remove("sticky");
      }
    }

    // Only apply parallax on larger screens and if user hasn't opted for reduced motion
    if (
      window.innerWidth > 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      requestAnimationFrame(handleParallax);
    }
  });

  // Initialize intersection observer
  observeElements();

  // Set minimum date for reservation form
  const dateInput = document.getElementById("date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // Populate menu dynamically
  populateMenu();

  // Initialize carousel
  initCarousel();

  // Initialize Lucide icons
  lucide.createIcons();
}

// Initialize application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Handle responsive behavior on window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize to larger screen
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";

    // Reset mobile filter state on desktop
    if (filterButtonsContainer) {
      filterButtonsContainer.classList.remove("mobile-visible");
    }
    if (filterToggleBtn) {
      filterToggleBtn.classList.remove("active");
      filterToggleBtn.innerHTML =
        '<i class="fas fa-filter"></i><span>Filters</span>';
    }
  } else {
    // Re-initialize horizontal scroll on mobile resize
    initHorizontalScroll();
  }
});

// Register service worker for offline functionality and performance caching
if ("serviceWorker" in navigator && window.location.protocol === "https:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Service worker registration failed, but this is not critical
    });
  });
}

// Testimonials carousel functions
function updateCarousel() {
  if (!carouselTrack) return;

  const slideWidth = carouselSlides[0].offsetWidth;
  carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

  // Update dots
  carouselDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % carouselSlides.length;
  updateCarousel();
}

function prevSlide() {
  currentSlide =
    (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

function pauseAutoScroll() {
  stopAutoScroll();
  // Resume after 3 seconds of inactivity
  setTimeout(startAutoScroll, 3000);
}

// Handle carousel interactions
function handleCarouselInteraction() {
  pauseAutoScroll();
}

// Initialize carousel
function initCarousel() {
  if (!carouselTrack || carouselSlides.length === 0) return;

  // Set up event listeners
  if (carouselPrev) {
    carouselPrev.addEventListener("click", () => {
      prevSlide();
      handleCarouselInteraction();
    });
  }

  if (carouselNext) {
    carouselNext.addEventListener("click", () => {
      nextSlide();
      handleCarouselInteraction();
    });
  }

  carouselDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      handleCarouselInteraction();
    });
  });

  // Start auto-scroll
  startAutoScroll();

  // Handle window resize
  window.addEventListener("resize", updateCarousel);
}

// Utility functions for common operations and future extensibility
const utils = {
  // Debounce function for performance optimization
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format currency for menu prices
  formatCurrency: (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  },

  // Validate email format
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Format date for reservations
  formatDate: (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
};

// Make utility functions globally available for use in other scripts
window.LumiereUtils = utils;

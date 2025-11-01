// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animations
gsap.to(".hero-bg img", {
  scale: 1.15,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

gsap.fromTo(
  ".hero-title",
  { opacity: 0 },
  {
    opacity: 1,
    letterSpacing: "0.1em",
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      once: true,
    },
  }
);

gsap.fromTo(
  ".hero-subtitle",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      once: true,
    },
  }
);

gsap.fromTo(
  ".hero-content .btn",
  { opacity: 0, y: 20, scale: 0.95 },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.2,
    delay: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero",
      start: "top 80%",
      once: true,
    },
  }
);

// Refined Skybar Experience CTA animation: slide in from right with soft opacity and delay
gsap.fromTo(
  ".intro-text .btn",
  { opacity: 0, x: 40 },
  {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".intro-section",
      start: "top 80%",
      once: true,
    },
  }
);

// Our Menu CTA: fade-up with gold shimmer effect
gsap.fromTo(
  ".menu-highlight-text  .btn",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".menu-highlight",
      start: "top 80%",
      once: true,
    },
    onStart: () => {
      const btn = document.querySelector(".menu-highlight-text  .btn");
      if (btn) {
        btn.classList.add("gold-shimmer");
        setTimeout(() => btn.classList.remove("gold-shimmer"), 1500);
      }
    },
  }
);
// Our Menu CTA: fade-up with gold shimmer effect
gsap.fromTo(
  ".hero-title  .btn",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".hero-title",
      start: "top 80%",
      once: true,
    },
    onStart: () => {
      const btn = document.querySelector(".hero-title .btn");
      if (btn) {
        btn.classList.add("gold-shimmer");
        setTimeout(() => btn.classList.remove("gold-shimmer"), 1500);
      }
    },
  }
);

// Elegant Escape CTA: parallax float-in from bottom with subtle motion blur
gsap.fromTo(
  ".interior-text .btn",
  { opacity: 0, y: 40, filter: "blur(2px)" },
  {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    duration: 1.2,
    delay: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".interior-section",
      start: "top 80%",
      once: true,
    },
  }
);

// Footer CTA: fade-in with background glow sweep animation
gsap.fromTo(
  ".footer-cta-btn",
  { opacity: 0, backgroundPosition: "200% center" },
  {
    opacity: 1,
    backgroundPosition: "50% center",
    duration: 1.5,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".footer",
      start: "top 90%",
      once: true,
    },
  }
);

// Section Title Gold Underline Animation on Scroll
gsap.utils.toArray("h2").forEach((title) => {
  ScrollTrigger.create({
    trigger: title,
    start: "top 80%",
    end: "bottom 20%",
    toggleClass: { targets: title, className: "underline-active" },
    toggleActions: "play none none reverse",
  });
});

// Skybar Experience Section Animations
gsap.utils.toArray(".intro-image-1, .intro-image-2").forEach((el, i) => {
  gsap.fromTo(
    el,
    { y: i % 2 === 0 ? 20 : -20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top 80%",
        once: true,
      },
    }
  );
});

gsap.fromTo(
  ".intro-text",
  { opacity: 0, x: 50 },
  {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".intro-section",
      start: "top 80%",
      once: true,
    },
  }
);

gsap.fromTo(
  ".intro-text .btn",
  { opacity: 0, x: 20 },
  {
    opacity: 1,
    x: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".intro-section",
      start: "top 80%",
      once: true,
    },
  }
);

// Our Menu Section Animations
gsap.fromTo(
  ".menu-highlight-text h2, .menu-highlight-text p",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".menu-highlight",
      start: "top 80%",
      once: true,
    },
  }
);

gsap.fromTo(
  ".menu-highlight-image",
  { opacity: 0, scale: 0.95 },
  {
    opacity: 1,
    scale: 1,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".menu-highlight",
      start: "top 80%",
      once: true,
    },
  }
);

// An Elegant Escape Section Animations
gsap.fromTo(
  ".interior-text",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".interior-section",
      start: "top 80%",
      once: true,
    },
  }
);

gsap.utils
  .toArray(".interior-image-main, .interior-image-overlay")
  .forEach((el, i) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 1,
        delay: i * 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".interior-section",
          start: "top 80%",
          once: true,
        },
      }
    );
  });

gsap.fromTo(
  ".interior-text .btn",
  { opacity: 0, y: 20 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    delay: 0.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".interior-section",
      start: "top 80%",
      once: true,
    },
  }
);

// // Footer Animations
// gsap.fromTo(
//   ".footer",
//   { opacity: 0, y: 50, filter: "blur(5px)" },
//   {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     duration: 1,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: ".footer",
//       start: "top 90%",
//       once: true,
//     },
//   }
// );

// Testimonials carousel scroll reveal
gsap.fromTo(
  ".testimonials-carousel",
  { opacity: 0, y: 30 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".testimonials-section",
      start: "top 85%",
      once: true,
    },
  }
);

// Other pages: Animate sections with fade and slide up
gsap.utils.toArray("section").forEach((section) => {
  gsap.fromTo(
    section,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        once: true,
      },
    }
  );
});

// Parallax scroll effect for hero sections on about, menu, contact pages
gsap.utils.toArray(".page-hero-bg, .hero-bg img").forEach((img) => {
  gsap.to(img, {
    scale: 1.15,
    ease: "power2.out",
    scrollTrigger: {
      trigger: img.closest(".page-hero"),
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
});

// Fade in hero content on these pages
gsap.utils.toArray(".page-hero-content").forEach((content) => {
  gsap.fromTo(
    content,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: content.closest(".page-hero"),
        start: "top 80%",
        once: true,
      },
    }
  );
});

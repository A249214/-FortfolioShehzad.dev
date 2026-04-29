
// ===== EMAILJS INIT =====
emailjs.init("Mhe1zYmSSNGlcacqt");

// ===== GSAP PLUGINS =====
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// =============================================
// 1. PRELOADER
// =============================================
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hidden");
    document.body.style.overflow = "";
    initHeroAnimations();
  }, 2200);
});

document.body.style.overflow = "hidden";

// =============================================
// 2. CUSTOM CURSOR — Water Flow Effect
// =============================================
const cursorOuter = document.getElementById("cursorOuter");
const cursorInner = document.getElementById("cursorInner");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = 0, mouseY = 0;
let outerX = 0, outerY = 0;
let trailX = 0, trailY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Inner cursor follows immediately
  gsap.to(cursorInner, {
    x: mouseX,
    y: mouseY,
    duration: 0.08,
    ease: "power2.out"
  });
});

// Outer cursor and trail follow with different lag (water flow effect)
function animateCursor() {
  // Outer cursor - slight lag for fluid feel
  outerX += (mouseX - outerX) * 0.15;
  outerY += (mouseY - outerY) * 0.15;
  cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;

  // Trail cursor - more lag for water ripple effect
  trailX += (mouseX - trailX) * 0.08;
  trailY += (mouseY - trailY) * 0.08;
  cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover states
const hoverTargets = document.querySelectorAll(
  "a, button, .service-card, .portfolio-item, .filter-btn, .skill-item, .timeline-item, .social-icon"
);

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
});

// Hide cursor when leaving window
document.addEventListener("mouseleave", () => {
  cursorOuter.style.opacity = "0";
  cursorInner.style.opacity = "0";
  cursorTrail.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
  cursorOuter.style.opacity = "1";
  cursorInner.style.opacity = "1";
  cursorTrail.style.opacity = "1";
});

// =============================================
// 3. STAR FIELD BACKGROUND
// =============================================
function createStars() {
  const container = document.getElementById("starsBg");
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.7 + 0.1;
    const duration = Math.random() * 4 + 2;
    const delay = Math.random() * 6;

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --opacity: ${opacity};
      --duration: ${duration}s;
      --delay: ${delay}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(star);
  }
}
createStars();

// =============================================
// 4. HERO ANIMATIONS (GSAP)
// =============================================
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".hero-hello", { opacity: 1, y: 0, duration: 0.8 })
    .to(".hero-name", { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
    .to(".hero-role-wrapper", { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
    .to(".hero-btns", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
    .to(".hero-socials", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
    .to(".hero-img", { opacity: 1, duration: 1, x: 0 }, "-=0.8")
    .to(".hero-scroll-indicator", { opacity: 1, duration: 0.5 }, "-=0.3");

  // Typing animation for role
  const roles = ["Frontend Developer", "UI/UX Designer", "Creative Coder", "Web Developer"];
  let roleIndex = 0;
  const roleEl = document.getElementById("heroRole");

  function typeRole() {
    const role = roles[roleIndex % roles.length];
    roleIndex++;

    gsap.to(roleEl, {
      duration: 0.5,
      opacity: 0,
      y: -10,
      ease: "power2.in",
      onComplete: () => {
        roleEl.textContent = role;
        gsap.to(roleEl, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out"
        });
      }
    });
  }

  setInterval(typeRole, 2800);
}

// =============================================
// 5. HEADER / NAVBAR SCROLL
// =============================================
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Header shrink
  if (scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Back to top visibility
  if (scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  // Active nav link
  updateActiveNav();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =============================================
// 6. ACTIVE NAV LINK
// =============================================
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// =============================================
// 7. MOBILE HAMBURGER
// =============================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("open");
  });
});

// =============================================
// 8. GSAP SCROLL ANIMATIONS
// =============================================
// Section headers
gsap.utils.toArray(".section-header").forEach((header) => {
  gsap.fromTo(
    header,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
});

// About section
gsap.fromTo(".about-img-col", { opacity: 0, x: -60 }, {
  opacity: 1, x: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".about-section", start: "top 75%" }
});
gsap.fromTo(".about-info-col", { opacity: 0, x: 60 }, {
  opacity: 1, x: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".about-section", start: "top 75%" }
});
gsap.fromTo(".detail-row", { opacity: 0, x: 20 }, {
  opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power2.out",
  scrollTrigger: { trigger: ".about-details", start: "top 80%" }
});

// Skills bars
ScrollTrigger.create({
  trigger: ".skills-section",
  start: "top 70%",
  onEnter: () => {
    document.querySelectorAll(".skill-fill").forEach((fill) => {
      const width = fill.getAttribute("data-width");
      gsap.to(fill, {
        width: `${width}%`,
        duration: 1.8,
        ease: "power2.out",
        delay: 0.2
      });
    });
  }
});

gsap.fromTo(".skills-left", { opacity: 0, x: -40 }, {
  opacity: 1, x: 0, duration: 1,
  scrollTrigger: { trigger: ".skills-section", start: "top 75%" }
});

// Skill items stagger
gsap.fromTo(".skill-item", { opacity: 0, y: 30 }, {
  opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
  scrollTrigger: { trigger: ".skills-right", start: "top 80%" }
});

// Resume timeline items
gsap.fromTo(".timeline-item", { opacity: 0, x: -30 }, {
  opacity: 1, x: 0, stagger: 0.15, duration: 0.7, ease: "power3.out",
  scrollTrigger: { trigger: ".resume-section", start: "top 75%" }
});

// Service cards
gsap.fromTo(".service-card", { opacity: 0, y: 50, scale: 0.95 }, {
  opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
  scrollTrigger: { trigger: ".services-section", start: "top 75%" }
});

// Portfolio items
gsap.fromTo(".portfolio-item", { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
  scrollTrigger: { trigger: ".portfolio-section", start: "top 75%" }
});

// Testimonials
gsap.fromTo(".testimonial-card", { opacity: 0, scale: 0.95 }, {
  opacity: 1, scale: 1, duration: 0.8,
  scrollTrigger: { trigger: ".testimonials-section", start: "top 75%" }
});

// Contact
gsap.fromTo(".contact-info", { opacity: 0, x: -40 }, {
  opacity: 1, x: 0, duration: 1,
  scrollTrigger: { trigger: ".contact-section", start: "top 75%" }
});
gsap.fromTo(".contact-form-wrap", { opacity: 0, x: 40 }, {
  opacity: 1, x: 0, duration: 1,
  scrollTrigger: { trigger: ".contact-section", start: "top 75%" }
});
gsap.fromTo(".contact-card", { opacity: 0, y: 20 }, {
  opacity: 1, y: 0, stagger: 0.1, duration: 0.6,
  scrollTrigger: { trigger: ".contact-cards", start: "top 85%" }
});

// =============================================
// 9. PORTFOLIO FILTER
// =============================================
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || filter === category) {
        gsap.to(item, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
        item.classList.remove("hidden");
      } else {
        gsap.to(item, {
          opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in",
          onComplete: () => item.classList.add("hidden")
        });
      }
    });
  });
});

// =============================================
// 10. TESTIMONIALS SLIDER
// =============================================
const track = document.getElementById("testimonialTrack");
const dotsContainer = document.getElementById("sliderDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const cards = document.querySelectorAll(".testimonial-card");
let currentSlide = 0;
let autoplayInterval;

// Create dots
cards.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(index) {
  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  goToSlide((currentSlide + 1) % cards.length);
}

function prevSlide() {
  goToSlide((currentSlide - 1 + cards.length) % cards.length);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 4500);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

startAutoplay();

document.querySelector(".testimonials-slider").addEventListener("mouseenter", stopAutoplay);
document.querySelector(".testimonials-slider").addEventListener("mouseleave", startAutoplay);

// =============================================
// 11. EMAILJS CONTACT FORM
// =============================================
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Button loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="btn-text">Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

  const templateParams = {
    from_name: document.getElementById("fromName").value,
    from_email: document.getElementById("fromEmail").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    to_name: "Muhammad Shehzad Ali"
  };

  try {
    //my service and template id
    await emailjs.send("service_rw8aoxs", "template_ligzt3a", templateParams);

    formStatus.textContent = "✅ Message sent successfully! I'll get back to you soon.";
    formStatus.className = "form-status success";
    contactForm.reset();

    // GSAP success animation
    gsap.fromTo(formStatus, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
  } catch (error) {
    console.error("EmailJS Error:", error);
    formStatus.textContent = "❌ Something went wrong. Please try again or email me directly.";
    formStatus.className = "form-status error";
    gsap.fromTo(formStatus, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span class="btn-text">Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;

    setTimeout(() => {
      formStatus.className = "form-status";
      formStatus.textContent = "";
    }, 5000);
  }
});

// =============================================
// 12. SMOOTH ANCHOR SCROLLING
// =============================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const targetOffset = target.getBoundingClientRect().top + window.scrollY;
      const navHeight = document.getElementById("header").offsetHeight;
      window.scrollTo({ top: targetOffset - navHeight, behavior: "smooth" });
    }
  });
});

// =============================================
// 13. CURSOR HOVER RE-ATTACH (after dynamic content)
// =============================================
function reattachCursorHovers() {
  document.querySelectorAll("a, button, .service-card, .portfolio-item, .filter-btn").forEach((el) => {
    el.removeEventListener("mouseenter", () => {});
    el.removeEventListener("mouseleave", () => {});
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// =============================================
// 14. PARALLAX HERO IMAGE ON MOUSE MOVE
// =============================================
const heroSection = document.getElementById("home");
const heroImg = document.getElementById("heroImg");

if (heroSection && heroImg) {
  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(heroImg, {
      x: x * 15,
      y: y * 10,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  heroSection.addEventListener("mouseleave", () => {
    gsap.to(heroImg, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
  });
}

// =============================================
// 15. NUMBER COUNTER ANIMATION (Stats)
// =============================================
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

console.log(
  "%c🚀 Muhammad Shehzad Ali Portfolio Loaded!",
  "color: #f0a500; font-size: 16px; font-weight: bold;"
);
console.log(
  "%c⚡ Built with GSAP + EmailJS + Custom Cursor",
  "color: #b0b8d4; font-size: 12px;"
);


  function showMore() {
    alert("Button clicked!");
  }
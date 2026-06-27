```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     GLOBAL VARIABLES
  ========================================================== */

  const body = document.body;
  const welcome = document.getElementById("welcome-message");
  const containers = document.querySelectorAll(".container");
  const photo = document.querySelector(".photo-profil");

  let isDarkMode = localStorage.getItem("darkMode") === "true";
  let particlesCanvas;
  let particlesCtx;
  let particlesArray = [];
  let animationRunning = true;

  /* ==========================================================
     WELCOME SCREEN
  ========================================================== */

  function initWelcomeScreen() {
    if (!welcome) return;

    body.classList.remove("ready");

    setTimeout(() => {
      welcome.classList.add("fade-out");
    }, 2200);

    setTimeout(() => {
      welcome.remove();
      body.classList.add("ready");
    }, 3200);
  }

  initWelcomeScreen();

  /* ==========================================================
     SCROLL ANIMATION
  ========================================================== */

  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.15
    });

    containers.forEach(container => observer.observe(container));
  }

  initScrollReveal();

  /* ==========================================================
     MAIN ACCORDIONS
  ========================================================== */

  function initAccordions() {
    const titles = document.querySelectorAll("h2");

    titles.forEach(title => {
      const content = title.nextElementSibling;
      if (!content) return;

      title.setAttribute("tabindex", "0");
      title.setAttribute("aria-expanded", "false");

      function closeAll() {
        document.querySelectorAll(".toggle-content").forEach(item => {
          if (item !== content) {
            item.style.maxHeight = "0px";
            item.classList.remove("open");
          }
        });

        document.querySelectorAll("h2").forEach(h => {
          if (h !== title) {
            h.setAttribute("aria-expanded", "false");
          }
        });
      }

      function toggle() {
        const isOpen = title.getAttribute("aria-expanded") === "true";

        if (isOpen) {
          content.style.maxHeight = "0px";
          content.classList.remove("open");
          title.setAttribute("aria-expanded", "false");
        } else {
          closeAll();
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("open");
          title.setAttribute("aria-expanded", "true");
        }
      }

      title.addEventListener("click", toggle);

      title.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  initAccordions();

  /* ==========================================================
     SCROLL TO TOP BUTTON
  ========================================================== */

  function createScrollTopButton() {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";
    btn.id = "scroll-top-btn";

    Object.assign(btn.style, {
      position: "fixed",
      right: "25px",
      bottom: "25px",
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      border: "none",
      background: "#5f6f52",
      color: "#fff",
      fontSize: "22px",
      cursor: "pointer",
      opacity: "0",
      transform: "translateY(20px)",
      transition: "all .3s ease",
      zIndex: "1000"
    });

    body.appendChild(btn);

    btn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0)";
      } else {
        btn.style.opacity = "0";
        btn.style.transform = "translateY(20px)";
      }
    });
  }

  createScrollTopButton();

  /* ==========================================================
     DARK MODE BUTTON
  ========================================================== */

  function createDarkModeButton() {
    const btn = document.createElement("button");
    btn.id = "dark-mode-btn";
    btn.innerHTML = isDarkMode ? "☀️" : "🌙";

    Object.assign(btn.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "none",
      background: "#222",
      color: "#fff",
      cursor: "pointer",
      fontSize: "20px",
      zIndex: "1001",
      transition: "all .3s ease"
    });

    body.appendChild(btn);

    if (isDarkMode) {
      body.classList.add("dark-mode");
      createStars();
    }

    btn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      body.classList.toggle("dark-mode");

      btn.innerHTML = isDarkMode ? "☀️" : "🌙";

      localStorage.setItem("darkMode", isDarkMode);

      if (isDarkMode) {
        createStars();
      } else {
        removeStars();
      }
    });
  }

  createDarkModeButton();

  /* ==========================================================
     STARS
  ========================================================== */

  function createStars() {
    removeStars();

    for (let i = 0; i < 60; i++) {
      const star = document.createElement("div");
      star.classList.add("star");

      const size = Math.random() * 3 + 1;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDelay = `${Math.random() * 3}s`;

      body.appendChild(star);
    }
  }

  function removeStars() {
    document.querySelectorAll(".star").forEach(star => star.remove());
  }

  /* ==========================================================
     PARTICLES BACKGROUND
  ========================================================== */

  function initParticles() {
    particlesCanvas = document.createElement("canvas");
    particlesCanvas.id = "particles-canvas";

    body.appendChild(particlesCanvas);

    particlesCtx = particlesCanvas.getContext("2d");

    resizeCanvas();
    createParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });

    animateParticles();
  }

  function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }

  function createParticles() {
    particlesArray = [];

    const numberOfParticles =
      window.innerWidth < 768 ? 40 : 100;

    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      });
    }
  }

  function animateParticles() {
    if (!animationRunning) return;

    particlesCtx.clearRect(
      0,
      0,
      particlesCanvas.width,
      particlesCanvas.height
    );

    particlesArray.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0) particle.x = particlesCanvas.width;
      if (particle.x > particlesCanvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = particlesCanvas.height;
      if (particle.y > particlesCanvas.height) particle.y = 0;

      particlesCtx.beginPath();
      particlesCtx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );

      particlesCtx.fillStyle = isDarkMode
        ? "rgba(255,255,255,0.15)"
        : "rgba(95,111,82,0.18)";

      particlesCtx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  initParticles();

  /* ==========================================================
     PAGE VISIBILITY API
  ========================================================== */

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      animationRunning = false;
    } else {
      animationRunning = true;
      animateParticles();
    }
  });

  /* ==========================================================
     PHOTO EFFECT
  ========================================================== */

  function initPhotoEffects() {
    if (!photo) return;

    photo.addEventListener("mouseenter", () => {
      photo.style.transform = "scale(1.08) rotate(2deg)";
    });

    photo.addEventListener("mouseleave", () => {
      photo.style.transform = "scale(1)";
    });
  }

  initPhotoEffects();

  /* ==========================================================
     HEADER PARALLAX
  ========================================================== */

  function initParallax() {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const header = document.querySelector("header");

      if (header) {
        header.style.backgroundPositionY = `${scrollY * 0.3}px`;
      }
    });
  }

  initParallax();

});
```

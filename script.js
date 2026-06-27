document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     GLOBAL STATE
  ========================================================== */

  const body = document.body;
  const welcome = document.getElementById("welcome-message");
  const containers = document.querySelectorAll(".container");

  let isDarkMode = localStorage.getItem("darkMode") === "true";
  let particlesCanvas, particlesCtx;
  let particles = [];
  let stars = [];
  let animationActive = true;
  let mouse = { x: null, y: null };

  /* ==========================================================
     WELCOME SCREEN
  ========================================================== */

  function initWelcome() {
    if (!welcome) return;

    body.classList.remove("ready");

    setTimeout(() => {
      welcome.classList.add("fade-out");
    }, 1800);

    setTimeout(() => {
      welcome.remove();
      body.classList.add("ready");
    }, 2800);
  }

  initWelcome();

  /* ==========================================================
     SCROLL REVEAL (OPTIMISÉ)
  ========================================================== */

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    containers.forEach(el => observer.observe(el));
  }

  initReveal();

  /* ==========================================================
     ACCORDIONS INTELLIGENTS
  ========================================================== */

  function initAccordions() {
    const titles = document.querySelectorAll("h2");

    titles.forEach(title => {
      const content = title.nextElementSibling;
      if (!content) return;

      title.setAttribute("tabindex", "0");
      title.setAttribute("aria-expanded", "false");

      function closeAll() {
        document.querySelectorAll(".toggle-content").forEach(c => {
          c.style.maxHeight = "0px";
          c.classList.remove("open");
        });

        document.querySelectorAll("h2").forEach(h => {
          h.setAttribute("aria-expanded", "false");
        });
      }

      function toggle() {
        const isOpen = title.getAttribute("aria-expanded") === "true";

        if (isOpen) {
          content.style.maxHeight = "0px";
          title.setAttribute("aria-expanded", "false");
        } else {
          closeAll();
          content.style.maxHeight = content.scrollHeight + "px";
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
     SCROLL TO TOP
  ========================================================== */

  function initScrollTop() {
    const btn = document.createElement("button");
    btn.innerHTML = "↑";

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      border: "none",
      background: "#5f6f52",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
      opacity: "0",
      transform: "translateY(20px)",
      transition: "all .3s ease",
      zIndex: "9999"
    });

    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      btn.style.opacity = window.scrollY > 300 ? "1" : "0";
      btn.style.transform = window.scrollY > 300 ? "translateY(0)" : "translateY(20px)";
    });
  }

  initScrollTop();

  /* ==========================================================
     DARK MODE AVANCÉ
  ========================================================== */

  function initDarkMode() {
    const btn = document.createElement("button");
    btn.innerHTML = isDarkMode ? "☀️" : "🌙";
    btn.setAttribute("aria-label", "Toggle dark mode");

    Object.assign(btn.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "none",
      background: "#222",
      color: "white",
      cursor: "pointer",
      zIndex: "10000",
      transition: "0.3s"
    });

    document.body.appendChild(btn);

    if (isDarkMode) {
      body.classList.add("dark-mode");
      createStars();
    }

    btn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      body.classList.toggle("dark-mode");

      btn.innerHTML = isDarkMode ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDarkMode);

      if (isDarkMode) createStars();
      else clearStars();
    });
  }

  initDarkMode();

  /* ==========================================================
     STARS (OPTIMISÉES)
  ========================================================== */

  function createStars() {
    clearStars();

    const count = 40;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const size = Math.random() * 3;

      Object.assign(star.style, {
        width: size + "px",
        height: size + "px",
        top: Math.random() * 100 + "vh",
        left: Math.random() * 100 + "vw",
        animationDelay: Math.random() * 3 + "s"
      });

      document.body.appendChild(star);
      stars.push(star);
    }
  }

  function clearStars() {
    stars.forEach(s => s.remove());
    stars = [];
  }

  /* ==========================================================
     PARTICLES PREMIUM
  ========================================================== */

  function initParticles() {
    particlesCanvas = document.createElement("canvas");
    particlesCanvas.id = "particles-canvas";

    document.body.appendChild(particlesCanvas);

    particlesCtx = particlesCanvas.getContext("2d");

    resizeCanvas();
    createParticles();

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createParticles();
      }, 150);
    });

    animate();
  }

  function resizeCanvas() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];

    const count = window.innerWidth < 768 ? 30 : 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 2
      });
    }
  }

  function animate() {
    if (!animationActive) return;

    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = particlesCanvas.width;
      if (p.x > particlesCanvas.width) p.x = 0;
      if (p.y < 0) p.y = particlesCanvas.height;
      if (p.y > particlesCanvas.height) p.y = 0;

      particlesCtx.beginPath();
      particlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      particlesCtx.fillStyle = isDarkMode
        ? "rgba(255,255,255,0.15)"
        : "rgba(95,111,52,0.2)";

      particlesCtx.fill();

      /* CONNECTION LINES */
      particles.forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          particlesCtx.beginPath();
          particlesCtx.strokeStyle = isDarkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(95,111,52,0.08)";

          particlesCtx.lineWidth = 1;
          particlesCtx.moveTo(p.x, p.y);
          particlesCtx.lineTo(p2.x, p2.y);
          particlesCtx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  initParticles();

  /* ==========================================================
     PERFORMANCE CONTROL
  ========================================================== */

  document.addEventListener("visibilitychange", () => {
    animationActive = !document.hidden;

    if (animationActive) animate();
  });

});

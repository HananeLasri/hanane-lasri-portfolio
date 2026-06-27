document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     STATE GLOBAL
  ========================= */

  const body = document.body;
  const welcome = document.getElementById("welcome-message");
  const containers = document.querySelectorAll(".container");

  let isDarkMode = localStorage.getItem("darkMode") === "true";

  let particlesCanvas, particlesCtx;
  let particles = [];
  let stars = [];

  let animationRunning = true;
  let animationId = null;

  /* =========================
     WELCOME SCREEN
  ========================= */

  function initWelcome() {
    if (!welcome) return;

    setTimeout(() => {
      welcome.classList.add("fade-out");
    }, 1800);

    setTimeout(() => {
      welcome.remove();
      body.classList.add("ready");
    }, 2800);
  }

  initWelcome();

  /* =========================
     SCROLL REVEAL PREMIUM
  ========================= */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  containers.forEach(el => observer.observe(el));

  /* =========================
     ACCORDIONS ULTRA STABLE
  ========================= */

  document.querySelectorAll("h2").forEach(title => {

    const content = title.nextElementSibling;
    if (!content) return;

    title.tabIndex = 0;
    title.setAttribute("aria-expanded", "false");

    const closeAll = () => {
      document.querySelectorAll(".toggle-content").forEach(c => {
        c.style.maxHeight = "0px";
        c.classList.remove("open");
      });

      document.querySelectorAll("h2").forEach(h => {
        h.setAttribute("aria-expanded", "false");
      });
    };

    const toggle = () => {
      const open = title.getAttribute("aria-expanded") === "true";

      if (open) {
        content.style.maxHeight = "0px";
        title.setAttribute("aria-expanded", "false");
      } else {
        closeAll();
        content.style.maxHeight = content.scrollHeight + "px";
        title.setAttribute("aria-expanded", "true");
      }
    };

    title.addEventListener("click", toggle);
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  /* =========================
     SCROLL TO TOP PREMIUM
  ========================= */

  const scrollBtn = document.createElement("button");
  scrollBtn.innerHTML = "↑";

  Object.assign(scrollBtn.style, {
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

  document.body.appendChild(scrollBtn);

  scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", () => {
    const show = window.scrollY > 250;
    scrollBtn.style.opacity = show ? "1" : "0";
    scrollBtn.style.transform = show ? "translateY(0)" : "translateY(20px)";
  });

  /* =========================
     DARK MODE FINAL
  ========================= */

  function initDarkMode() {
    const btn = document.createElement("button");
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
      zIndex: "10000",
      transition: "all .3s ease"
    });

    document.body.appendChild(btn);

    if (isDarkMode) {
      body.classList.add("dark-mode");
      createStars();
    }

    btn.onclick = () => {
      isDarkMode = !isDarkMode;

      body.classList.toggle("dark-mode");
      localStorage.setItem("darkMode", isDarkMode);

      btn.innerHTML = isDarkMode ? "☀️" : "🌙";

      if (isDarkMode) createStars();
      else clearStars();
    };
  }

  initDarkMode();

  /* =========================
     STARS SYSTEM CLEAN
  ========================= */

  function createStars() {
    clearStars();

    for (let i = 0; i < 45; i++) {
      const star = document.createElement("div");
      star.className = "star";

      Object.assign(star.style, {
        width: Math.random() * 3 + "px",
        height: Math.random() * 3 + "px",
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

  /* =========================
     PARTICLES ULTRA OPTIMIZED
  ========================= */

  function initParticles() {
    particlesCanvas = document.createElement("canvas");
    particlesCanvas.id = "particles-canvas";

    document.body.appendChild(particlesCanvas);

    particlesCtx = particlesCanvas.getContext("2d");

    resize();
    generate();

    window.addEventListener("resize", debounce(() => {
      resize();
      generate();
    }, 120));

    loop();
  }

  function resize() {
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
  }

  function generate() {
    particles = [];

    const count = window.innerWidth < 768 ? 25 : 70;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * particlesCanvas.width,
        y: Math.random() * particlesCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
      });
    }
  }

  function loop() {
    if (!animationRunning) return;

    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = particlesCanvas.width;
      if (p.y < 0) p.y = particlesCanvas.height;
      if (p.x > particlesCanvas.width) p.x = 0;
      if (p.y > particlesCanvas.height) p.y = 0;

      particlesCtx.beginPath();
      particlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      particlesCtx.fillStyle = isDarkMode
        ? "rgba(255,255,255,0.15)"
        : "rgba(95,111,82,0.18)";

      particlesCtx.fill();
    }

    animationId = requestAnimationFrame(loop);
  }

  initParticles();

  /* =========================
     PERFORMANCE CONTROL
  ========================= */

  document.addEventListener("visibilitychange", () => {
    animationRunning = !document.hidden;

    if (animationRunning) loop();
    else cancelAnimationFrame(animationId);
  });

  /* =========================
     UTIL
  ========================= */

  function debounce(fn, delay) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }

});

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     🔥 INITIALISATION GLOBALE
  ======================================================= */

  const body = document.body;
  const welcome = document.getElementById("welcome-message");

  let isDarkMode = false;
  let particlesCanvas = null;
  let particlesCtx = null;
  let particlesArray = [];

  /* =======================================================
     🌟 INTRO ANIMATION (WELCOME SCREEN)
  ======================================================= */

  function initWelcomeScreen() {
    if (!welcome) return;

    body.classList.remove("ready");

    setTimeout(() => {
      welcome.classList.add("fade-out");
    }, 2500);

    setTimeout(() => {
      welcome.remove();
      body.classList.add("ready");

      // animation containers
      document.querySelectorAll(".container").forEach((container, index) => {
        container.style.opacity = 0;
        container.style.transform = "translateY(50px)";
        container.style.transition = "all 1s ease";

        setTimeout(() => {
          container.style.opacity = 1;
          container.style.transform = "translateY(0)";
        }, index * 150);
      });

    }, 3500);
  }

  initWelcomeScreen();

  /* =======================================================
     📦 ACCORDÉONS H2 (SECTIONS PRINCIPALES)
  ======================================================= */

  function initMainAccordions() {
    const titles = document.querySelectorAll("h2");

    titles.forEach(title => {
      const content = title.nextElementSibling;
      if (!content) return;

      content.style.maxHeight = "0px";
      content.style.overflow = "hidden";

      title.setAttribute("tabindex", "0");
      title.setAttribute("aria-expanded", "false");

      function toggle() {
        const isOpen = title.getAttribute("aria-expanded") === "true";

        title.setAttribute("aria-expanded", !isOpen);

        if (isOpen) {
          content.style.maxHeight = "0px";
          content.classList.remove("open");
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          content.classList.add("open");
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

  initMainAccordions();

  /* =======================================================
     📚 ACCORDÉONS PROFONDS (CERTIFICATS / DIPLÔMES)
  ======================================================= */

  function initDeepAccordions() {
    const sections = document.querySelectorAll("#certificats, #diplomes");

    sections.forEach(section => {
      const titles = section.querySelectorAll("h3, h4");

      titles.forEach(title => {
        const content = title.nextElementSibling;
        if (!content) return;

        content.style.maxHeight = "0px";
        content.style.overflow = "hidden";

        title.style.cursor = "pointer";
        title.setAttribute("tabindex", "0");
        title.setAttribute("aria-expanded", "false");

        function toggle() {
          const open = title.getAttribute("aria-expanded") === "true";

          title.setAttribute("aria-expanded", !open);

          if (open) {
            content.style.maxHeight = "0px";
            content.classList.remove("open");
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
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
    });
  }

  initDeepAccordions();

  /* =======================================================
     ⬆️ BOUTON SCROLL TOP
  ======================================================= */

  function createScrollToTop() {
    const btn = document.createElement("button");
    btn.innerText = "↑";

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      border: "none",
      background: "#4ca1af",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
      opacity: "0",
      transition: "0.3s",
      zIndex: "9999"
    });

    body.appendChild(btn);

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        btn.style.opacity = "1";
      } else {
        btn.style.opacity = "0";
      }
    });
  }

  createScrollToTop();

  /* =======================================================
     🌙 DARK MODE AVANCÉ
  ======================================================= */

  function createDarkMode() {
    const btn = document.createElement("button");
    btn.innerText = "🌙";

    Object.assign(btn.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      border: "none",
      background: "#222",
      color: "#fff",
      cursor: "pointer",
      fontSize: "18px",
      zIndex: "10000"
    });

    body.appendChild(btn);

    btn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      body.classList.toggle("dark-mode");

      btn.innerText = isDarkMode ? "☀️" : "🌙";

      toggleStars(isDarkMode);
    });
  }

  function toggleStars(enable) {
    if (!enable) {
      document.querySelectorAll(".star").forEach(s => s.remove());
      return;
    }

    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";

      star.style.position = "fixed";
      star.style.width = Math.random() * 3 + "px";
      star.style.height = star.style.width;
      star.style.background = "white";
      star.style.borderRadius = "50%";
      star.style.top = Math.random() * 100 + "vh";
      star.style.left = Math.random() * 100 + "vw";
      star.style.opacity = Math.random();
      star.style.animation = "twinkle 3s infinite";

      document.body.appendChild(star);
    }
  }

  createDarkMode();

  /* =======================================================
     🌌 PARTICULES AMÉLIORÉES
  ======================================================= */

  function initParticles() {
    particlesCanvas = document.createElement("canvas");
    particlesCanvas.id = "particles-canvas";

    Object.assign(particlesCanvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: "-1"
    });

    body.appendChild(particlesCanvas);

    particlesCtx = particlesCanvas.getContext("2d");

    function resize() {
      particlesCanvas.width = window.innerWidth;
      particlesCanvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resize);
    resize();

    function createParticles() {
      particlesArray = [];
      for (let i = 0; i < 120; i++) {
        particlesArray.push({
          x: Math.random() * particlesCanvas.width,
          y: Math.random() * particlesCanvas.height,
          size: Math.random() * 3,
          speedX: (Math.random() - 0.5),
          speedY: (Math.random() - 0.5)
        });
      }
    }

    function animate() {
      particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

      particlesArray.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = particlesCanvas.width;
        if (p.x > particlesCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particlesCanvas.height;
        if (p.y > particlesCanvas.height) p.y = 0;

        particlesCtx.beginPath();
        particlesCtx.fillStyle = "rgba(255,255,255,0.4)";
        particlesCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        particlesCtx.fill();
      });

      requestAnimationFrame(animate);
    }

    createParticles();
    animate();
  }

  initParticles();

  /* =======================================================
     🖼️ PHOTO PROFIL ANIMATION
  ======================================================= */

  function initPhoto() {
    const photo = document.querySelector(".photo-profil");
    if (!photo) return;

    photo.addEventListener("mouseenter", () => {
      photo.style.transform = "scale(1.1) rotate(2deg)";
      photo.style.transition = "0.5s";
    });

    photo.addEventListener("mouseleave", () => {
      photo.style.transform = "scale(1)";
    });
  }

  initPhoto();

});

document.addEventListener("DOMContentLoaded", () => {

  const body = document.body;
  const welcome = document.getElementById("welcome-message");

  /* =======================================================
     🌟 WELCOME SCREEN (FIX + SMOOTH)
  ======================================================= */
  function initWelcomeScreen() {
    if (!welcome) return;

    setTimeout(() => {
      welcome.classList.add("fade-out");
    }, 2500);

    setTimeout(() => {
      welcome.remove();
      body.classList.add("ready");

      revealContainers();
    }, 3500);
  }

  /* animation apparition sections */
  function revealContainers() {
    document.querySelectorAll(".container").forEach((el, i) => {
      setTimeout(() => {
        el.classList.add("visible");
      }, i * 150);
    });
  }

  initWelcomeScreen();


  /* =======================================================
     📌 ACCORDÉONS H2 (SMOOTH + ACCESSIBLE)
  ======================================================= */
  function initAccordions() {
    document.querySelectorAll("h2").forEach(title => {
      const content = title.nextElementSibling;
      if (!content) return;

      content.style.maxHeight = "0px";
      title.setAttribute("aria-expanded", "false");
      title.style.cursor = "pointer";

      const toggle = () => {
        const isOpen = content.classList.contains("open");

        if (isOpen) {
          content.classList.remove("open");
          content.style.maxHeight = "0px";
          title.setAttribute("aria-expanded", "false");
        } else {
          content.classList.add("open");
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
  }

  initAccordions();


  /* =======================================================
     📚 ACCORDÉONS CERTIFICATS (NIVEAU AVANCÉ)
  ======================================================= */
  function initNestedAccordions() {
    const sections = document.querySelectorAll("#certificats, #diplomes, section");

    sections.forEach(section => {
      const titles = section.querySelectorAll("h3, h4");

      titles.forEach(title => {
        const content = title.nextElementSibling;
        if (!content) return;

        content.style.maxHeight = "0px";
        title.setAttribute("aria-expanded", "false");
        title.style.cursor = "pointer";

        const toggle = () => {
          const isOpen = content.classList.contains("open");

          if (isOpen) {
            content.classList.remove("open");
            content.style.maxHeight = "0px";
            title.setAttribute("aria-expanded", "false");
          } else {
            content.classList.add("open");
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
    });
  }

  initNestedAccordions();


  /* =======================================================
     🔝 BOUTON SCROLL TOP (PRO)
  ======================================================= */
  function initScrollTop() {
    const btn = document.createElement("button");

    btn.textContent = "↑";
    btn.setAttribute("aria-label", "Retour en haut");

    Object.assign(btn.style, {
      position: "fixed",
      bottom: "25px",
      right: "25px",
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      border: "none",
      background: "#5f6f52",
      color: "#fff",
      fontSize: "18px",
      cursor: "pointer",
      opacity: "0",
      transition: "0.4s",
      zIndex: "9999"
    });

    document.body.appendChild(btn);

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

  initScrollTop();


  /* =======================================================
     🌙 DARK MODE (AVEC MÉMOIRE LOCAL)
  ======================================================= */
  function initDarkMode() {
    const btn = document.createElement("button");

    btn.textContent = "🌙";
    btn.setAttribute("aria-label", "Mode sombre");

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
      zIndex: "10000"
    });

    document.body.appendChild(btn);

    // load saved mode
    if (localStorage.getItem("darkMode") === "true") {
      body.classList.add("dark-mode");
      btn.textContent = "☀️";
    }

    btn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      const isDark = body.classList.contains("dark-mode");

      btn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("darkMode", isDark);
    });
  }

  initDarkMode();


  /* =======================================================
     ✨ PARTICULES ANIMÉES
  ======================================================= */
  function initParticles() {
    const canvas = document.createElement("canvas");
    canvas.id = "particles-canvas";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];

      const count = Math.floor(window.innerWidth / 25);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 1,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    resize();
    createParticles();
    animate();
  }

  initParticles();


  /* =======================================================
     🖼️ ANIMATION PHOTO PROFIL
  ======================================================= */
  function initPhoto() {
    const photo = document.querySelector(".photo-profil");
    if (!photo) return;

    photo.addEventListener("mouseenter", () => {
      photo.style.transform = "scale(1.1) rotate(2deg)";
    });

    photo.addEventListener("mouseleave", () => {
      photo.style.transform = "scale(1) rotate(0deg)";
    });
  }

  initPhoto();

});

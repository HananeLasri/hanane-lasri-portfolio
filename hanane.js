document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const welcome = document.getElementById("welcome-message");

  /* ------------------ ANIMATION D’INTRO ------------------ */
  body.classList.remove("ready");
  setTimeout(() => welcome.classList.add("fade-out"), 3000);
  setTimeout(() => {
    welcome.remove();
    body.classList.add("ready");

    document.querySelectorAll(".container").forEach(container => {
      container.style.opacity = 0;
      container.style.transform = "translateY(40px)";
      container.style.transition = "opacity 1s ease, transform 1s ease";
      setTimeout(() => {
        container.style.opacity = 1;
        container.style.transform = "translateY(0)";
      }, 50);
    });
  }, 4000);

  /* =======================================================
     ⚙️ ACCORDÉONS CERTIFICATS & DIPLÔMES (AMÉLIORÉ)
     ======================================================= */
  function initAccordeonsCertificats() {
    const mainSections = document.querySelectorAll("#certificats, #diplomes");

    mainSections.forEach(section => {
      const toggleTitles = section.querySelectorAll("h3, h4, h5");

      toggleTitles.forEach(title => {
        const content = title.nextElementSibling;
        if (!content) return;

        // Initialisation
        content.style.maxHeight = "0px";
        content.style.overflow = "hidden";
        content.classList.remove("open");
        title.setAttribute("aria-expanded", "false");
        title.setAttribute("tabindex", "0");
        title.style.cursor = "pointer";

        // Fonction toggle
        const toggleContent = () => {
          const isOpen = content.classList.contains("open");

          // Fermer les siblings du même niveau
          const siblings = [...title.parentElement.children].filter(el => el.tagName === title.tagName && el !== title);
          siblings.forEach(sib => {
            const sibContent = sib.nextElementSibling;
            if (sibContent && sibContent.classList.contains("open")) {
              sibContent.classList.remove("open");
              sibContent.style.maxHeight = "0px";
              sib.setAttribute("aria-expanded", "false");
            }
          });

          // Ouvrir ou fermer le contenu
          if (isOpen) {
            content.classList.remove("open");
            content.style.maxHeight = "0px";
            title.setAttribute("aria-expanded", "false");
          } else {
            content.classList.add("open");
            content.style.maxHeight = content.scrollHeight + "px";
            title.setAttribute("aria-expanded", "true");

            // Ajustement pour sous-accordéons
            setTimeout(() => {
              content.style.maxHeight = content.scrollHeight + "px";
            }, 300);
          }
        };

        // Événements click et clavier
        title.addEventListener("click", toggleContent);
        title.addEventListener("keydown", e => {
          if (["Enter", " "].includes(e.key)) {
            e.preventDefault();
            toggleContent();
          }
        });
      });
    });
  }
  initAccordeonsCertificats();

  /* =======================================================
     ⚙️ ACCORDÉONS GÉNÉRAUX (H2)
     ======================================================= */
  document.querySelectorAll("h2").forEach(title => {
    const content = title.nextElementSibling;
    if (!content) return;
    content.style.maxHeight = "0px";
    title.setAttribute("aria-expanded", "false");

    const toggle = () => {
      const expanded = title.getAttribute("aria-expanded") === "true";
      title.setAttribute("aria-expanded", String(!expanded));
      content.classList.toggle("open");
      content.style.maxHeight = !expanded ? content.scrollHeight + "px" : "0px";
    };

    title.addEventListener("click", toggle);
    title.addEventListener("keydown", e => {
      if (["Enter", " "].includes(e.key)) { e.preventDefault(); toggle(); }
    });
  });

  /* =======================================================
     🔝 BOUTON RETOUR HAUT
     ======================================================= */
  function initScrollBtn() {
    const scrollBtn = document.createElement("button");
    scrollBtn.textContent = "↑";
    scrollBtn.setAttribute("aria-label", "Remonter en haut");
    Object.assign(scrollBtn.style, {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      padding: "0.7rem 1.2rem",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "#4ca1af",
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "1.2rem",
      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
      opacity: "0",
      pointerEvents: "none",
      transition: "opacity 0.4s ease",
      zIndex: "9999"
    });
    body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      scrollBtn.style.opacity = window.scrollY > 300 ? "1" : "0";
      scrollBtn.style.pointerEvents = window.scrollY > 300 ? "auto" : "none";
    });
  }
  initScrollBtn();

  /* =======================================================
     🌙 BOUTON DARK MODE
     ======================================================= */
  function initDarkMode() {
    const darkModeBtn = document.createElement("button");
    darkModeBtn.textContent = "🌙";
    darkModeBtn.setAttribute("aria-label", "Basculer le mode sombre");
    Object.assign(darkModeBtn.style, {
      position: "fixed",
      top: "30px",
      right: "30px",
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "#222",
      color: "#fff",
      fontSize: "1.3rem",
      cursor: "pointer",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      zIndex: "10000",
      transition: "transform 0.4s ease, boxShadow 0.4s ease"
    });

    darkModeBtn.addEventListener("mouseenter", () => {
      darkModeBtn.style.transform = "rotate(15deg) scale(1.1)";
      darkModeBtn.style.boxShadow = "0 0 15px rgba(255,255,255,0.5)";
    });
    darkModeBtn.addEventListener("mouseleave", () => {
      darkModeBtn.style.transform = "rotate(0) scale(1)";
      darkModeBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
    });

    body.appendChild(darkModeBtn);

    darkModeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      darkModeBtn.textContent = isDark ? "☀️" : "🌙";
      const canvas = document.getElementById("particles-canvas");
      canvas.style.opacity = isDark ? "0" : "1";

      if (isDark) {
        for (let i = 0; i < 40; i++) {
          const star = document.createElement("div");
          star.classList.add("star");
          star.style.width = star.style.height = Math.random() * 3 + "px";
          star.style.top = Math.random() * 100 + "vh";
          star.style.left = Math.random() * 100 + "vw";
          star.style.animationDelay = Math.random() * 3 + "s";
          body.appendChild(star);
        }
      } else {
        document.querySelectorAll(".star").forEach(s => s.remove());
      }
    });
  }
  initDarkMode();

  /* =======================================================
     ✨ PARTICULES ANIMÉES DE FOND
     ======================================================= */
  function initParticles() {
    const canvas = document.createElement("canvas");
    canvas.id = "particles-canvas";
    Object.assign(canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      pointerEvents: "none",
      zIndex: "-1",
      transition: "opacity 0.5s ease"
    });
    body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let particlesArray = [];
    let mouse = { x: null, y: null };

    function createParticles() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      const numParticles = Math.floor(window.innerWidth / 20);

      for (let i = 0; i < numParticles; i++) {
        particlesArray.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        gradient.addColorStop(0, `rgba(255,255,255,${p.opacity})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (mouse.x && Math.hypot(p.x - mouse.x, p.y - mouse.y) < 80) {
          p.x += (p.x - mouse.x) * 0.02;
          p.y += (p.y - mouse.y) * 0.02;
        }

        if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", createParticles);
    window.addEventListener("mousemove", e => { mouse.x = e.x; mouse.y = e.y; });

    createParticles();
    animate();
  }
  initParticles();

  /* =======================================================
     🖼️ ANIMATION PHOTO DE PROFIL
     ======================================================= */
  function initProfilePhoto() {
    const photo = document.querySelector('.intro img.photo-profil');
    if (!photo) return;

    let scale = 1, growing = true, animationFrameId = null;

    function animateZoom() {
      if (growing) { scale += 0.005; if (scale >= 1.1) growing = false; }
      else { scale -= 0.005; if (scale <= 1) growing = true; }

      photo.style.transform = `scale(${scale.toFixed(3)})`;
      animationFrameId = requestAnimationFrame(animateZoom);
    }

    photo.addEventListener('mouseenter', () => { if (!animationFrameId) animateZoom(); });
    photo.addEventListener('mouseleave', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        scale = 1;
        photo.style.transform = 'scale(1)';
      }
    });
  }
  initProfilePhoto();
});

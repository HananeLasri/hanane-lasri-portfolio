"use strict";

/* ==========================================================
   HANANE LASRI - PREMIUM PORTFOLIO JS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const welcome = document.getElementById("welcome-message");
    const sections = document.querySelectorAll("section");
    const accordionTitles = document.querySelectorAll("main h2");

    /* ======================================================
       WELCOME SCREEN (OPTIMIZED)
    ====================================================== */

    function initWelcomeScreen() {

        if (!welcome) return;

        setTimeout(() => {

            welcome.classList.add("fade-out");

            setTimeout(() => {
                welcome.remove();
            }, 900);

        }, 2200);
    }

    initWelcomeScreen();

    /* ======================================================
       ACCORDIONS (ROBUST VERSION)
    ====================================================== */

    function initAccordions() {

        accordionTitles.forEach(title => {

            const content = title.nextElementSibling;
            if (!content) return;

            content.style.maxHeight = "0px";
            title.setAttribute("aria-expanded", "false");

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

    /* ======================================================
       DARK MODE (FIX + SAFE STORAGE)
    ====================================================== */

    function initDarkMode() {

        const btn = document.createElement("button");

        btn.id = "dark-mode-toggle";
        btn.setAttribute("aria-label", "Toggle dark mode");

        document.body.appendChild(btn);

        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            body.classList.add("dark-mode");
        }

        const updateIcon = () => {
            btn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
        };

        updateIcon();

        btn.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            localStorage.setItem(
                "theme",
                body.classList.contains("dark-mode") ? "dark" : "light"
            );

            updateIcon();
        });
    }

    initDarkMode();

    /* ======================================================
       REVEAL ON SCROLL (IMPROVED PERFORMANCE)
    ====================================================== */

    function initRevealAnimation() {

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);
                }
            });

        }, { threshold: 0.15 });

        sections.forEach(section => {
            section.classList.add("reveal");
            observer.observe(section);
        });
    }

    initRevealAnimation();

    /* ======================================================
       SCROLL TO TOP
    ====================================================== */

    function initScrollTop() {

        const btn = document.createElement("button");

        btn.id = "scroll-top";
        btn.innerHTML = "↑";
        btn.setAttribute("aria-label", "Scroll to top");

        document.body.appendChild(btn);

        window.addEventListener("scroll", () => {

            btn.classList.toggle("show", window.scrollY > 300);
        });

        btn.addEventListener("click", () => {

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    initScrollTop();

    /* ======================================================
       PARTICLES (OPTIMIZED + THEME SAFE)
    ====================================================== */

    function initParticles() {

        const canvas = document.createElement("canvas");

        canvas.id = "particles-canvas";
        document.body.prepend(canvas);

        const ctx = canvas.getContext("2d");

        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const create = () => {

            particles = [];

            const count = Math.floor(window.innerWidth / 22);

            for (let i = 0; i < count; i++) {

                particles.push({

                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 2 + 0.5,
                    dx: (Math.random() - 0.5) * 0.4,
                    dy: (Math.random() - 0.5) * 0.4
                });
            }
        };

        const draw = () => {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const color = body.classList.contains("dark-mode")
                ? "rgba(255,255,255,0.3)"
                : "rgba(95,111,82,0.25)";

            particles.forEach(p => {

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });

            requestAnimationFrame(draw);
        };

        resize();
        create();
        draw();

        window.addEventListener("resize", () => {
            resize();
            create();
        });
    }

    initParticles();

    /* ======================================================
       PROFILE PHOTO
    ====================================================== */

    function initProfilePhoto() {

        const photo = document.querySelector(".photo-profil");
        if (!photo) return;

        photo.addEventListener("mouseenter", () => {
            photo.style.transform = "scale(1.05)";
        });

        photo.addEventListener("mouseleave", () => {
            photo.style.transform = "";
        });
    }

    initProfilePhoto();

    /* ======================================================
       KEYBOARD NAV (ESC CLOSE)
    ====================================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            document.querySelectorAll(".toggle-content.open").forEach(el => {
                el.classList.remove("open");
                el.style.maxHeight = "0px";
            });

            document.querySelectorAll("h2[aria-expanded='true']").forEach(h => {
                h.setAttribute("aria-expanded", "false");
            });
        }
    });

});

"use strict";

/* ==========================================================
   Hanane Lasri Portfolio
   script.js
   PARTIE 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;
    const welcome = document.getElementById("welcome-message");
    const accordionTitles = document.querySelectorAll("main h2");

    /* ======================================================
       WELCOME SCREEN
    ====================================================== */

    function initWelcomeScreen() {

        if (!welcome) return;

        setTimeout(() => {

            welcome.classList.add("fade-out");

            setTimeout(() => {

                welcome.remove();

            }, 1000);

        }, 2500);

    }

    initWelcomeScreen();

    /* ======================================================
       ACCORDIONS
    ====================================================== */

    function initAccordions() {

        accordionTitles.forEach(title => {

            const content = title.nextElementSibling;

            if (!content) return;

            title.setAttribute("aria-expanded", "false");

            content.style.maxHeight = "0px";

            function toggleAccordion() {

                const opened = content.classList.contains("open");

                if (opened) {

                    content.classList.remove("open");
                    content.style.maxHeight = "0px";
                    title.setAttribute("aria-expanded", "false");

                } else {

                    content.classList.add("open");
                    content.style.maxHeight = content.scrollHeight + "px";
                    title.setAttribute("aria-expanded", "true");

                }

            }

            title.addEventListener("click", toggleAccordion);

            title.addEventListener("keydown", (event) => {

                if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();
                    toggleAccordion();

                }

            });

        });

    }

    initAccordions();

    /* ======================================================
       DARK MODE
    ====================================================== */

    function initDarkMode() {

        const button = document.createElement("button");

        button.id = "dark-mode-toggle";

        button.setAttribute("aria-label", "Dark Mode");

        body.appendChild(button);

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            body.classList.add("dark-mode");

        }

        updateIcon();

        function updateIcon() {

            button.textContent = body.classList.contains("dark-mode")
                ? "☀️"
                : "🌙";

        }

        button.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            const theme = body.classList.contains("dark-mode")
                ? "dark"
                : "light";

            localStorage.setItem("theme", theme);

            updateIcon();

        });

    }

    initDarkMode();

    /* ======================================================
       REVEAL ON SCROLL
    ====================================================== */

    function initRevealAnimation() {

        const elements = document.querySelectorAll("section");

        const observer = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                }

            });

        }, {

            threshold: 0.15

        });

        elements.forEach(section => {

            section.style.opacity = "0";
            section.style.transform = "translateY(40px)";
            section.style.transition = "all .8s ease";

            observer.observe(section);

        });

    }

    initRevealAnimation();





                              /* ======================================================
       SCROLL TO TOP BUTTON
    ====================================================== */

    function initScrollTop() {

        const button = document.createElement("button");

        button.id = "scroll-top";

        button.setAttribute("aria-label", "Back to top");

        button.innerHTML = "↑";

        document.body.appendChild(button);

        window.addEventListener("scroll", () => {

            if (window.scrollY > 300) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        });

        button.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    initScrollTop();

    /* ======================================================
       PARTICLES BACKGROUND
    ====================================================== */

    function initParticles() {

        const canvas = document.createElement("canvas");

        canvas.id = "particles-canvas";

        document.body.prepend(canvas);

        const ctx = canvas.getContext("2d");

        let particles = [];

        function resizeCanvas() {

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        }

        function createParticles() {

            particles = [];

            const number = Math.floor(window.innerWidth / 18);

            for (let i = 0; i < number; i++) {

                particles.push({

                    x: Math.random() * canvas.width,

                    y: Math.random() * canvas.height,

                    radius: Math.random() * 2 + 1,

                    dx: (Math.random() - 0.5) * 0.4,

                    dy: (Math.random() - 0.5) * 0.4

                });

            }

        }

        function drawParticles() {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const color = body.classList.contains("dark-mode")

                ? "rgba(255,255,255,0.35)"

                : "rgba(95,111,82,0.25)";

            particles.forEach(particle => {

                ctx.beginPath();

                ctx.arc(

                    particle.x,

                    particle.y,

                    particle.radius,

                    0,

                    Math.PI * 2

                );

                ctx.fillStyle = color;

                ctx.fill();

                particle.x += particle.dx;
                particle.y += particle.dy;

                if (

                    particle.x <= 0 ||

                    particle.x >= canvas.width

                ) {

                    particle.dx *= -1;

                }

                if (

                    particle.y <= 0 ||

                    particle.y >= canvas.height

                ) {

                    particle.dy *= -1;

                }

            });

            requestAnimationFrame(drawParticles);

        }

        resizeCanvas();

        createParticles();

        drawParticles();

        window.addEventListener("resize", () => {

            resizeCanvas();

            createParticles();

        });

    }

    initParticles();

    /* ======================================================
       PROFILE PHOTO EFFECT
    ====================================================== */

    function initProfilePhoto() {

        const photo = document.querySelector(".photo-profil");

        if (!photo) return;

        photo.addEventListener("mousemove", () => {

            photo.style.transform = "scale(1.05)";

        });

        photo.addEventListener("mouseleave", () => {

            photo.style.transform = "";

        });

    }

    initProfilePhoto();



    /* ======================================================
       PERFORMANCE + CLEANUP
    ====================================================== */

    function initPerformanceOptimizations() {

        // Réduit les animations si l'utilisateur préfère moins de mouvement
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        if (prefersReducedMotion.matches) {

            document.querySelectorAll("*").forEach(el => {

                el.style.animation = "none";
                el.style.transition = "none";

            });

        }

    }

    initPerformanceOptimizations();

    /* ======================================================
       KEYBOARD ACCESSIBILITY IMPROVEMENT
    ====================================================== */

    function initKeyboardNavigation() {

        document.addEventListener("keydown", (e) => {

            // ESC ferme tous les accordéons ouverts
            if (e.key === "Escape") {

                document.querySelectorAll(".toggle-content.open").forEach(content => {

                    content.classList.remove("open");
                    content.style.maxHeight = "0px";

                });

                document.querySelectorAll("h2[aria-expanded='true']").forEach(title => {

                    title.setAttribute("aria-expanded", "false");

                });

            }

        });

    }

    initKeyboardNavigation();

    /* ======================================================
       SMOOTH SCROLL IMPROVEMENT (optional UX polish)
    ====================================================== */

    function initSmoothScrollEnhancement() {

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {

            anchor.addEventListener("click", function (e) {

                const target = document.querySelector(this.getAttribute("href"));

                if (target) {

                    e.preventDefault();

                    target.scrollIntoView({

                        behavior: "smooth"

                    });

                }

            });

        });

    }

    initSmoothScrollEnhancement();

});
                          

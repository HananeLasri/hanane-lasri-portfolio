/* ==========================================================
   HANANE LASRI PORTFOLIO
   PREMIUM JS 2026
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    /* ======================================================
       WELCOME SCREEN
    ====================================================== */

    const welcome = document.getElementById("welcome-message");

    if (welcome) {

        setTimeout(() => {

            welcome.classList.add("fade-out");

            setTimeout(() => {
                welcome.remove();
            }, 800);

        }, 2200);
    }

    /* ======================================================
       ACCORDIONS
    ====================================================== */

    const accordionButtons =
        document.querySelectorAll(".accordion-btn");

    accordionButtons.forEach(button => {

        const content = button.nextElementSibling;

        if (!content) return;

        const toggleAccordion = () => {

            const isOpen =
                content.classList.contains("open");

            if (isOpen) {

                content.classList.remove("open");
                content.style.maxHeight = null;

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                content.classList.add("open");

                content.style.maxHeight =
                    content.scrollHeight + "px";

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        };

        button.addEventListener(
            "click",
            toggleAccordion
        );

        button.addEventListener(
            "keydown",
            (e) => {

                if (
                    e.key === "Enter" ||
                    e.key === " "
                ) {

                    e.preventDefault();

                    toggleAccordion();
                }
            }
        );
    });

    /* ======================================================
       DARK MODE
    ====================================================== */

    const darkModeBtn =
        document.createElement("button");

    darkModeBtn.id =
        "dark-mode-toggle";

    document.body.appendChild(
        darkModeBtn
    );

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add(
            "dark-mode"
        );
    }

    const updateThemeIcon = () => {

        const dark =
            body.classList.contains(
                "dark-mode"
            );

        darkModeBtn.textContent =
            dark ? "☀️" : "🌙";

        darkModeBtn.setAttribute(
            "aria-pressed",
            dark
        );
    };

    updateThemeIcon();

    darkModeBtn.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                body.classList.contains(
                    "dark-mode"
                )
                    ? "dark"
                    : "light"
            );

            updateThemeIcon();
        }
    );

    /* ======================================================
       REVEAL ON SCROLL
    ====================================================== */

    const sections =
        document.querySelectorAll("section");

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                });

            },

            {
                threshold: 0.15
            }
        );

    sections.forEach(section => {

        section.classList.add(
            "reveal"
        );

        observer.observe(section);
    });

    /* ======================================================
       SCROLL TO TOP
    ====================================================== */

    const scrollBtn =
        document.createElement("button");

    scrollBtn.id =
        "scroll-top";

    scrollBtn.innerHTML = "↑";

    scrollBtn.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(
        scrollBtn
    );

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 300
            ) {

                scrollBtn.classList.add(
                    "show"
                );

            } else {

                scrollBtn.classList.remove(
                    "show"
                );
            }
        }
    );

    scrollBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"
            });
        }
    );

    /* ======================================================
       PARTICLES
    ====================================================== */

    if (window.innerWidth > 768) {

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.id =
            "particles-canvas";

        document.body.prepend(
            canvas
        );

        const ctx =
            canvas.getContext("2d");

        let particles = [];

        const resizeCanvas = () => {

            canvas.width =
                window.innerWidth;

            canvas.height =
                window.innerHeight;
        };

        const createParticles = () => {

            particles = [];

            const count =
                Math.floor(
                    window.innerWidth / 30
                );

            for (
                let i = 0;
                i < count;
                i++
            ) {

                particles.push({

                    x:
                        Math.random() *
                        canvas.width,

                    y:
                        Math.random() *
                        canvas.height,

                    radius:
                        Math.random() * 2 + 1,

                    dx:
                        (Math.random() - 0.5) *
                        0.4,

                    dy:
                        (Math.random() - 0.5) *
                        0.4
                });
            }
        };

        const animate = () => {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            const color =
                body.classList.contains(
                    "dark-mode"
                )
                    ? "rgba(255,255,255,.25)"
                    : "rgba(95,111,82,.25)";

            particles.forEach(p => {

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    color;

                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;

                if (
                    p.x < 0 ||
                    p.x > canvas.width
                ) {
                    p.dx *= -1;
                }

                if (
                    p.y < 0 ||
                    p.y > canvas.height
                ) {
                    p.dy *= -1;
                }
            });

            requestAnimationFrame(
                animate
            );
        };

        resizeCanvas();
        createParticles();
        animate();

        window.addEventListener(
            "resize",
            () => {

                resizeCanvas();
                createParticles();
            }
        );
    }

    /* ======================================================
       ESC CLOSE ALL ACCORDIONS
    ====================================================== */

    document.addEventListener(
        "keydown",
        e => {

            if (
                e.key === "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".accordion-content.open"
                    )
                    .forEach(content => {

                        content.classList.remove(
                            "open"
                        );

                        content.style.maxHeight =
                            null;
                    });

                document
                    .querySelectorAll(
                        ".accordion-btn"
                    )
                    .forEach(button => {

                        button.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    });
            }
        }
    );
});

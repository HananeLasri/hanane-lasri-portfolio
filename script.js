"use strict";

/* ==========================================================
   HANANE LASRI PORTFOLIO
   SCRIPT.JS 2026
   PARTIE 1 / 3
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const welcome =
        document.getElementById("welcome-message");

    const accordionButtons =
        document.querySelectorAll(".accordion-btn");

    /* ======================================================
       WELCOME SCREEN
    ====================================================== */

    function initWelcomeScreen(){

        if(!welcome) return;

        setTimeout(() => {

            welcome.classList.add("fade-out");

            setTimeout(() => {

                welcome.remove();

            },800);

        },2200);

    }

    initWelcomeScreen();

    /* ======================================================
       ACCORDIONS
    ====================================================== */

    function initAccordions(){

        accordionButtons.forEach(button => {

            const content =
                button.nextElementSibling;

            if(!content) return;

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            content.style.maxHeight = "0px";

            function toggleAccordion(){

                const opened =
                    content.classList.contains("open");

                if(opened){

                    content.classList.remove("open");

                    content.style.maxHeight = "0px";

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

                else{

                    content.classList.add("open");

                    content.style.maxHeight =
                        content.scrollHeight + "px";

                    button.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }

            button.addEventListener(
                "click",
                toggleAccordion
            );

            button.addEventListener(
                "keydown",
                e => {

                    if(
                        e.key==="Enter" ||
                        e.key===" "
                    ){

                        e.preventDefault();

                        toggleAccordion();

                    }

                }
            );

        });

    }

    initAccordions();

    /* ======================================================
       DARK MODE
    ====================================================== */

    function initDarkMode(){

        const darkButton =
            document.createElement("button");

        darkButton.id =
            "dark-mode-toggle";

        darkButton.setAttribute(
            "aria-label",
            "Toggle Dark Mode"
        );

        document.body.appendChild(
            darkButton
        );

        function updateTheme(theme){

            if(theme==="dark"){

                body.classList.add(
                    "dark-mode"
                );

                darkButton.textContent="☀️";

            }

            else{

                body.classList.remove(
                    "dark-mode"
                );

                darkButton.textContent="🌙";

            }

        }

        const savedTheme =
            localStorage.getItem("theme");

        updateTheme(
            savedTheme || "light"
        );

        darkButton.addEventListener(
            "click",
            () => {

                const theme =
                    body.classList.contains("dark-mode")
                    ? "light"
                    : "dark";

                updateTheme(theme);

                localStorage.setItem(
                    "theme",
                    theme
                );

            }
        );

    }

    initDarkMode();
        /* ======================================================
       REVEAL ON SCROLL
    ====================================================== */

    function initRevealAnimation(){

        const sections =
            document.querySelectorAll("section");

        if(!("IntersectionObserver" in window)){

            sections.forEach(section=>{

                section.classList.add("visible");

            });

            return;

        }

        const observer =
            new IntersectionObserver(

                entries=>{

                    entries.forEach(entry=>{

                        if(entry.isIntersecting){

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

                    threshold:.15

                }

            );

        sections.forEach(section=>{

            section.classList.add("reveal");

            observer.observe(section);

        });

    }

    initRevealAnimation();

    /* ======================================================
       SCROLL TO TOP
    ====================================================== */

    function initScrollTop(){

        const button =
            document.createElement("button");

        button.id="scroll-top";

        button.innerHTML="↑";

        button.setAttribute(

            "aria-label",

            "Back to top"

        );

        document.body.appendChild(button);

        window.addEventListener(

            "scroll",

            ()=>{

                if(window.scrollY>300){

                    button.classList.add("show");

                }

                else{

                    button.classList.remove("show");

                }

            }

        );

        button.addEventListener(

            "click",

            ()=>{

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            }

        );

    }

    initScrollTop();

    /* ======================================================
       SMOOTH SCROLL
    ====================================================== */

    function initSmoothScroll(){

        const links =
            document.querySelectorAll(
                '.nav-links a[href^="#"]'
            );

        links.forEach(link=>{

            link.addEventListener(

                "click",

                event=>{

                    const target =
                        document.querySelector(
                            link.getAttribute("href")
                        );

                    if(!target) return;

                    event.preventDefault();

                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }

            );

        });

    }

    initSmoothScroll();

    /* ======================================================
       PROFILE PHOTO EFFECT
    ====================================================== */

    function initProfilePhoto(){

        const photo =
            document.querySelector(
                ".photo-profil"
            );

        if(!photo) return;

        photo.addEventListener(

            "mouseenter",

            ()=>{

                photo.style.transform =
                    "scale(1.05) rotate(-2deg)";

            }

        );

        photo.addEventListener(

            "mouseleave",

            ()=>{

                photo.style.transform="";

            }

        );

    }

    initProfilePhoto();
        /* ======================================================
       PARTICLES BACKGROUND
    ====================================================== */

    function initParticles(){

        if(window.innerWidth <= 768) return;

        const canvas =
            document.createElement("canvas");

        canvas.id = "particles-canvas";

        document.body.prepend(canvas);

        const ctx = canvas.getContext("2d");

        let particles = [];

        function resizeCanvas(){

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

        }

        function createParticles(){

            particles = [];

            const number =
                Math.floor(window.innerWidth / 35);

            for(let i = 0; i < number; i++){

                particles.push({

                    x:Math.random()*canvas.width,

                    y:Math.random()*canvas.height,

                    radius:Math.random()*2+1,

                    dx:(Math.random()-0.5)*0.30,

                    dy:(Math.random()-0.5)*0.30

                });

            }

        }

        function animate(){

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            const color =
                body.classList.contains("dark-mode")
                ? "rgba(255,255,255,.25)"
                : "rgba(95,111,82,.22)";

            particles.forEach(p=>{

                ctx.beginPath();

                ctx.arc(

                    p.x,

                    p.y,

                    p.radius,

                    0,

                    Math.PI*2

                );

                ctx.fillStyle = color;

                ctx.fill();

                p.x += p.dx;
                p.y += p.dy;

                if(

                    p.x<=0 ||

                    p.x>=canvas.width

                ){

                    p.dx *= -1;

                }

                if(

                    p.y<=0 ||

                    p.y>=canvas.height

                ){

                    p.dy *= -1;

                }

            });

            requestAnimationFrame(animate);

        }

        resizeCanvas();

        createParticles();

        animate();

        window.addEventListener(

            "resize",

            ()=>{

                resizeCanvas();

                createParticles();

            }

        );

    }

    initParticles();

    /* ======================================================
       ESC CLOSE ALL ACCORDIONS
    ====================================================== */

    function initKeyboardAccessibility(){

        document.addEventListener(

            "keydown",

            event=>{

                if(event.key==="Escape"){

                    document
                    .querySelectorAll(".accordion-content")
                    .forEach(content=>{

                        content.classList.remove("open");

                        content.style.maxHeight="0px";

                    });

                    accordionButtons.forEach(button=>{

                        button.setAttribute(

                            "aria-expanded",

                            "false"

                        );

                    });

                }

            }

        );

    }

    initKeyboardAccessibility();

    /* ======================================================
       REDUCED MOTION
    ====================================================== */

    function initReducedMotion(){

        const media =

        window.matchMedia(

            "(prefers-reduced-motion: reduce)"

        );

        if(media.matches){

            document
            .querySelectorAll("*")
            .forEach(element=>{

                element.style.animation="none";

                element.style.transition="none";

            });

        }

    }

    initReducedMotion();

    /* ======================================================
       CONSOLE
    ====================================================== */

    console.log(

        "%cHanane Lasri Portfolio 2026",

        "color:#5f6f52;font-size:16px;font-weight:bold;"

    );

    console.log(

        "Portfolio loaded successfully."

    );

});

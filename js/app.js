"use strict";

/* =============================================
   ELEMENTS
============================================= */

const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const scrollTopButton = document.getElementById("scroll-top");
const printCV = document.getElementById("print-cv");
const currentYear = document.getElementById("current-year");
const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)");


/* =============================================
   CURRENT YEAR
============================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =============================================
   RESPONSIVE MENU
============================================= */

function setMenuState(isOpen) {

    navMenu.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
    }

}


menuToggle.addEventListener("click", () => {

    setMenuState(!navMenu.classList.contains("active"));

});


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            setMenuState(false);

        });

    });


document.addEventListener("keydown", event => {

    if (event.key === "Escape" && navMenu.classList.contains("active")) {
        setMenuState(false);
        menuToggle.focus();
    }

});


/* =============================================
   DARK MODE
============================================= */

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");
    themeToggle.setAttribute("aria-pressed", "true");
    themeToggle.setAttribute("aria-label", "Activar tema claro");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeToggle.setAttribute("aria-pressed", "true");
        themeToggle.setAttribute("aria-label", "Activar tema claro");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");
        themeToggle.setAttribute("aria-pressed", "false");
        themeToggle.setAttribute("aria-label", "Activar tema oscuro");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? "auto" : "smooth"
    });

});


/* =============================================
   ACTIVE NAVBAR
============================================= */

const sections =
    document.querySelectorAll("section[id]");
const navLinks =
    document.querySelectorAll(".nav-link");


function updateScrollState() {

    const scrollY = window.scrollY;
    let activeSectionId = "";

    scrollTopButton.classList.toggle("show", scrollY > 500);

    sections.forEach(section => {

        const sectionHeight =
            section.offsetHeight;

        const sectionTop =
            section.offsetTop - 130;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            activeSectionId = sectionId;
        }

    });


    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${activeSectionId}`
        );
    });

}


window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();


/* =============================================
   TYPING EFFECT
============================================= */

const typingElement =
    document.querySelector(".typing-text");


const texts = [
    " | Full Stack Developer",
    " | DevOps Junior",
    " | Docente Tecnológico",
    " | Linux & VPS"
];


let textIndex = 0;
let characterIndex = 0;
let deleting = false;


function typingEffect() {

    const currentText =
        texts[textIndex];


    if (!deleting) {

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;


        if (characterIndex === currentText.length) {

            deleting = true;

            setTimeout(
                typingEffect,
                1600
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentText.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;


        if (characterIndex === 0) {

            deleting = false;

            textIndex =
                (textIndex + 1)
                % texts.length;

        }

    }


    setTimeout(
        typingEffect,
        deleting ? 38 : 72
    );

}


if (prefersReducedMotion.matches) {
    typingElement.textContent = texts[0];
} else {
    typingEffect();
}


/* =============================================
   PRINT / SAVE PDF
============================================= */

printCV.addEventListener("click", () => {

    window.print();

});


/* =============================================
   REVEAL ANIMATIONS
============================================= */

const animatedElements =
    document.querySelectorAll(
        ".focus-card, .stack-card, .timeline-content, .project-card, .education-card, .certification-item, .languages-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    if (prefersReducedMotion.matches) {
        return;
    }

    element.classList.add("reveal");
    observer.observe(element);

});

"use strict";

/* =============================================
   ELEMENTS
============================================= */

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const scrollTopButton = document.getElementById("scrollTop");
const printCV = document.getElementById("printCV");
const currentYear = document.getElementById("currentYear");


/* =============================================
   CURRENT YEAR
============================================= */

currentYear.textContent = new Date().getFullYear();


/* =============================================
   RESPONSIVE MENU
============================================= */

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


/* =============================================
   DARK MODE
============================================= */

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("theme", "light");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

});


/* =============================================
   SCROLL TOP
============================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTopButton.classList.add("show");

    } else {

        scrollTopButton.classList.remove("show");

    }

});


scrollTopButton.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =============================================
   ACTIVE NAVBAR
============================================= */

const sections =
    document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;


    sections.forEach(section => {

        const sectionHeight =
            section.offsetHeight;

        const sectionTop =
            section.offsetTop - 130;

        const sectionId =
            section.getAttribute("id");


        const menuLink =
            document.querySelector(
                `.nav-menu a[href="#${sectionId}"]`
            );


        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {

            document
                .querySelectorAll(".nav-link")
                .forEach(link => {
                    link.classList.remove("active");
                });


            if (menuLink) {
                menuLink.classList.add("active");
            }

        }

    });

});


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


typingEffect();


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

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


animatedElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(24px)";

    element.style.transition =
        "opacity .65s ease, transform .65s ease";

    observer.observe(element);

});

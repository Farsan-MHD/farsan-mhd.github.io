/* =========================
   NAVIGATION JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const themeToggle =
        document.getElementById("themeToggle");

    const themeIcon =
        document.querySelector(".theme-icon");


    /* =========================
       MOBILE MENU
       ========================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /*
         * Close mobile menu after
         * selecting a navigation link.
         */

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================
       NAVBAR SCROLL EFFECT
       ========================= */

    const updateNavbar = () => {

        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();


    /* =========================
       ACTIVE NAVIGATION
       ========================= */

    const sections =
        document.querySelectorAll("section[id]");


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute("id");


                        navLinks.forEach((link) => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });


    /* =========================
       THEME TOGGLE
       ========================= */

    if (themeToggle) {

        const savedTheme =
            localStorage.getItem("theme");


        if (savedTheme === "light") {

            document.body.classList.add("light-theme");

            themeIcon.textContent = "☀";

        }


        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light-theme"
                );


                const isLight =
                    document.body.classList.contains(
                        "light-theme"
                    );


                themeIcon.textContent =
                    isLight ? "☀" : "☾";


                localStorage.setItem(
                    "theme",
                    isLight ? "light" : "dark"
                );

            }
        );

    }

});

/* =========================
   HOME PAGE JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Smooth scrolling
     * for internal navigation links.
     */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /*
     * Simple button interaction
     */

    const primaryButton = document.querySelector(".btn-primary");

    if (primaryButton) {

        primaryButton.addEventListener("mouseenter", () => {
            primaryButton.classList.add("active");
        });

        primaryButton.addEventListener("mouseleave", () => {
            primaryButton.classList.remove("active");
        });

    }


    /*
     * Small dynamic greeting based on
     * the visitor's local time.
     */

    const heroLabel = document.querySelector(".hero-label");

    if (heroLabel) {

        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            heroLabel.textContent = "Good Morning • IT & Technology";
        } else if (hour >= 12 && hour < 18) {
            heroLabel.textContent = "IT & Technology Professional";
        } else {
            heroLabel.textContent = "IT & Technology Professional";
        }

    }

});

/* =========================
   ABOUT SECTION JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const highlightCards = document.querySelectorAll(".highlight-card");


    /*
     * Reveal animation when cards
     * enter the screen.
     */

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("about-visible");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    highlightCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition =
            `opacity 500ms ease ${index * 100}ms,
             transform 500ms ease ${index * 100}ms`;

        observer.observe(card);

    });


    /*
     * Add the visible state.
     */

    document.addEventListener("transitionrun", (event) => {

        if (
            event.target.classList &&
            event.target.classList.contains("highlight-card")
        ) {

            event.target.style.opacity = "1";
            event.target.style.transform = "translateY(0)";

        }

    });

});


/* =========================
   SKILLS SECTION JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const skillCards = document.querySelectorAll(".skill-card");


    /*
     * Reveal skill cards when they
     * enter the screen.
     */

    const skillsObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("skill-visible");

                    skillsObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    skillCards.forEach((card, index) => {

        /*
         * Add a small delay to each card
         * for a smooth staggered animation.
         */

        card.style.transitionDelay = `${index * 100}ms`;

        skillsObserver.observe(card);

    });


    /*
     * Reset transition delay after
     * the initial animation.
     */

    skillCards.forEach((card) => {

        card.addEventListener("transitionend", () => {

            card.style.transitionDelay = "0ms";

        });

    });

});


/* =========================
   EDUCATION SECTION JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const educationCards =
        document.querySelectorAll(".education-card");


    /*
     * Reveal cards when they become
     * visible on the screen.
     */

    const educationObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "education-visible"
                        );

                        educationObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    /*
     * Observe every education card
     * and create a small stagger effect.
     */

    educationCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 100}ms`;

        educationObserver.observe(card);

    });


    /*
     * Remove the animation delay after
     * the first animation finishes.
     */

    educationCards.forEach((card) => {

        card.addEventListener(
            "transitionend",
            () => {

                card.style.transitionDelay = "0ms";

            }
        );

    });

});


/* =========================
   CONTACT SECTION JAVASCRIPT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        /*
         * Basic validation
         */

        if (!name || !email || !subject || !message) {

            formStatus.textContent =
                "Please complete all fields.";

            return;
        }


        /*
         * Basic email validation
         */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            formStatus.textContent =
                "Please enter a valid email address.";

            return;
        }


        /*
         * Prepare mailto message.
         *
         * Replace the email address below
         * with your real email address.
         */

        const receiverEmail =
            "farsan.mhd@outlook.com";

        const emailBody =
            `Name: ${name}\n\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`;


        const mailtoLink =
            `mailto:${receiverEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(emailBody)}`;


        /*
         * Open the visitor's email application.
         */

        window.location.href = mailtoLink;


        formStatus.textContent =
            "Opening your email application...";

    });


    /*
     * Contact card reveal animation
     */

    const contactCards =
        document.querySelectorAll(".contact-card");


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateX(0)";

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    contactCards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform =
            "translateX(-20px)";

        card.style.transition =
            `opacity 500ms ease ${index * 100}ms,
             transform 500ms ease ${index * 100}ms,
             border-color 300ms ease,
             background 300ms ease`;

        observer.observe(card);

    });

});
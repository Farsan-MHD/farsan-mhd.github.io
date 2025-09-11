// for the page loader animation
window.addEventListener('load', function() {
    const loaderSection = document.getElementById('pageloaded-animation');
    loaderSection.style.opacity = '0';
    setTimeout(() => {
        loaderSection.style.display = 'none';
    }, 500);
});

// for the responsive navbar toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('#header-navbar nav');
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// for the typewriter effect
const roles = [
    "Web Developer",
    "Data Entry Clerk",
    "Graphic Designer (Canva)",
    "IT Support & Reporting"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
    const typewriter = document.getElementById("typewriter");
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
        typewriter.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1200);
        } else {
            setTimeout(typeWriter, 100);
        }
    } else {
        typewriter.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, 400);
        } else {
            setTimeout(typeWriter, 50);
        }
    }
}
window.addEventListener("DOMContentLoaded", typeWriter);

// Fade-in animation for About section when scrolled into view
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector(".royal-sakura-about");
    function revealAbout() {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            aboutSection.classList.add("visible");
            window.removeEventListener("scroll", revealAbout);
        }
    }
    window.addEventListener("scroll", revealAbout);
    revealAbout();
});

// Fade-in and slide-up animation for project cards on scroll
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll("#project-section .project-card");
    function revealCards() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                card.classList.add("visible");
            }
        });
    }
    window.addEventListener("scroll", revealCards);
    revealCards();
});

// Fade-in and slide-up animation for skill cards on scroll
document.addEventListener("DOMContentLoaded", function () {
  const skillCards = document.querySelectorAll("#skills-section .skill-card");
  function revealSkills() {
    skillCards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => card.classList.add("visible"), i * 120);
      }
    });
  }
  window.addEventListener("scroll", revealSkills);
  revealSkills();
});

// Animate cards on scroll
      document.addEventListener("DOMContentLoaded", function() {
        const cards = document.querySelectorAll('.animate-card');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if(entry.isIntersecting) {
              entry.target.classList.add('card-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        cards.forEach(card => observer.observe(card));
      });
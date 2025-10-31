let lastScroll = 0;
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Always show header at top of page
    if (currentScroll <= 0) {
      header.classList.remove('hide');
      header.classList.remove('scrolled');
      lastScroll = 0;
      return;
    }

    // Add shadow when not at top
    header.classList.add('scrolled');

    // Scrolling down -> hide header
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
      header.classList.add('hide');
    }
    // Scrolling up -> show header
    else if (currentScroll < lastScroll && header.classList.contains('hide')) {
      header.classList.remove('hide');
    }

    lastScroll = currentScroll;
  });

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');

navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
});

const roles = [
    "Web Developer",
    "Graphic Designer ( Canava )",
    "Stock Management Specialist",
    "Data Automation Specialist",
    "Excel Advanced User"
];

function typeWriter() {
    const typedTextSpan = document.querySelector("#typed-text");
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500); // Wait before typing next role
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }

    type();
}

// Start the typewriter effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');

  if (!navToggle || !nav) return;

  // ensure proper ARIA initial state
  navToggle.setAttribute('aria-expanded', 'false');

  // toggle nav
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const opened = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    hamburger.classList.toggle('is-active', opened);
    document.body.classList.toggle('no-scroll', opened);
  });

  // close when clicking any nav link (useful on mobile)
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    });
  });

  // close when clicking outside the header
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav-open')) return;
    if (e.target.closest('.header-container')) return;
    nav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('is-active');
    document.body.classList.remove('no-scroll');
  });
});

document.addEventListener('DOMContentLoaded', typeWriter);

// Page Loader
document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("pageloader");
    
    window.addEventListener("load", function() {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 500);
    });
});
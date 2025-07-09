window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hide');
        setTimeout(() => loader.style.display = 'none', 400);
    }

    // Animate .welcom-text after loader is hidden
    const welcomText = document.querySelector('.welcom-text');
    if (welcomText) {
        welcomText.style.transition = 'none';
        welcomText.style.transform = 'translateY(100%)';
        welcomText.style.opacity = '0';
        void welcomText.offsetWidth;
        setTimeout(() => {
            welcomText.style.transition = 'transform 0.8s cubic-bezier(.4,2,.6,1), opacity 0.7s';
            welcomText.style.transform = 'translateY(0)';
            welcomText.style.opacity = '1';
        }, 100);
    }

    // Responsive navbar toggle
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (toggle && navLinks) {
        toggle.onclick = () => {
            navLinks.style.transition = 'max-height 0.4s cubic-bezier(.4,2,.6,1), opacity 0.4s';
            navLinks.classList.toggle('active');
        };
    }
});


window.addEventListener('DOMContentLoaded', () => {
    const paragraphs = [
        "Hi, I’m Mohammed Farsan — a passionate Front-End Web Developer skilled in HTML, CSS, and JavaScript. I craft clean, responsive, and visually engaging websites that work flawlessly across devices.",
        "With a creative mindset and a love for problem-solving, I blend design and functionality to deliver user-friendly digital experiences. I’m currently expanding into Python and AI to build smarter web solutions.",
        "Always learning. Always building. Let’s create something amazing!"
    ];
    const typewriter = document.getElementById('typewriter');
    let p = 0, i = 0;

    function type() {
        if (typewriter && p < paragraphs.length) {
            // If starting a new paragraph, create a new <p>
            let currentP = typewriter.querySelector('p.typing');
            if (!currentP) {
                currentP = document.createElement('p');
                currentP.className = 'typing';
                typewriter.appendChild(currentP);
            }
            if (i <= paragraphs[p].length) {
                currentP.textContent = paragraphs[p].slice(0, i);
                i++;
                setTimeout(type, 18);
            } else {
                currentP.classList.remove('typing');
                i = 0;
                p++;
                setTimeout(type, 900);
            }
        }
    }
    type();
});

//skills list scrip
document.addEventListener('DOMContentLoaded', () => {
      // Animate progress bars when they come into view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressFill = entry.target.querySelector('.progress-fill');
            if (!progressFill.classList.contains('animate-progress')) {
              progressFill.classList.add('animate-progress');
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      
      document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
      });
      
      // Add glow effect on hover
      document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
          const highlightCircle = card.querySelector('.highlight-circle');
          highlightCircle.style.left = `${Math.random() * 60 + 20}%`;
          highlightCircle.style.top = `${Math.random() * 60 + 20}%`;
        });
      });
    });

const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('button[type="submit"]');
const btnText = submitBtn.querySelector('.btn-text');
const loader = submitBtn.querySelector('.loader');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
e.preventDefault();

if (!form.checkValidity()) {
    form.reportValidity();
    return;
}

startSendingAnimation();

const formData = new FormData(form);
const data = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    subject: formData.get('subject')
};

// Simulating form send for demo purposes
try {
    // Here you can do real sending by replacing this simulation below with your API call or Formspree endpoint.
    await new Promise(resolve => setTimeout(resolve, 2000));

    // On success:
    stopSendingAnimation();
    statusEl.textContent = 'Message sent successfully. Thank you!';
    statusEl.classList.remove('sr-only');
    form.reset();
} catch (err) {
    stopSendingAnimation();
    statusEl.textContent = 'Oops! Something went wrong. Please try again.';
    statusEl.classList.remove('sr-only');
}
});

form.addEventListener('reset', () => {
    statusEl.textContent = '';
    statusEl.classList.add('sr-only');
});

function startSendingAnimation() {
    form.classList.add('sending');
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
}

function stopSendingAnimation() {
    form.classList.remove('sending');
    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-busy');
    btnText.style.visibility = 'visible';
    loader.style.visibility = 'hidden';
}

// =========================================================

// Dropdown toggle
const aToggle = document.querySelector('.a-toggle');
const aDropdown = document.getElementById('aDropdown');
aToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    aDropdown.classList.toggle('active');
    aToggle.classList.toggle('active');
});
document.addEventListener('click', () => {
    aDropdown.classList.remove('active');
    aToggle.classList.remove('active');
});

// Language switching (simple demo)
const arText = {
    "Welcome to My Portfolio": "مرحبًا بكم في ملفي الشخصي",
    "Explore my projects and skills in web development.": "استكشف مشاريعي ومهاراتي في تطوير الويب.",
    "My Technical Expertise": "خبرتي التقنية",
    "A comprehensive display of my web development skills and proficiency levels": "عرض شامل لمهاراتي ومستوى إتقاني في تطوير الويب",
    "My Projects": "مشاريعي",
    "A showcase of my real-world projects and creative solutions": "عرض لمشاريعي الواقعية وحلول الإبداعية",
    "Contact": "اتصل بي",
    "Hi, I’m Mohammed Farsan — a passionate Front-End Web Developer skilled in HTML, CSS, and JavaScript. I craft clean, responsive, and visually engaging websites that work flawlessly across devices.":"مرحباً، أنا محمد فرسان، مطور ويب شغوف بواجهات المستخدم الأمامية، متخصص في HTML وCSS وJavaScript. أصمم مواقع ويب أنيقة، سريعة الاستجابة، وجذابة بصرياً، تعمل بسلاسة على جميع الأجهزة.",
    "With a creative mindset and a love for problem-solving, I blend design and functionality to deliver user-friendly digital experiences. I’m currently expanding into Python and AI to build smarter web solutions.":"بعقلية إبداعية وشغف بحل المشكلات، أدمج التصميم والوظائف لتقديم تجارب رقمية سهلة الاستخدام. أعمل حاليًا على توسيع نطاقي في بايثون والذكاء الاصطناعي لبناء حلول ويب أكثر ذكاءً.",
    "Always learning. Always building. Let’s create something amazing!":"نتعلم دائمًا، ونبني دائمًا. هيا نبتكر شيئًا مذهلًا!",
    "Projects":"المشاريع",
    "Skills":"مهارات",
    "About":"عن",
    "Home":"بيت"
    // Add more as needed...
};
const enText = {
    "مرحبًا بكم في ملفي الشخصي": "Welcome to My Portfolio",
    "استكشف مشاريعي ومهاراتي في تطوير الويب.": "Explore my projects and skills in web development.",
    "خبرتي التقنية": "My Technical Expertise",
    "عرض شامل لمهاراتي ومستوى إتقاني في تطوير الويب": "A comprehensive display of my web development skills and proficiency levels",
    "مشاريعي": "My Projects",
    "عرض لمشاريعي الواقعية وحلول الإبداعية": "A showcase of my real-world projects and creative solutions",
    "اتصل بي": "Contact",
    "مرحباً، أنا محمد فرسان، مطور ويب شغوف بواجهات المستخدم الأمامية، متخصص في HTML وCSS وJavaScript. أصمم مواقع ويب أنيقة، سريعة الاستجابة، وجذابة بصرياً، تعمل بسلاسة على جميع الأجهزة.":"Hi, I’m Mohammed Farsan — a passionate Front-End Web Developer skilled in HTML, CSS, and JavaScript. I craft clean, responsive, and visually engaging websites that work flawlessly across devices.",
    "بعقلية إبداعية وشغف بحل المشكلات، أدمج التصميم والوظائف لتقديم تجارب رقمية سهلة الاستخدام. أعمل حاليًا على توسيع نطاقي في بايثون والذكاء الاصطناعي لبناء حلول ويب أكثر ذكاءً.":"With a creative mindset and a love for problem-solving, I blend design and functionality to deliver user-friendly digital experiences. I’m currently expanding into Python and AI to build smarter web solutions.",
    "نتعلم دائمًا، ونبني دائمًا. هيا نبتكر شيئًا مذهلًا!":"Always learning. Always building. Let’s create something amazing!",
    "المشاريع":"Projects",
    "مهارات":"Skills",
    "عن":"About",
    "بيت":"Home"
    // Add more as needed...
};
function switchLang(dict) {
    document.querySelectorAll('h1, h2, h3, p, a, button, span').forEach(el => {
        if (dict[el.textContent.trim()]) {
            el.textContent = dict[el.textContent.trim()];
        }
    });
}
document.getElementById('lang-ar').onclick = function(e) {
    switchLang(arText);
    this.textContent = "العربية";
    document.getElementById('lang-en').textContent = "English";
};
document.getElementById('lang-en').onclick = function(e) {
    switchLang(enText);
    this.textContent = "English";
    document.getElementById('lang-ar').textContent = "العربية";
};

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
themeToggle.onclick = function() {
    document.body.classList.toggle('light-theme');
    themeLabel.textContent = document.body.classList.contains('light-theme') ? "Dark T" : "Light T";
};

// Download CV
document.getElementById('download-cv').onclick = function() {
    // Replace with your actual CV file path
    const link = document.createElement('a');
    link.href = 'Farsan-Front-End-Resume.pdf';
    link.download = 'Farsan-MHD-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
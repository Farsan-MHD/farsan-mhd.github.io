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
    const aboutImg = document.getElementById('about-image');
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

    // Animate about image
    if (aboutImg) {
        setTimeout(() => {
            aboutImg.classList.add('visible');
        }, 600);
    }
});

// Certificate preview modal logic
document.addEventListener('DOMContentLoaded', () => {
    const certImgs = document.querySelectorAll('.cert-img');
    const previewModal = document.getElementById('cert-preview');
    const previewImg = document.getElementById('preview-img');
    const closePreview = document.getElementById('close-preview');

    certImgs.forEach(img => {
        img.addEventListener('click', () => {
            previewImg.src = img.src;
            previewModal.classList.add('active');
        });
    });

    closePreview.addEventListener('click', () => {
        previewModal.classList.remove('active');
        setTimeout(() => {
            previewImg.src = '';
        }, 300);
    });

    // Optional: close modal on background click
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            closePreview.click();
        }
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
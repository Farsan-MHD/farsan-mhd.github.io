(function() {
  const header = document.getElementById('site-header');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];

  if (!header) return;

  let lastScrollY = window.scrollY || 0;
  const THRESHOLD = 10; // minimum px change to toggle
  let isMobile = window.matchMedia('(max-width: 768px)').matches;

  // update isMobile on resize
  window.addEventListener('resize', () => {
    isMobile = window.matchMedia('(max-width: 768px)').matches;
  });

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastScrollY;

    // ignore tiny scroll changes
    if (Math.abs(delta) < THRESHOLD) return;

    if (isMobile) {
      // Mobile: user scroll up (currentY < lastScrollY) -> hide (move down)
      //         user scroll down (currentY > lastScrollY) -> show (move into view)
      if (currentY < lastScrollY) {
        header.classList.remove('hidden');
      } else {
        header.classList.add('hidden');
      }
    } else {
      // Desktop: user scroll down (currentY > lastScrollY) -> hide (move up)
      //          user scroll up (currentY < lastScrollY) -> show
      if (currentY > lastScrollY && currentY > 50) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    }

    lastScrollY = Math.max(0, currentY);
  }, { passive: true });

  // Hamburger menu toggle (unchanged)
  if (hamburger && navLinks) {
    const closeNav = () => {
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    };
    const openNav = () => {
      navLinks.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    };

    hamburger.addEventListener('click', (e) => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      if (expanded) closeNav(); else openNav();
    });

    // close when a link is clicked
    navItems.forEach(a => a.addEventListener('click', () => closeNav()));

    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeNav();
      }
    });
  }
})();

// Contact form handling: collect inputs into an object and show result
(function(){
  const form = document.getElementById('contact-form');
  const result = document.getElementById('contact-result');
  if (!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      sentAt: new Date().toISOString()
    };

    // For now just display the object and reset form
    result.textContent = 'Message collected — check console for object.';
    console.log('Contact form submission:', data);
    form.reset();

    // brief success state
    setTimeout(() => { result.textContent = ''; }, 4000);
  });
})();

  // Footer helpers
  (function(){
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const newsForm = document.getElementById('footer-news');
    if (!newsForm) return;
    newsForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = document.getElementById('news-email').value.trim();
      if (!email) return;
      console.log('Newsletter signup:', { email, at: new Date().toISOString() });
      newsForm.reset();
      const msg = document.createElement('div');
      msg.textContent = 'Subscribed — thank you!';
      msg.style.color = 'var(--button-bg)';
      newsForm.parentNode.appendChild(msg);
      setTimeout(()=> msg.remove(), 3000);
    });
  })();
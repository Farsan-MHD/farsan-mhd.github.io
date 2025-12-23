(() => {
  const grid = document.getElementById('cert-grid');
  const items = Array.from(grid.querySelectorAll('.cert-item img'));
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lb-image');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');

  let current = 0;

  function open(index) {
    current = index;
    lbImage.src = items[current].src;
    lbImage.alt = items[current].alt || `Certificate ${current + 1}`;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.focus();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImage.src = '';
  }

  function showNext(delta = 1) {
    current = (current + delta + items.length) % items.length;
    lbImage.src = items[current].src;
    lbImage.alt = items[current].alt || `Certificate ${current + 1}`;
  }

  // open handlers
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.cert-item');
    if (!btn) return;
    open(Number(btn.dataset.index));
  });

  // controls
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => showNext(-1));
  lbNext.addEventListener('click', () => showNext(1));

  // overlay click closes when clicking outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // keyboard
  window.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
  });

  // basic swipe support for mobile
  let startX = 0;
  lbImage.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
  lbImage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) showNext(-1);
    else if (dx < -40) showNext(1);
  });
})();
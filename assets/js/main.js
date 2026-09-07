// ELVION — shared site behavior

function initThemeToggle() {
  const root = document.documentElement;
  const stored = localStorage.getItem('elvion-theme');
  if (stored) root.setAttribute('data-theme', stored);

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('elvion-theme', next);
    });
  });
}

function initNavToggle() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('is-open'));
  });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

function initGallery() {
  const main = document.querySelector('[data-gallery-main]');
  const thumbs = document.querySelectorAll('[data-gallery-thumb]');
  if (!main || !thumbs.length) return;
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      main.src = btn.getAttribute('data-gallery-thumb');
      thumbs.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('[data-form-submit]');
  const timeField = form.querySelector('[data-form-time]');
  const buttonLabel = button ? button.textContent : '';

  // Stamp render time so the server can reject submissions filled in too fast.
  if (timeField) timeField.value = String(Date.now());

  function setStatus(kind, text) {
    if (!status) return;
    status.className = 'alert ' + kind;
    status.textContent = text;
    status.hidden = false;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (button) {
      button.disabled = true;
      button.textContent = 'Sending…';
    }
    setStatus('info', 'Sending your message…');

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('success', "Thanks — your message is on its way. We'll reply by email shortly.");
        form.reset();
        if (timeField) timeField.value = String(Date.now());
      } else {
        setStatus('error', data.error ||
          "Sorry — we couldn't send your message. Please call +1 (774) 301-5605 " +
          'or email saleselvion@gmail.com.');
      }
    } catch (err) {
      setStatus('error',
        "Sorry — we couldn't reach the server. Please call +1 (774) 301-5605 " +
        'or email saleselvion@gmail.com.');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = buttonLabel;
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavToggle();
  initReveal();
  initGallery();
  initContactForm();
});

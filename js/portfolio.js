/* ==========================================================================
   PORTFOLIO SCRIPTS (razuahmed75.github.io)
   ========================================================================== */

const CONTACT_CONFIG = {
  provider: 'web3forms',
  web3formsKey: '3d9cb423-c521-4981-a0db-23897a6aa9ad',
  formspreeId: 'xnjrnwpk'
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLenis();
  initTypewriter();
  initActiveNav();
  initMobileMenu();
  initProjectHover();
  initContactForm();
  injectToastStyles();
});

/* ==========================================================================
   1. THEME MANAGEMENT
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const getSavedTheme = () => localStorage.getItem('pref-theme');

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    const sunIcon  = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    if (!sunIcon || !moonIcon) return;
    sunIcon.style.display  = theme === 'dark' ? 'block' : 'none';
    moonIcon.style.display = theme === 'dark' ? 'none'  : 'block';
  };

  applyTheme(getSavedTheme() || 'dark');

  toggleBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('pref-theme', newTheme);
  });
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-role');
  if (!el) return;

  const roles = JSON.parse(el.dataset.roles || '["Flutter Developer","Mobile App Architect","Cross-Platform Engineer"]');
  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let delay      = 150;

  const type = () => {
    const current = roles[roleIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, --charIndex);
      delay = 75;
    } else {
      el.textContent = current.substring(0, ++charIndex);
      delay = 150;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      delay = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500;
    }

    setTimeout(type, delay);
  };

  setTimeout(type, 1000);
}

/* ==========================================================================
   3. ACTIVE NAV LINKS
   ========================================================================== */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${id}` || href === `/#${id}`);
      });
    });
  }, { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  const hash = window.location.hash;
  if (hash) {
    navLinks.forEach(link => {
      if (link.getAttribute('href').endsWith(hash)) link.classList.add('active');
    });
  }
}

/* ==========================================================================
   4. MOBILE DRAWER
   ========================================================================== */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger-toggle');
  const drawer     = document.getElementById('mobile-drawer');
  const overlay    = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  if (!hamburger || !drawer || !overlay) return;

  const open = () => {
    hamburger.classList.add('open');
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    window.lenis?.stop();
  };

  const close = () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    window.lenis?.start();
  };

  hamburger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);

  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#') && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          close();
          setTimeout(() => {
            window.lenis
              ? window.lenis.scrollTo(target, { offset: -80 })
              : target.scrollIntoView({ behavior: 'smooth' });
          }, 150);
        }
      } else {
        close();
      }
    });
  });
}

/* ==========================================================================
   5. PROJECT CARD HOVER
   ========================================================================== */
function initProjectHover() {
  document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.project-icon');
    if (!img || !img.dataset.hover) return;

    const original = img.src;
    const hover    = img.dataset.hover;

    card.addEventListener('mouseenter', () => {
      img.src = hover;
      img.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
      img.src = original;
      img.style.transform = '';
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form      = document.getElementById('contact-form');
  if (!form) return;

  if (CONTACT_CONFIG.provider === 'web3forms') {
    form.action = 'https://api.web3forms.com/submit';
    let keyInput = form.querySelector('input[name="access_key"]');
    if (!keyInput) {
      keyInput = Object.assign(document.createElement('input'), { type: 'hidden', name: 'access_key' });
      form.appendChild(keyInput);
    }
    keyInput.value = CONTACT_CONFIG.web3formsKey;
  } else if (CONTACT_CONFIG.provider === 'formspree') {
    form.action = `https://formspree.io/f/${CONTACT_CONFIG.formspreeId}`;
    form.querySelector('input[name="access_key"]')?.remove();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn     = form.querySelector('.btn-submit');
    const originalHtml  = submitBtn.innerHTML;

    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const res = await fetch(e.target.action, {
        method: form.method,
        body: new FormData(e.target),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        showToast('success', 'Message sent!', "Thanks for reaching out — I'll get back to you soon.");
        form.reset();
      } else {
        const data = await res.json();
        const msg  = data.errors?.map(err => err.message).join(', ') || data.message || 'Submission failed.';
        showToast('error', 'Failed to send', msg);
      }
    } catch {
      showToast('error', 'Network error', 'Please check your connection and try again.');
    } finally {
      submitBtn.disabled  = false;
      submitBtn.innerHTML = originalHtml;
    }
  });
}

/* ==========================================================================
   7. TOAST NOTIFICATIONS
   ========================================================================== */
function injectToastStyles() {
  if (document.getElementById('toast-styles')) return;
  const style = document.createElement('style');
  style.id = 'toast-styles';
  style.textContent = `
    #toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }
    .toast {
      pointer-events: all;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      border-radius: 12px;
      min-width: 300px;
      max-width: 420px;
      border: 0.5px solid;
      position: relative;
      overflow: hidden;
      animation: toastSlideIn .3s cubic-bezier(.175,.885,.32,1.1) both;
    }
    .toast.removing {
      animation: toastSlideOut .22s ease-in both;
    }
    .toast-success {
      background: #F8FDFB;
      border-color: #5DCAA5;
      box-shadow: 0 4px 24px rgba(15,110,86,.12);
    }
    .toast-error {
      background: #FFF8F8;
      border-color: #F09595;
      box-shadow: 0 4px 24px rgba(163,45,45,.12);
    }
    .dark .toast-success { background: #0a1f1a; border-color: #1D9E75; }
    .dark .toast-error   { background: #1f0a0a; border-color: #E24B4A; }
    .toast-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .toast-success .toast-icon { background: #E1F5EE; color: #0F6E56; }
    .toast-error   .toast-icon { background: #FCEBEB; color: #A32D2D; }
    .dark .toast-success .toast-icon { background: #085041; color: #5DCAA5; }
    .dark .toast-error   .toast-icon { background: #4A1B0C; color: #F09595; }
    .toast-body   { flex: 1; min-width: 0; }
    .toast-title  { font-size: 14px; font-weight: 600; line-height: 1.3; margin-bottom: 3px; }
    .toast-success .toast-title { color: #085041; }
    .toast-error   .toast-title { color: #791F1F; }
    .dark .toast-success .toast-title { color: #9FE1CB; }
    .dark .toast-error   .toast-title { color: #F5C4B3; }
    .toast-msg { font-size: 13px; line-height: 1.5; color: #6b7280; }
    .dark .toast-msg { color: #9ca3af; }
    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #9ca3af;
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 16px;
      line-height: 1;
      flex-shrink: 0;
      opacity: .55;
      transition: opacity .15s;
    }
    .toast-close:hover { opacity: 1; }
    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2.5px;
      animation: toastProgress 4s linear forwards;
    }
    .toast-success .toast-progress { background: #1D9E75; }
    .toast-error   .toast-progress { background: #E24B4A; }
    @keyframes toastSlideIn {
      from { transform: translateX(64px) scale(.95); opacity: 0; }
      to   { transform: translateX(0)    scale(1);   opacity: 1; }
    }
    @keyframes toastSlideOut {
      to { transform: translateX(64px) scale(.95); opacity: 0; max-height: 0; padding: 0; margin: 0; }
    }
    @keyframes toastProgress {
      from { width: 100%; }
      to   { width: 0%; }
    }
    @media (max-width: 480px) {
      #toast-container { left: 16px; right: 16px; bottom: 16px; }
      .toast { min-width: 0; width: 100%; }
    }
  `;
  document.head.appendChild(style);
}

function getToastContainer() {
  let tc = document.getElementById('toast-container');
  if (!tc) {
    tc = document.createElement('div');
    tc.id = 'toast-container';
    document.body.appendChild(tc);
  }
  return tc;
}

function showToast(type, title, message) {
  const tc      = getToastContainer();
  const isOk    = type === 'success';
  const toast   = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  const successIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
  const errorIcon   = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

  toast.innerHTML = `
    <div class="toast-icon">${isOk ? successIcon : errorIcon}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button class="toast-close" aria-label="Dismiss notification">✕</button>
    <div class="toast-progress"></div>
  `;

  const dismiss = () => {
    if (toast.classList.contains('removing')) return;
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);

  const timer = setTimeout(dismiss, 4000);
  toast.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    toast.querySelector('.toast-progress').style.animationPlayState = 'paused';
  });
  toast.addEventListener('mouseleave', () => {
    toast.querySelector('.toast-progress').style.animationPlayState = 'running';
    setTimeout(dismiss, 1500);
  });

  tc.appendChild(toast);
}

/* ==========================================================================
   8. LENIS SMOOTH SCROLLING
   ========================================================================== */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  window.lenis = lenis;

  const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) { e.preventDefault(); lenis.scrollTo(target); }
    });
  });
}

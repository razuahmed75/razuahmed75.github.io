/* ==========================================================================
   PORTFOLIO SCRIPTS (razuahmed75.github.io)
   ========================================================================== */

const CONTACT_CONFIG = {
  // Switch provider here: 'telegram' | 'web3forms' | 'formspree'
  provider: 'telegram',

  // Telegram Bot API
  telegramBotToken: '8991056257:AAExVJtzEwqUYiubWjydZahwWecUnDLso8k',
  telegramChatId: '6930301059',

  // Web3Forms (alternative)
  web3formsKey: '3d9cb423-c521-4981-a0db-23897a6aa9ad',

  // Formspree (alternative)
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

  const roles = JSON.parse(el.dataset.roles || '["Developer"]');

  const canvas = document.createElement('canvas');
  canvas.id = 'typewriter-cursor';
  el.insertAdjacentElement('afterend', canvas);

  const ctx = canvas.getContext('2d');
  const W = 14, H = 40;
  canvas.width = W; canvas.height = H;
  canvas.style.cssText = `width:${W}px;height:${H}px;display:inline-block;vertical-align:bottom;margin-left:2px`;

  const ACCENT = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-2-color').trim() || '#00b4d8';

  function rgba(hex, a) {
    const h = hex.replace('#', '');
    return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${a})`;
  }

  const particles = [];
  let boltPts = [], boltLife = 0, boltBranch = null;
  let t = 0, frame = 0;

  function spawnParticles() {
    for (let i = 0; i < 4; i++) {
      particles.push({
        x: W / 2 + (Math.random() - .5) * 6,
        y: H - 6,
        vx: (Math.random() - .5) * 1.2,
        vy: -(Math.random() * 2.5 + 0.8),
        life: 1,
        r: Math.random() * 2.2 + 0.6,
        hot: Math.random() > 0.35
      });
    }
    if (particles.length > 70) particles.splice(0, particles.length - 70);
  }

  function createBolt() {
    boltPts = [];
    const segs = 8;
    for (let i = 0; i <= segs; i++)
      boltPts.push({ x: W / 2 + (Math.random() - .5) * 7, y: 2 + (i / segs) * (H - 4) });
    boltBranch = boltPts[Math.floor(segs * 0.35)];
    boltLife = 1;
  }

  function drawPen() {
    const cx = W / 2;
    const nibTip = H - 2, nibTop = nibTip - 11;
    const bw = 10, capTop = 2, capBot = nibTop - 1, capR = bw / 2;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(cx - capR, capTop + capR);
    ctx.arcTo(cx - capR, capTop, cx, capTop, capR);
    ctx.arcTo(cx + capR, capTop, cx + capR, capTop + capR, capR);
    ctx.lineTo(cx + capR, capBot);
    ctx.lineTo(cx - capR, capBot);
    ctx.closePath();
    ctx.fillStyle = rgba(ACCENT, 0.22);
    ctx.fill();
    ctx.strokeStyle = rgba(ACCENT, 0.95);
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - capR, capTop + 8);
    ctx.lineTo(cx + capR, capTop + 8);
    ctx.strokeStyle = rgba(ACCENT, 0.5);
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - capR, nibTop);
    ctx.lineTo(cx + capR, nibTop);
    ctx.lineTo(cx, nibTip);
    ctx.closePath();
    ctx.fillStyle = rgba(ACCENT, 0.35);
    ctx.fill();
    ctx.strokeStyle = rgba(ACCENT, 0.95);
    ctx.lineWidth = 1.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, nibTop + 3);
    ctx.lineTo(cx, nibTip - 2);
    ctx.strokeStyle = rgba(ACCENT, 0.45);
    ctx.lineWidth = 0.7;
    ctx.stroke();

    const pulse = Math.sin(t * 4) * 0.35 + 0.65;
    ctx.beginPath();
    ctx.arc(cx, nibTip, 3.5 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = rgba(ACCENT, 0.12 * pulse);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, nibTip, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = rgba(ACCENT, 0.95);
    ctx.fill();

    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.07; frame++;
    spawnParticles();

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.vy -= 0.09; p.vx *= 0.98;
      p.life -= 0.038;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      const prog = 1 - p.life;
      const color = p.hot
        ? prog < 0.25 ? `rgba(255,252,210,${p.life * 0.95})`
          : prog < 0.55 ? `rgba(255,150,20,${p.life * 0.88})`
          : `rgba(255,50,10,${p.life * 0.72})`
        : rgba(ACCENT, p.life * 0.85);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    if (frame % 9 === 0) createBolt();

    if (boltLife > 0 && boltPts.length > 1) {
      ctx.save();
      ctx.strokeStyle = rgba(ACCENT, boltLife * 0.92);
      ctx.lineWidth = 1.1;
      ctx.globalAlpha = boltLife;
      ctx.beginPath();
      ctx.moveTo(boltPts[0].x, boltPts[0].y);
      for (const p of boltPts) ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (boltBranch) {
        const a = Math.random() * Math.PI - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(boltBranch.x, boltBranch.y);
        ctx.lineTo(boltBranch.x + Math.cos(a) * 10, boltBranch.y + Math.sin(a) * 10);
        ctx.lineWidth = 0.55;
        ctx.globalAlpha = boltLife * 0.4;
        ctx.stroke();
      }
      ctx.restore();
      boltLife -= 0.13;
    }

    drawPen();
    requestAnimationFrame(draw);
  }

  draw();

  let ri = 0, ci = 0, isDeleting = false, delay = 150;
  const type = () => {
    const cur = roles[ri];
    if (isDeleting) { el.textContent = cur.substring(0, --ci); delay = 60; }
    else { el.textContent = cur.substring(0, ++ci); delay = 140; }
    if (!isDeleting && ci === cur.length) { isDeleting = true; delay = 2200; }
    else if (isDeleting && ci === 0) { isDeleting = false; ri = (ri + 1) % roles.length; delay = 420; }
    setTimeout(type, delay);
  };
  setTimeout(type, 900);
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

/** Escape HTML special chars to prevent injection in Telegram HTML messages */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Send contact message via Telegram Bot API */
async function sendViaTelegram(form) {
  const name    = form.querySelector('#contact-name').value.trim();
  const email   = form.querySelector('#contact-email').value.trim();
  const subject = form.querySelector('#contact-subject').value.trim();
  const message = form.querySelector('#contact-message').value.trim();

  // const text =
  //   `📬 <b>New Contact Form Message</b>\n\n` +
  //   `👤 <b>Name:</b> ${escapeHtml(name)}\n` +
  //   `📧 <b>Email:</b> ${escapeHtml(email)}\n` +
  //   `📋 <b>Subject:</b> ${escapeHtml(subject)}\n\n` +
  //   `💬 <b>Message:</b>\n${escapeHtml(message)}`;

    const text =
      `🔔 <b>New Contact Form Submission</b>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 <b>Name:</b>     ${escapeHtml(name)}\n` +
      `📧 <b>Email:</b>    ${escapeHtml(email)}\n` +
      `📋 <b>Subject:</b>  ${escapeHtml(subject)}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💬 <b>Message:</b>\n<i>${escapeHtml(message)}</i>\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `🕐 <b>Time:</b> ${new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })}`;

  const res = await fetch(
    `https://api.telegram.org/bot${CONTACT_CONFIG.telegramBotToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CONTACT_CONFIG.telegramChatId,
        text: text,
        parse_mode: 'HTML'
      })
    }
  );

  const data = await res.json();
  if (!data.ok) throw new Error(data.description || 'Telegram API error');
}

/** Send contact message via Web3Forms / Formspree */
async function sendViaFormService(form) {
  const res = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
    headers: { Accept: 'application/json' }
  });

  if (!res.ok) {
    const data = await res.json();
    const msg  = data.errors?.map(err => err.message).join(', ') || data.message || 'Submission failed.';
    throw new Error(msg);
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // --- Provider-specific form setup ---
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
  // telegram provider needs no form setup — it's handled entirely via JS

  // --- Unified submit handler ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn    = form.querySelector('.btn-submit');
    const originalHtml = submitBtn.innerHTML;

    submitBtn.disabled  = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      if (CONTACT_CONFIG.provider === 'telegram') {
        await sendViaTelegram(form);
      } else {
        await sendViaFormService(form);
      }

      showToast('success', 'Message sent!', "Thanks for reaching out — I'll get back to you soon.");
      form.reset();
    } catch (err) {
      showToast('error', 'Failed to send', err.message || 'Please check your connection and try again.');
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

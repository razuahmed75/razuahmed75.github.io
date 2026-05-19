/* ==========================================================================
   PORTFOLIO SCRIPTS (razuahmed75.github.io)
   ========================================================================== */


/* ==========================================================================
   PORTFOLIO CONFIGURATION
   ========================================================================== */
const CONTACT_CONFIG = {
  // Provider to use: 'web3forms' (Recommended) or 'formspree'
  provider: 'web3forms',
  
  // Your Web3Forms Access Key
  // Go to https://web3forms.com/ to get your free access key sent to your email
  web3formsKey: '3d9cb423-c521-4981-a0db-23897a6aa9ad',
  
  // Your Formspree Form ID (if using Formspree)
  formspreeId: 'xnjrnwpk'
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLenis();
  initTypewriter();
  initActiveNav();
  initMobileMenu();
  // initRevealAnimations(); // Handled by GSAP ScrollTrigger
  initProjectHover();
  initContactForm();
});

/**
 * 1. Theme Management (Light / Dark)
 */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const getSavedTheme = () => localStorage.getItem('pref-theme');
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    updateThemeIcon(theme);
  };

  const updateThemeIcon = (theme) => {
    const sunIcon = toggleBtn.querySelector('.sun-icon');
    const moonIcon = toggleBtn.querySelector('.moon-icon');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      }
    }
  };

  // Initial Theme Setup
  const savedTheme = getSavedTheme();
  const activeTheme = savedTheme || 'dark';
  applyTheme(activeTheme);

  // Toggle Theme on Click
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('pref-theme', newTheme);
  });
}

/**
 * 2. Typewriter Effect
 */
function initTypewriter() {
  const element = document.getElementById('typewriter-role');
  if (!element) return;

  const roles = JSON.parse(element.dataset.roles || '["Flutter Developer", "Mobile App Architect", "Cross-Platform Engineer"]');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      element.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      delay = 75;
    } else {
      element.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      delay = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      delay = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 500; // Pause before typing next word
    }

    setTimeout(type, delay);
  }

  // Start the typewriter after a short delay
  setTimeout(type, 1000);
}

/**
 * 3. Active Nav Links & Section Highlighting
 */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const options = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the center viewport area
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `/#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));

  // Also check initial page position to highlight active link
  const currentHash = window.location.hash;
  if (currentHash) {
    navLinks.forEach(link => {
      if (link.getAttribute('href').endsWith(currentHash)) {
        link.classList.add('active');
      }
    });
  }
}

/**
 * 4. Mobile Drawer toggle
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .nav-link');

  if (!hamburger || !drawer || !overlay) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('open');
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
  };

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#') && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          closeMenu();
          setTimeout(() => {
            if (window.lenis) {
              window.lenis.scrollTo(targetElement, {
                offset: -80
              });
            } else {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      } else {
        closeMenu();
      }
    });
  });
}

/**
 * 5. Reveal on Scroll (Intersection Observer)
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');
  
  const options = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters viewport
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, options);

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 6. Projects Image Cover Hover Hover Effect (Preserving existing logic)
 */
function initProjectHover() {
  document.querySelectorAll('.project-card').forEach(card => {
    const img = card.querySelector('.project-icon');
    if (!img) return;

    const originalSrc = img.src;
    const hoverSrc = img.dataset.hover;
    if (!hoverSrc) return;

    card.addEventListener('mouseenter', () => {
      img.src = hoverSrc;
      img.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
      img.src = originalSrc;
      img.style.transform = '';
    });
  });
}

/**
 * 7. Contact Form Handling
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('contact-form-status');
  if (!form || !statusDiv) return;

  // Dynamically configure the form endpoint and parameters based on CONTACT_CONFIG
  if (CONTACT_CONFIG.provider === 'web3forms') {
    form.action = 'https://api.web3forms.com/submit';
    
    // Check if access_key hidden field already exists, otherwise create it
    let keyInput = form.querySelector('input[name="access_key"]');
    if (!keyInput) {
      keyInput = document.createElement('input');
      keyInput.type = 'hidden';
      keyInput.name = 'access_key';
      form.appendChild(keyInput);
    }
    keyInput.value = CONTACT_CONFIG.web3formsKey;
  } else if (CONTACT_CONFIG.provider === 'formspree') {
    form.action = `https://formspree.io/f/${CONTACT_CONFIG.formspreeId}`;
    
    // Remove access_key hidden input if it exists
    const keyInput = form.querySelector('input[name="access_key"]');
    if (keyInput) {
      keyInput.remove();
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const submitBtn = form.querySelector('.btn-submit');
    const originalBtnHtml = submitBtn.innerHTML;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        showStatus('success', 'Thanks for your submission! I will reach out soon.');
        form.reset();
      } else {
        const result = await response.json();
        let errMessage = 'Submission failed';
        if (result.errors && Array.isArray(result.errors)) {
          errMessage = result.errors.map(e => e.message).join(', ');
        } else if (result.message) {
          errMessage = result.message;
        }
        showStatus('danger', errMessage);
      }
    } catch (error) {
      showStatus('danger', 'Oops! There was a problem submitting your form');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });

  function showStatus(type, message) {
    statusDiv.style.position = 'fixed';
    statusDiv.style.bottom = '24px';
    statusDiv.style.right = '24px';
    statusDiv.style.zIndex = '2000';

    const alertClass = type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    statusDiv.innerHTML = `
      <div class="flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-0 ${alertClass}" style="background-color: ${type === 'success' ? '#10b981' : '#ef4444'}; color: #fff; font-family: var(--font-sans); display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.25);">
        <i class="fas ${iconClass} text-lg"></i>
        <div class="text-sm font-semibold">${message}</div>
        <button type="button" class="ml-auto bg-transparent border-none text-white cursor-pointer hover:opacity-80" onclick="this.parentElement.remove()" style="background: none; border: none; color: #fff; cursor: pointer; margin-left: 12px; font-weight: bold;">✕</button>
      </div>
    `;

    setTimeout(() => {
      const activeAlert = statusDiv.firstElementChild;
      if (activeAlert) {
        activeAlert.style.opacity = '0';
        activeAlert.style.transform = 'translateY(10px)';
        setTimeout(() => statusDiv.innerHTML = '', 300);
      }
    }, 4000);
  }
}

/**
 * 8. Lenis Smooth Scrolling Integration
 */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        lenis.scrollTo(targetElement);
      }
    });
  });
}

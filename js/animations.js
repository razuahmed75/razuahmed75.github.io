/* ==========================================================================
   GSAP ANIMATIONS (razuahmed75.github.io)
   ========================================================================== */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

document.addEventListener('DOMContentLoaded', () => {
  // Add gsap-enabled class to body to toggle CSS reveal animations
  document.body.classList.add('gsap-enabled');

  // Respect user preferences for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.01);
    const overlay = document.getElementById('page-overlay');
    if (overlay) overlay.style.display = 'none';
    return;
  }

  /* ==========================================================================
     PAGE TRANSITION OVERLAY (Cinematic Slow)
     ========================================================================== */
  const pageOverlay = document.getElementById('page-overlay');
  if (pageOverlay) {
    gsap.to(pageOverlay, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.6,
      ease: 'power4.inOut',
      delay: 0.1,
      onComplete: () => {
        pageOverlay.style.pointerEvents = 'none';
      }
    });
  }

  /* ==========================================================================
     SCROLL PROGRESS BAR
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    gsap.to(scrollProgress, {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

  /* ==========================================================================
     NAVBAR ANIMATIONS (Cinematic Slow)
     ========================================================================== */
  const headerNav = document.querySelector('.header-nav');
  if (headerNav) {
    // Slide down navbar
    gsap.from(headerNav, {
      y: -80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    });

    // Scroll trigger for scrolled backdrop blur background
    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () => headerNav.classList.add('scrolled'),
      onLeaveBack: () => headerNav.classList.remove('scrolled')
    });
  }

  // Nav CTA button arrow-swap hover
  const ctaBtn = document.querySelector('.nav-cta-btn');
  const ctaIcon = document.querySelector('.nav-cta-icon');
  if (ctaBtn && ctaIcon) {
    const arrow1 = ctaIcon.querySelector('.icon-arrow:not(.icon-hover)');
    const arrow2 = ctaIcon.querySelector('.icon-hover');
    if (arrow1 && arrow2) {
      ctaBtn.addEventListener('mouseenter', () => {
        gsap.to(arrow1, { x: 12, y: -12, opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(arrow2, { x: 0, y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
      });
      ctaBtn.addEventListener('mouseleave', () => {
        gsap.to(arrow1, { x: 0, y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(arrow2, { x: -12, y: 12, opacity: 0, duration: 0.3, ease: 'power2.in' });
      });
    }
  }

  // Stagger nav links
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (navLinks.length > 0) {
    gsap.from(navLinks, {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      delay: 0.5,
      duration: 1.0,
      ease: 'power3.out'
    });
  }

  /* ==========================================================================
     HERO SECTION ANIMATION SEQUENCE (Cinematic Slow)
     ========================================================================== */
  const heroSection = document.querySelector('#hero');
  if (heroSection) {
    const heroTl = gsap.timeline();

    // Set initial states to prevent FOUC (Flash of Uncontented Content)
    gsap.set([
      '.hero-greeting',
      '.hero-title',
      '.hero-subtitle',
      '.hero-description',
      '.hero-ctas a',
      '.social-row a',
      '.hero-avatar-wrapper',
      '.scroll-indicator'
    ], { opacity: 0 });

    const greeting = document.querySelector('.hero-greeting');
    if (greeting) {
      heroTl.fromTo(greeting, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.0 }
      );
    }

    const title = document.querySelector('.hero-title');
    if (title) {
      heroTl.fromTo(title, 
        { opacity: 0, y: 50, skewX: -3 }, 
        { opacity: 1, y: 0, skewX: 0, duration: 1.4 }, 
        greeting ? '-=0.3' : undefined
      );
    }

    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
      heroTl.fromTo(subtitle, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.0 }, 
        title ? '-=0.4' : undefined
      );
    }

    const description = document.querySelector('.hero-description');
    if (description) {
      heroTl.fromTo(description, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.0 }, 
        '-=0.3'
      );
    }

    const ctas = document.querySelectorAll('.hero-ctas a');
    if (ctas.length > 0) {
      heroTl.fromTo(ctas, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.0 }, 
        '-=0.3'
      );
    }

    const socialIcons = document.querySelectorAll('.social-row a');
    if (socialIcons.length > 0) {
      heroTl.fromTo(socialIcons, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, stagger: 0.12, ease: 'back.out(2)', duration: 1.0 }, 
        '-=0.3'
      );
    }

    const profileImage = document.querySelector('.hero-avatar-wrapper');
    if (profileImage) {
      // Parallel timeline entrance for avatar
      heroTl.fromTo(profileImage, 
        { opacity: 0, scale: 0.85, x: 60 }, 
        { opacity: 1, scale: 1, x: 0, duration: 1.6, ease: 'power4.out' }, 
        0.2
      );

      // Subtle float loop on avatar after loading
      gsap.to(profileImage, {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });
    }

    // Scroll Down Indicator Bounce Loop
    const scrollDown = document.querySelector('.scroll-indicator');
    if (scrollDown) {
      gsap.fromTo(scrollDown, 
        { opacity: 0, y: -10 }, 
        { opacity: 1, y: 10, repeat: -1, yoyo: true, duration: 1.0, ease: 'power1.inOut' }
      );
    }

  }

  /* ==========================================================================
     ABOUT SECTION (Cinematic Slow)
     ========================================================================== */
  const aboutText = document.querySelector('#about .about-left, #about .about-text');
  if (aboutText) {
    gsap.from(aboutText, {
      x: -60,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: aboutText,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Stat counter animations (Cinematic Slow)
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const rawText = stat.textContent.trim();
    const targetNum = parseInt(rawText.replace(/[^0-9]/g, ''), 10);

    if (!isNaN(targetNum)) {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: targetNum,
        duration: 3.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => {
          stat.textContent = Math.floor(counter.val) + '+';
        }
      });
    } else {
      // Fade in for non-numeric fields like "Active"
      gsap.from(stat, {
        opacity: 0,
        y: 15,
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  });

  /* ==========================================================================
     SKILLS SECTION (Optimized with Explicit fromTo Tweens & Safe Triggers)
     ========================================================================== */
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const skillsHeadings = skillsSection.querySelectorAll('h3.skills-title, h3');
    const skillBadges = skillsSection.querySelectorAll('.skill-badge');

    if (skillsHeadings.length > 0) {
      gsap.fromTo(skillsHeadings, 
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsSection,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    if (skillBadges.length > 0) {
      gsap.fromTo(skillBadges, 
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          stagger: {
            each: 0.06,
            from: 'random'
          },
          duration: 1.0,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsSection,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  /* ==========================================================================
     PROJECTS SECTION (Cinematic Slow)
     ========================================================================== */
  // Featured Project Card
  const featuredCard = document.querySelector('.project-hero-card');
  if (featuredCard) {
    gsap.from(featuredCard, {
      opacity: 0,
      y: 80,
      scale: 0.96,
      duration: 1.6,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: featuredCard,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    featuredCard.addEventListener('mouseenter', () => {
      gsap.to(featuredCard, { y: -8, scale: 1.02, duration: 0.4, ease: 'power2.out' });
    });
    featuredCard.addEventListener('mouseleave', () => {
      gsap.to(featuredCard, { y: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' });
    });
  }

  // Grid Project Cards
  const gridCards = document.querySelectorAll('.project-card');
  gridCards.forEach((card, i) => {
    const isEven = i % 2 === 0;
    const fromX = isEven ? -50 : 50;
    const rowDelay = (i % 3) * 0.15;

    gsap.from(card, {
      opacity: 0,
      x: fromX,
      y: 30,
      duration: 1.2,
      delay: rowDelay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Card Hover Interactions
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { y: -8, scale: 1.02, duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { y: 0, scale: 1, duration: 0.5, ease: 'power2.inOut' });
    });
  });

  /* ==========================================================================
     EXPERIENCE SECTION (TIMELINE)
     ========================================================================== */
  const expTimelineLine = document.querySelector('#experience .timeline');
  if (expTimelineLine) {
    gsap.fromTo(expTimelineLine, 
      { "--timeline-scale": 0 },
      {
        "--timeline-scale": 1,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: expTimelineLine,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Timeline items & dots (Experience)
  const expItems = document.querySelectorAll('#experience .timeline-item');
  expItems.forEach((item, i) => {
    const dot = item.querySelector('.timeline-dot');

    gsap.from(item, {
      opacity: 0,
      x: 60,
      duration: 1.2,
      delay: i * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    if (dot) {
      gsap.from(dot, {
        scale: 0,
        ease: 'back.out(2)',
        delay: i * 0.2 + 0.4,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  });

  /* ==========================================================================
     EDUCATION SECTION (TIMELINE MIRROR)
     ========================================================================== */
  const eduTimelineLine = document.querySelector('#education .timeline');
  if (eduTimelineLine) {
    gsap.fromTo(eduTimelineLine, 
      { "--timeline-scale": 0 },
      {
        "--timeline-scale": 1,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: eduTimelineLine,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // Timeline items & dots (Education)
  const eduItems = document.querySelectorAll('#education .timeline-item');
  eduItems.forEach((item, i) => {
    const dot = item.querySelector('.timeline-dot');

    gsap.from(item, {
      opacity: 0,
      x: -60, // left side mirror animation
      duration: 1.2,
      delay: i * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    if (dot) {
      gsap.from(dot, {
        scale: 0,
        ease: 'back.out(2)',
        delay: i * 0.2 + 0.4,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  });

  /* ==========================================================================
     CONTACT SECTION (Cinematic Slow)
     ========================================================================== */
  // Contact Info block
  const contactInfo = document.querySelector('#contact .contact-info-container');
  if (contactInfo) {
    gsap.from(contactInfo, {
      opacity: 0,
      x: 60,
      duration: 1.4,
      scrollTrigger: {
        trigger: contactInfo,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }

  // Form Fields stagger in
  const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form button');
  if (formFields.length > 0) {
    gsap.from(formFields, {
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 1.0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact-form',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    });
  }



// Submit button blob-morph hover animation
  const submitBtn = document.querySelector('#contact-form .btn-submit');
  if (submitBtn) {
    const blob = submitBtn.querySelector('.blob');
    const btnText = submitBtn.querySelector('.btn-text');
    const origTextColor = getComputedStyle(btnText).color;

    function entrySide(event, rect) {
      const ox = event.clientX - rect.left;
      const oy = event.clientY - rect.top;
      const dist = {
        top: oy,
        bottom: rect.height - oy,
        left: ox,
        right: rect.width - ox
      };
      const min = Math.min(dist.top, dist.bottom, dist.left, dist.right);
      if (dist.top === min) return { ox, oy: 0 };
      if (dist.bottom === min) return { ox, oy: rect.height };
      if (dist.left === min) return { ox: 0, oy };
      return { ox: rect.width, oy };
    }

    let hoverTl = null;

    submitBtn.addEventListener('mouseenter', (event) => {
      const rect = submitBtn.getBoundingClientRect();
      const entry = entrySide(event, rect);
      const diagonal = Math.hypot(rect.width, rect.height);
      const finalSize = diagonal * 1.8;

      if (hoverTl) hoverTl.kill();

      gsap.killTweensOf([blob, btnText]);
      gsap.set(blob, {
        left: entry.ox,
        top: entry.oy,
        width: 0,
        height: 0,
        borderRadius: '50%',
        opacity: 1
      });

      hoverTl = gsap.timeline();
      hoverTl
        .to(blob, {
          width: finalSize,
          height: finalSize,
          borderRadius: '44% 56% 52% 48% / 54% 44% 56% 46%',
          duration: 0.55,
          ease: 'power2.out'
        })
        .to(blob, {
          borderRadius: '50%',
          duration: 0.35,
          ease: 'sine.inOut'
        }, '-=0.2')
        .to(btnText, {
          color: '#ffffff',
          duration: 0.25,
          ease: 'sine.out'
        }, 0.15);
    });

    submitBtn.addEventListener('mouseleave', (event) => {
      const rect = submitBtn.getBoundingClientRect();
      const exit = entrySide(event, rect);

      if (hoverTl) hoverTl.kill();
      gsap.killTweensOf([blob, btnText]);

      hoverTl = gsap.timeline();
      hoverTl
        .to(blob, {
          left: exit.ox,
          top: exit.oy,
          width: 0,
          height: 0,
          borderRadius: '50%',
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => gsap.set(blob, { opacity: 0 })
        }, 0)
        .to(btnText, {
          color: origTextColor,
          duration: 0.25,
          ease: 'sine.in'
        }, 0);
    });
  }

  /* ==========================================================================
     GLOBAL SECTION HEADINGS (Cinematic Slow)
     ========================================================================== */
  const sectionHeadings = document.querySelectorAll('h2.section-title, section h2');
  sectionHeadings.forEach(heading => {
    gsap.from(heading, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    // Heading underline line draw effect
    const line = heading.querySelector('.heading-line');
    if (line) {
      gsap.fromTo(line, 
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: 'left center',
          duration: 1.0,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // Re-calculate after full window layout paint
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
  // Extra safety timeout for deferred components
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 350);
});

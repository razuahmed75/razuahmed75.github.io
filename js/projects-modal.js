const PROJECTS_DATA = {
  "giftily": {
    id: "giftily",
    name: "Giftily Mobile App",
    tagline: "Game Top-Ups & Gift Cards Made Easy",
    description: "Discover the ultimate platform for digital top-ups and gift cards — fast, secure, and made just for gamers in Algeria! Elevate your gaming experience with a feature-packed mobile app designed to cater to the needs of professional gamers and enthusiasts alike.\n\nIt features high-speed transactions, pusher signaling, local Isar storage, and clean architecture.",
    logo: "/images/game.png",
    cover: "/images/covers/game_cover.png",
    tags: ["Flutter", "Riverpod", "Firebase", "Pusher", "REST API", "Dio + Retrofit", "Dart Isolate", "Isar (Local Storage)"],
    playStore: "https://play.google.com/store/apps/details?id=com.giftily_dz.app&hl=en",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/gamers-arena-on-demand-game-shop-cross-platform-mobile-application/51225336",
    liveDemo: "https://play.google.com/store/apps/details?id=com.giftily_dz.app&hl=en"
  },
  "lama": {
    id: "lama",
    name: "Lama.ng Mobile App",
    tagline: "On-Demand Service Marketplace",
    description: "Connecting users with trusted service providers across various categories. Explore, compare, and hire reliable professionals easily.\n\nThe app integrates Google Maps API, Pusher real-time notifications, and Firebase backend services to deliver a smooth on-demand service marketplace experience.",
    logo: "/images/lama.png",
    cover: "/images/covers/lama_cover.webp",
    tags: ["Flutter", "Riverpod", "Firebase", "Google Map", "Pusher"],
    playStore: "https://play.google.com/store/apps/details?id=com.lama.ng&hl=en",
    appStore: "https://apps.apple.com/us/app/lama-ng/id6756806464",
    codeCanyon: "",
    liveDemo: "https://play.google.com/store/apps/details?id=com.lama.ng&hl=en"
  },
  "golala": {
    id: "golala",
    name: "Golala BillPay App",
    tagline: "Utility & Mobile Payments",
    description: "One-stop mobile payment solution for all your top-up, recharge, and utility bill management needs right at your fingertips.\n\nDesigned for convenience, it features real-time payment processing, instant receipt generation, and notification alerts via Pusher and Firebase.",
    logo: "/images/bill.png",
    cover: "/images/covers/bill_cover.png",
    tags: ["Flutter", "Riverpod", "Pusher", "REST API"],
    playStore: "https://play.google.com/store/apps/details?id=com.golala.billpayment&hl=en",
    appStore: "https://apps.apple.com/us/app/golala-billpay-solutions/id6743252509",
    codeCanyon: "https://codecanyon.net/item/bill-pay-topup-recharge-and-utility-bill-payment-mobile-app/50124639?s_rank=26",
    liveDemo: "https://play.google.com/store/apps/details?id=com.golala.billpayment&hl=en"
  },
  "agriwealth": {
    id: "agriwealth",
    name: "Agriwealth App",
    tagline: "Agricultural Investment Portal",
    description: "Agricultural investment mobile companion application providing seamless access to portfolio, transactions, and real-time updates.\n\nHelps users invest in agricultural projects with a user-friendly interface, local offline data caching via Hive, and Firebase authentication.",
    logo: "/images/agriwealth.png",
    cover: "/images/covers/agriwealth_cover.png",
    tags: ["Flutter", "Riverpod", "Firebase", "Hive"],
    playStore: "https://play.google.com/store/apps/details?id=com.stip.club",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/agriwealth-agricultural-hyip-investment-mobile-application-android-ios/55396787?s_rank=15",
    liveDemo: "https://play.google.com/store/apps/details?id=com.stip.club"
  },
  "listplace": {
    id: "listplace",
    name: "Listplace Mobile App",
    tagline: "Business Directory Listing",
    description: "Business Directory Listing app. Users can explore, add, and manage listings easily from their mobile devices on the go.\n\nIntegrated with Google Maps for location searches, Pusher for instant updates, and structured under the GetX state management framework.",
    logo: "/images/listplace.png",
    cover: "/images/covers/listplace_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "Google Map"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/listplace-business-directory-listing-flutter-app-android-ios/57380835?s_rank=10",
    liveDemo: ""
  },
  "hyip-pro": {
    id: "hyip-pro",
    name: "HYIP PRO Mobile App",
    tagline: "Investment Venture Platform",
    description: "High Yield Investment Platform companion app for building, launching, and managing a successful investment venture easily.\n\nIncludes real-time balance tracking, multi-tier referral management, secure payment options, and Pusher-based messaging.",
    logo: "/images/hyip.png",
    cover: "/images/covers/hyip_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "REST API"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/hyip-pro-cross-platform-mobile-application/49701045?s_rank=28",
    liveDemo: ""
  },
  "coinectra": {
    id: "coinectra",
    name: "Coinectra Mobile App",
    tagline: "Crypto Currency Exchange",
    description: "Crypto Currency Exchange companion app. Trade crypto swaps, execute fiat transactions, and monitor balances securely.\n\nPowered by GetX state management, Pusher real-time tickers, and REST API integrations for secure, fast crypto-to-fiat transactions.",
    logo: "/images/coinectra.png",
    cover: "/images/covers/coinectra_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "REST API"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/coinectra-buy-sell-and-crypto-currency-exchange-flutter-app-android-ios/58421141?s_rank=6",
    liveDemo: ""
  },
  "waiz": {
    id: "waiz",
    name: "Waiz Mobile App",
    tagline: "Global Wallet & Remittance",
    description: "Global Digital Wallet and Remittance app. Simplifies international money transfers with reliability, speed, and lower costs.\n\nFeatures multi-currency support, local offline storage via Hive, and Pusher signaling for transaction tracking.",
    logo: "/images/waiz.png",
    cover: "/images/covers/waiz_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "Hive"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/waiz-digital-wallet-and-remittance-app-and-website-with-admin-panel/53238316?s_rank=22",
    liveDemo: ""
  },
  "paysecure-user": {
    id: "paysecure-user",
    name: "Paysecure-User App",
    tagline: "Modern Digital Wallet",
    description: "Modern Digital Wallet Mobile App. Enables users to manage money, transfer balances, pay utility bills, and run secure peer-to-peer transactions.\n\nIntegrates secure REST APIs, real-time Pusher updates, and GetX state management.",
    logo: "/images/paysecure-user.png",
    cover: "/images/covers/paysecure_user_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "REST API"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/paysecure-digital-wallet-flutter-app-android-ios/58040829?s_rank=7",
    liveDemo: ""
  },
  "paysecure-merchant": {
    id: "paysecure-merchant",
    name: "Paysecure-Merchant",
    tagline: "Business Payment Gateway",
    description: "Business payment solution app. Empowers merchants to accept payments, track transaction history, and check settlements.\n\nFeatures analytical dashboards, payment link generators, and local offline storage via Hive.",
    logo: "/images/paysecure-merchant.png",
    cover: "/images/covers/paysecure_merchant_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "Hive"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/pay-secure-digital-wallet-application-for-merchant-android-ios/58793831?s_rank=1",
    liveDemo: ""
  },
  "paysecure-agent": {
    id: "paysecure-agent",
    name: "Paysecure-Agent App",
    tagline: "Field Operations Companion",
    description: "Field Agent Mobile App. Allows representatives to assist users with cash deposits, withdrawals, and wallet transactions.\n\nSupports mobile receipt printing, offline transaction validation, and secure REST APIs.",
    logo: "/images/paysecure-agent.png",
    cover: "/images/covers/paysecure_agent_cover.png",
    tags: ["Flutter", "GetX", "Pusher", "REST API"],
    playStore: "",
    appStore: "",
    codeCanyon: "https://codecanyon.net/item/pay-secure-digital-wallet-application-for-agent-android-ios/58793829?s_rank=2",
    liveDemo: ""
  }
};

function renderProjectsSection() {
  const featuredContainer = document.getElementById('projects-featured-container');
  const gridContainer = document.getElementById('projects-grid-container');
  if (!featuredContainer || !gridContainer) return;

  const projectKeys = Object.keys(PROJECTS_DATA);
  if (projectKeys.length === 0) return;

  function buildGridFooter(data) {
    let rows = '';
    if (data.playStore) {
      rows += `
        <div class="project-footer-row">
          <a href="${data.playStore}" target="_blank" class="project-store-link" rel="noopener noreferrer">
            <img src="/images/googleplay.png" alt="Google Play"> Play Store
          </a>
          <a href="${data.playStore}" target="_blank" class="project-cta-link" rel="noopener noreferrer">View</a>
        </div>`;
    }
    if (data.appStore) {
      rows += `
        <div class="project-footer-row">
          <a href="${data.appStore}" target="_blank" class="project-store-link" rel="noopener noreferrer">
            <img src="/images/appstore.png" alt="App Store"> App Store
          </a>
          <a href="${data.appStore}" target="_blank" class="project-cta-link" rel="noopener noreferrer">View</a>
        </div>`;
    }
    if (data.codeCanyon) {
      rows += `
        <div class="project-footer-row">
          <a href="${data.codeCanyon}" target="_blank" class="project-store-link" rel="noopener noreferrer">
            <img src="/images/envato.webp" alt="Envato"> CodeCanyon
          </a>
          <a href="${data.codeCanyon}" target="_blank" class="project-cta-link" rel="noopener noreferrer">View</a>
        </div>`;
    }
    if (!rows && data.liveDemo) {
      rows += `
        <div class="project-footer-row">
          <a href="${data.liveDemo}" target="_blank" class="project-cta-link" rel="noopener noreferrer">View Live</a>
        </div>`;
    }
    return rows;
  }

  function buildHeroLinks(data) {
    let links = '';
    if (data.playStore) {
      links += `
        <a href="${data.playStore}" target="_blank" class="project-store-link" rel="noopener noreferrer">
          <img src="/images/googleplay.png" alt="Google Play">
          <span>Play Store</span>
        </a>`;
    }
    if (data.appStore) {
      links += `
        <a href="${data.appStore}" target="_blank" class="project-store-link" rel="noopener noreferrer">
          <img src="/images/appstore.png" alt="App Store">
          <span>App Store</span>
        </a>`;
    }
    if (data.codeCanyon) {
      links += `
        <a href="${data.codeCanyon}" target="_blank" class="project-store-link" style="margin-left: var(--space-2);" rel="noopener noreferrer">
          <img src="/images/envato.webp" alt="Envato">
          <span>CodeCanyon</span>
        </a>`;
    }
    return links;
  }

  const featuredKey = projectKeys[0];
  const featuredData = PROJECTS_DATA[featuredKey];
  const heroTagsHtml = featuredData.tags.map(t => `<span class="project-badge">${t}</span>`).join('');
  const heroLiveUrl = featuredData.liveDemo || featuredData.playStore || featuredData.appStore || featuredData.codeCanyon;

  featuredContainer.innerHTML = `
    <div class="project-hero-card" data-project-id="${featuredData.id}" tabindex="0" role="button" aria-label="View details for ${featuredData.name}">
      <div class="project-hero-content">
        <div>
          <span class="featured-tag">Featured Project</span>
          <h3 class="project-hero-title" style="margin-top: var(--space-1);">${featuredData.name}</h3>
          <p class="project-hero-desc" style="margin-top: var(--space-1);">
            ${featuredData.tagline}. ${featuredData.description.split('\n')[0]}
          </p>
        </div>
        <div class="project-hero-info">
          <div class="project-hero-tags">${heroTagsHtml}</div>
          <div class="project-hero-actions">
            <div class="project-links">${buildHeroLinks(featuredData)}</div>
            ${heroLiveUrl ? `<a href="${heroLiveUrl}" target="_blank" class="project-link-btn" rel="noopener noreferrer">View Live <i class="fas fa-external-link-alt"></i></a>` : ''}
          </div>
        </div>
      </div>
      <div class="project-hero-img-wrapper">
        <img src="${featuredData.cover}" alt="${featuredData.name} Cover">
      </div>
    </div>`;

  const gridHtml = projectKeys.slice(1).map(key => {
    const data = PROJECTS_DATA[key];
    const tagsHtml = data.tags.map(t => `<span class="project-badge">${t}</span>`).join('');
    const shortDesc = data.description.split('\n')[0];
    return `
      <div class="project-card" data-project-id="${data.id}" tabindex="0" role="button" aria-label="View details for ${data.name}">
        <div class="project-card-header"></div>
        <div class="project-card-body">
          <div class="project-card-head">
            <img src="${data.logo}" data-hover="${data.cover}" alt="${data.name}" class="project-icon">
            <h3 class="project-card-title">${data.name}</h3>
          </div>
          <p class="project-card-desc">${shortDesc}</p>
          <div class="project-card-tags">${tagsHtml}</div>
        </div>
        <div class="project-card-footer">${buildGridFooter(data)}</div>
      </div>`;
  }).join('');

  gridContainer.innerHTML = gridHtml;
}

// ── Init render ──────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjectsSection);
} else {
  renderProjectsSection();
}

// ── Modal logic (runs immediately — script is at bottom of body) ─────────────
(function initModal() {
  const modalBackdrop = document.getElementById('project-detail-modal');
  if (!modalBackdrop) return;

  const modalCloseBtn = modalBackdrop.querySelector('.projects-modal-close');
  const modalContentEl = modalBackdrop.querySelector('.projects-modal-content');
  const modalActionsEl = modalBackdrop.querySelector('.projects-modal-actions');
  let lastFocusedElement = null;

  function openModal(projectId, triggerCard) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;
    lastFocusedElement = triggerCard;
    renderModalContent(data);
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();
    setTimeout(() => modalCloseBtn.focus(), 100);
  }

  function closeModal() {
    if (!modalBackdrop.classList.contains('open')) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.lenis) window.lenis.start();
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function renderModalContent(data) {
    const tagsHtml = data.tags.map(tag => `<span class="projects-modal-badge">${tag}</span>`).join('');
    modalContentEl.innerHTML = `
      <div class="projects-modal-image-wrapper">
        <img class="projects-modal-image" src="${data.cover}" alt="${data.name} Preview Cover">
      </div>
      <div class="projects-modal-body">
        <div class="projects-modal-header">
          <div class="projects-modal-logo">
            <img src="${data.logo}" alt="${data.name} Icon">
          </div>
          <div class="projects-modal-header-text">
            <span class="projects-modal-tagline">${data.tagline}</span>
            <h2 class="projects-modal-title" id="projects-modal-title-heading">${data.name}</h2>
          </div>
        </div>
        <div class="projects-modal-tags">${tagsHtml}</div>
        <p class="projects-modal-desc">${data.description}</p>
      </div>`;

    let actionsHtml = '';
    if (data.playStore) {
      actionsHtml += `
        <a href="${data.playStore}" target="_blank" class="projects-modal-btn projects-modal-btn-store" rel="noopener noreferrer">
          <img src="/images/googleplay.png" alt=""> Play Store
        </a>`;
    }
    if (data.appStore) {
      actionsHtml += `
        <a href="${data.appStore}" target="_blank" class="projects-modal-btn projects-modal-btn-store" rel="noopener noreferrer">
          <img src="/images/appstore.png" alt=""> App Store
        </a>`;
    }
    if (data.codeCanyon) {
      actionsHtml += `
        <a href="${data.codeCanyon}" target="_blank" class="projects-modal-btn projects-modal-btn-store" rel="noopener noreferrer">
          <img src="/images/envato.webp" alt=""> CodeCanyon
        </a>`;
    }
    if (data.liveDemo && data.liveDemo !== data.playStore) {
      actionsHtml += `
        <a href="${data.liveDemo}" target="_blank" class="projects-modal-btn projects-modal-btn-primary" rel="noopener noreferrer">
          View Live <i class="fas fa-external-link-alt"></i>
        </a>`;
    } else if (data.playStore || data.appStore || data.codeCanyon) {
      const primaryUrl = data.liveDemo || data.playStore || data.appStore || data.codeCanyon;
      actionsHtml += `
        <a href="${primaryUrl}" target="_blank" class="projects-modal-btn projects-modal-btn-primary" rel="noopener noreferrer">
          View Details <i class="fas fa-external-link-alt"></i>
        </a>`;
    }
    modalActionsEl.innerHTML = actionsHtml;
  }

  document.addEventListener('click', (e) => {
    const triggerCard = e.target.closest('[data-project-id]');
    if (triggerCard) {
      if (e.target.closest('a')) return;
      e.preventDefault();
      openModal(triggerCard.getAttribute('data-project-id'), triggerCard);
    }
  });

  document.addEventListener('keydown', (e) => {
    const triggerCard = e.target.closest('[data-project-id]');
    if (triggerCard && (e.key === 'Enter' || e.key === ' ')) {
      if (e.target.closest('a')) return;
      e.preventDefault();
      openModal(triggerCard.getAttribute('data-project-id'), triggerCard);
    }
  });

  modalContentEl.addEventListener('wheel', (e) => {
    e.stopPropagation();
    const { scrollTop, scrollHeight, clientHeight } = modalContentEl;
    const atTop = scrollTop === 0;
    const atBottom = scrollHeight - scrollTop - clientHeight <= 1;
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) e.preventDefault();
  }, { passive: false });

  modalCloseBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modalBackdrop.classList.contains('open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      const focusableEls = modalBackdrop.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
      const firstFocusable = focusableEls[0];
      const lastFocusable = focusableEls[focusableEls.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) { lastFocusable.focus(); e.preventDefault(); }
      } else {
        if (document.activeElement === lastFocusable) { firstFocusable.focus(); e.preventDefault(); }
      }
    }
  });
})();
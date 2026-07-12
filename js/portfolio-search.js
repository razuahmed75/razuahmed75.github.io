/* =========================================================================
   PORTFOLIO SEARCH
   ========================================================================== */
function initSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  if (!searchToggle || !searchModal || !searchInput || !searchResults) return;

  let searchIndex = [];
  let selectedIndex = -1;
  let currentResults = [];

  function buildIndex() {
    searchIndex = [];

    document.querySelectorAll('.project-card').forEach(card => {
      const title = card.querySelector('.project-card-title')?.textContent?.trim();
      const desc = card.querySelector('.project-card-desc')?.textContent?.trim();
      const tags = [...card.querySelectorAll('.project-badge')].map(t => t.textContent.trim());
      const id = card.dataset.projectId;
      if (title) {
        searchIndex.push({ type: 'project', title, description: desc || '', tags: tags.join(', '), id, element: card });
      }
    });

    const heroCard = document.querySelector('.project-hero-card');
    if (heroCard) {
      const title = heroCard.querySelector('.project-hero-title')?.textContent?.trim();
      const desc = heroCard.querySelector('.project-hero-desc')?.textContent?.trim();
      const tags = [...heroCard.querySelectorAll('.project-badge')].map(t => t.textContent.trim());
      const id = heroCard.dataset.projectId;
      if (title) {
        searchIndex.push({ type: 'project', title, description: desc || '', tags: tags.join(', '), id, element: heroCard });
      }
    }

    const sectionData = [
      { id: '#about', title: 'About' },
      { id: '#skills', title: 'Skills' },
      { id: '#projects', title: 'Projects' },
      { id: '#experience', title: 'Experience' },
      { id: '#education', title: 'Education' },
      { id: '#contact', title: 'Contact' },
    ];

    sectionData.forEach(s => {
      const el = document.querySelector(s.id);
      if (el) {
        const text = el.textContent.trim().substring(0, 180).replace(/\s+/g, ' ');
        searchIndex.push({ type: 'section', title: s.title, description: text, id: s.id, element: el });
      }
    });

    document.querySelectorAll('.skill-badge').forEach(badge => {
      const name = badge.textContent.trim();
      if (name) {
        searchIndex.push({ type: 'skill', title: name, description: 'Skill & Toolkit', id: '#skills', element: badge });
      }
    });
  }

  function openSearch() {
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput.focus(), 100);
    if (window.lenis) window.lenis.stop();
    document.body.style.overflow = 'hidden';
    selectedIndex = -1;
  }

  function closeSearch() {
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
    searchInput.value = '';
    searchResults.innerHTML = '<div class="search-empty">Type to start searching...</div>';
    if (window.lenis) window.lenis.start();
    document.body.style.overflow = '';
    searchToggle.focus();
  }

  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function renderResults(query) {
    if (!query || query.length < 1) {
      searchResults.innerHTML = '<div class="search-empty">Type to start searching...</div>';
      currentResults = [];
      return;
    }

    const q = query.toLowerCase();
    currentResults = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.tags && item.tags.toLowerCase().includes(q))
    );

    if (currentResults.length === 0) {
      searchResults.innerHTML = `<div class="search-empty">No results found for "<strong>${query}</strong>"</div>`;
      return;
    }

    selectedIndex = -1;
    let html = '';
    currentResults.forEach((item, i) => {
      const icon = item.type === 'project' ? 'fas fa-code' :
                   item.type === 'skill' ? 'fas fa-bolt' :
                   'fas fa-file-alt';
      const badge = item.type === 'project' ? 'Project' :
                    item.type === 'skill' ? 'Skill' :
                    'Section';
      html += `
        <a class="search-result-item" data-index="${i}" data-type="${item.type}" data-id="${item.id}">
          <div class="search-result-icon"><i class="${icon}"></i></div>
          <div class="search-result-content">
            <div class="search-result-title">${highlightText(item.title, query)}</div>
            <div class="search-result-desc">${highlightText(item.description.substring(0, 120), query)}</div>
          </div>
          <span class="search-result-badge">${badge}</span>
        </a>
      `;
    });
    searchResults.innerHTML = html;
  }

  function navigateTo(item) {
    closeSearch();
    if (item.type === 'project') {
      if (typeof window.openModal === 'function') {
        window.openModal(item.id, item.element);
      } else {
        const projects = document.querySelector('#projects');
        if (projects && window.lenis) window.lenis.scrollTo(projects, { offset: -80 });
      }
    } else {
      const target = document.querySelector(item.id);
      if (target && window.lenis) {
        window.lenis.scrollTo(target, { offset: -80 });
      }
    }
  }

  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    buildIndex();
    openSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      e.preventDefault();
      buildIndex();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal.classList.contains('open')) {
      closeSearch();
    }
  });

  searchInput.addEventListener('input', () => {
    renderResults(searchInput.value.trim());
  });

  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('selected', i === selectedIndex));
      if (items[selectedIndex]) items[selectedIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      items.forEach((el, i) => el.classList.toggle('selected', i === selectedIndex));
      if (items[selectedIndex]) items[selectedIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && selectedIndex >= 0 && currentResults[selectedIndex]) {
      navigateTo(currentResults[selectedIndex]);
    }
  });

  searchResults.addEventListener('wheel', (e) => {
    e.stopPropagation();
  }, { passive: true });

  searchResults.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.search-result-item');
    if (itemEl) {
      const index = parseInt(itemEl.dataset.index);
      if (currentResults[index]) navigateTo(currentResults[index]);
    }
  });

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearch);
} else {
  initSearch();
}

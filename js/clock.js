(function() {
    const languages = [
      { label: 'Flutter', color: '#54c5f8' },
      { label: 'Dart',    color: '#00d2b8' },
      { label: 'C',       color: '#a8b9cc' },
      { label: 'Python',  color: '#ffd343' },
      { label: 'JS',      color: '#f7df1e' },
      { label: 'HTML',    color: '#e44d26' },
      { label: 'CSS',     color: '#264de4' },
      { label: 'React',   color: '#61dafb' },
      { label: 'Swift',   color: '#fa7343' },
      { label: 'Kotlin',  color: '#7f52ff' },
      { label: 'Go',      color: '#00add8' },
      { label: 'Rust',    color: '#ce4a00' },
    ];

    const clock  = document.getElementById('clock');
    if (!clock) return;

    const R      = clock.offsetWidth / 2;

    /* ── Draw tick marks ── */
    function drawTicks() {
      // Clear existing ticks if any (to handle resize if needed, though here it's static)
      const existingTicks = clock.querySelectorAll('.tick');
      existingTicks.forEach(t => t.remove());

      const currentR = clock.offsetWidth / 2;

      for (let i = 0; i < 60; i++) {
        const isMajor = i % 5 === 0;
        const angle   = (i / 60) * 360;
        const rad     = (angle - 90) * Math.PI / 180;
        const len     = isMajor ? (currentR * 0.0875) : (currentR * 0.0375);
        const dist    = currentR - (isMajor ? (currentR * 0.125) : (currentR * 0.1));

        const tx = currentR + dist * Math.cos(rad);
        const ty = currentR + dist * Math.sin(rad);

        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.style.cssText = `
          width: ${isMajor ? '2px' : '1px'};
          height: ${len}px;
          background: ${isMajor ? 'var(--accent-2-color)' : 'var(--border-color)'};
          left: ${tx}px;
          top: ${ty - len}px;
          transform: rotate(${angle}deg);
          opacity: ${isMajor ? '1' : '0.5'};
        `;
        clock.appendChild(tick);
      }
    }

    /* ── Draw language labels ── */
    function drawLabels() {
      const existingLabels = clock.querySelectorAll('.lang-label');
      existingLabels.forEach(l => l.remove());

      const currentR = clock.offsetWidth / 2;

      languages.forEach((lang, i) => {
        const angle   = (i / 12) * 360;
        const rad     = (angle - 90) * Math.PI / 180;
        const dist    = currentR - (currentR * 0.3);

        const lx = currentR + dist * Math.cos(rad);
        const ly = currentR + dist * Math.sin(rad);

        const lbl = document.createElement('div');
        lbl.className = 'lang-label';
        lbl.textContent = lang.label;
        lbl.style.left  = lx + 'px';
        lbl.style.top   = ly + 'px';
        lbl.style.color = lang.color;
        lbl.style.fontSize = lang.label.length > 4 ? (currentR * 0.056 + 'px') : (currentR * 0.065 + 'px');
        clock.appendChild(lbl);
      });
    }

    drawTicks();
    drawLabels();

    // Re-draw on resize to keep things centered if size changes via CSS
    window.addEventListener('resize', () => {
        drawTicks();
        drawLabels();
    });

    /* ── Clock hands animation ── */
    function updateClock() {
      const now = new Date();
      const h   = now.getHours() % 12;
      const m   = now.getMinutes();
      const s   = now.getSeconds();
      const ms  = now.getMilliseconds();

      const sDeg = (s + ms / 1000) * 6;
      const mDeg = (m + s  / 60)   * 6;
      const hDeg = (h + m  / 60)   * 30;

      const hourHand = document.getElementById('hand-hour');
      const minuteHand = document.getElementById('hand-minute');
      const secondHand = document.getElementById('hand-second');

      if (hourHand) hourHand.style.transform   = `rotate(${hDeg}deg)`;
      if (minuteHand) minuteHand.style.transform = `rotate(${mDeg}deg)`;
      if (secondHand) secondHand.style.transform = `rotate(${sDeg}deg)`;

      /* Digital display */
      const pad  = n => String(n).padStart(2, '0');
      const digitalTime = document.getElementById('digital-time');
      if (digitalTime) {
        digitalTime.textContent = `${pad(now.getHours())}:${pad(m)}:${pad(s)}`;
      }

      const digitalDate = document.getElementById('digital-date');
      if (digitalDate) {
        const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        digitalDate.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
      }

      requestAnimationFrame(updateClock);
    }

    updateClock();
})();

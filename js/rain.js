/* ==========================================================================
   LANGUAGE BADGE RAIN EFFECT (js/rain.js)
   ========================================================================== */

function initRain() {
  const canvas = document.getElementById('hero-rain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Language list
  const languages = [
    "C", "C++", "C#", "Dart", "JavaScript", "TypeScript", "Python", "Go", 
    "Rust", "Flutter", "Swift", "Kotlin", "Java", "PHP", "Ruby", "Scala", 
    "Haskell", "Elixir", "Clojure", "Lua", "Perl", "R", "MATLAB", "Bash", 
    "PowerShell", "SQL", "GraphQL", "HTML", "CSS", "SASS", "Solidity", 
    "Assembly", "Fortran", "COBOL", "Zig", "Nim", "Julia", "Erlang", 
    "OCaml", "F#"
  ];

  // Cycling Accent Colors
  const colors = [
    '#00e5ff', // cyan
    '#ff2a85', // pink
    '#00e676', // green
    '#ffb300', // amber
    '#b026ff', // purple
    '#ff9100', // orange
    '#ff3366', // red
    '#00f5d4', // teal
    '#00b0ff', // blue
    '#ff5e62'  // coral
  ];

  // Map languages to colors by cycling
  const langData = languages.map((name, index) => ({
    name,
    color: colors[index % colors.length]
  }));

  let width = 0;
  let height = 0;
  let dpr = 1;

  // Column / Rain configuration
  const colWidth = 80; // horizontal separation lane width
  let columns = [];

  function resize() {
    // Robust size detection: try client dimensions first, then bounding rect, fallback to window
    const parent = canvas.parentElement;
    if (parent) {
      width = parent.clientWidth;
      height = parent.clientHeight;
    } else {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    if (!width || !height) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initColumns();
  }

  function initColumns() {
    columns = [];
    const numCols = Math.max(8, Math.floor(width / colWidth));

    for (let i = 0; i < numCols; i++) {
      const baseColX = i * colWidth;
      // Staggered column X position within the lane
      const x = baseColX + Math.random() * (colWidth - 30) + 15;
      const speed = 0.3 + Math.random() * 0.7; // fall speed 0.3 to 0.9 px/frame

      // Determine how many badges to place in this column
      const badgesCount = Math.random() > 0.5 ? 2 : 1;
      const badges = [];

      for (let j = 0; j < badgesCount; j++) {
        const lang = langData[Math.floor(Math.random() * langData.length)];
        badges.push({
          y: -50 - Math.random() * height * 1.5, // staggered initial y offsets
          lang: lang,
          opacity: 0.3 // 30% opacity
        });
      }

      columns.push({
        x,
        speed,
        badges
      });
    }
  }

  // Draw pill shape badge
  function drawBadge(x, y, text, color, opacity) {
    ctx.save();
    
    // Set opacity for fill
    ctx.globalAlpha = opacity * 0.25; // subtle background fill
    ctx.font = '10px monospace';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // Measure text width
    const textWidth = ctx.measureText(text).width;
    const paddingX = 8;
    const paddingY = 4;
    const badgeW = textWidth + paddingX * 2;
    const badgeH = 10 + paddingY * 2; // Font height (approx 10px) + padding
    const radius = 11; // border-radius: 11px

    const bx = x - badgeW / 2;
    const by = y - badgeH / 2;

    // Draw pill path
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(bx, by, badgeW, badgeH, radius);
    } else {
      // Fallback
      ctx.moveTo(bx + radius, by);
      ctx.lineTo(bx + badgeW - radius, by);
      ctx.quadraticCurveTo(bx + badgeW, by, bx + badgeW, by + radius);
      ctx.lineTo(bx + badgeW, by + badgeH - radius);
      ctx.quadraticCurveTo(bx + badgeW, by + badgeH, bx + badgeW - radius, by + badgeH);
      ctx.lineTo(bx + radius, by + badgeH);
      ctx.quadraticCurveTo(bx, by + badgeH, bx, by + badgeH - radius);
      ctx.lineTo(bx, by + radius);
      ctx.quadraticCurveTo(bx, by, bx + radius, by);
      ctx.closePath();
    }

    ctx.fillStyle = color;
    ctx.fill();

    // Matching low-opacity border
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Colored text
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    columns.forEach(col => {
      col.badges.forEach(badge => {
        // Fall down
        badge.y += col.speed;

        // Reset if it goes below canvas
        if (badge.y > height + 40) {
          badge.y = -50 - Math.random() * 150; // Random offset above screen
          badge.lang = langData[Math.floor(Math.random() * langData.length)];
          badge.opacity = 0.3;
        }

        // Draw the badge
        drawBadge(col.x, badge.y, badge.lang.name, badge.lang.color, badge.opacity);
      });
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  
  // Initial size and run
  resize();
  
  // Extra triggers to ensure dimensions are calculated after layout completes
  setTimeout(resize, 100);
  setTimeout(resize, 500);
  window.addEventListener('load', resize);

  requestAnimationFrame(animate);
}

// Run immediately if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRain);
} else {
  initRain();
}

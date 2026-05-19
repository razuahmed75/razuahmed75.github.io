(() => {
    if ('ontouchstart' in window || window.innerWidth <= 768) return;

    const canvas = document.getElementById('scroll-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = window.devicePixelRatio || 1;
    const CW = 22;
    const cx = CW / 2;

    let canvasH = 0;
    let scrollRatio = 0;
    let lastScrollRatio = 0;
    let animationId = null;
    let t = 0;
    let frame = 0;

    const particles = [];
    const MAX_PARTICLES = 80;

    let boltPts = [];
    let boltLife = 0;
    let boltBranch = null;

    function getAccent() {
        const v = getComputedStyle(document.documentElement)
            .getPropertyValue('--accent-2-color')
            .trim();
        return v || '#00b4d8';
    }

    function rgba(hex, alpha) {
        const h = hex.startsWith('#') ? hex.slice(1) : '00b4d8';
        const r = parseInt(h.slice(0, 2), 16);
        const g = parseInt(h.slice(2, 4), 16);
        const b = parseInt(h.slice(4, 6), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    function resizeCanvas() {
        canvasH = window.innerHeight;
        canvas.width = CW * DPR;
        canvas.height = canvasH * DPR;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(DPR, DPR);
    }

    function updateScrollRatio() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        scrollRatio = max > 0 ? window.scrollY / max : 0;
    }

    function roundedRect(x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x + r, y);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }

    function createBolt(ty, thumbH) {
        boltPts = [];
        boltBranch = null;
        const segments = 12;
        for (let i = 0; i <= segments; i++) {
            boltPts.push({
                x: cx + (Math.random() - 0.5) * 8,
                y: ty + (i / segments) * thumbH
            });
        }
        boltBranch = boltPts[Math.floor(segments * 0.4)];
        boltLife = 1;
    }

    // Particles float UPWARD from the thumb center
    function spawnParticles(ty, thumbH, accent) {
        const spawnY = ty + thumbH * 0.5;
        for (let i = 0; i < 6; i++) {
            particles.push({
                x: cx + (Math.random() - 0.5) * 6,
                y: spawnY,
                vx: (Math.random() - 0.5) * 0.8,
                vy: -(Math.random() * 2 + 1),
                life: 1,
                r: Math.random() * 2 + 1,
                cyan: Math.random() > 0.4,
                accent
            });
        }
        if (particles.length > MAX_PARTICLES) {
            particles.splice(0, particles.length - MAX_PARTICLES);
        }
    }

    function draw() {
        const ACCENT = getAccent();
        updateScrollRatio();
        ctx.clearRect(0, 0, CW, canvasH);
        t += 0.05;
        frame++;

        const thumbH = Math.max(36, canvasH * 0.08);

        // REVERSED: thumb starts at bottom (scrollRatio=0), moves up as you scroll
        const reversedRatio = 1 - scrollRatio;
        const ty = reversedRatio * (canvasH - thumbH);
        const midY = ty + thumbH * 0.5;

        // Track line
        ctx.beginPath();
        ctx.moveTo(cx, 8);
        ctx.lineTo(cx, canvasH - 8);
        ctx.strokeStyle = rgba(ACCENT, 0.1);
        ctx.lineWidth = 1;
        ctx.stroke();

        // Tick marks along track
        const tickCount = 8;
        for (let i = 0; i <= tickCount; i++) {
            const yt = 8 + (i / tickCount) * (canvasH - 16);
            const near = Math.abs(yt - midY) < (canvasH / tickCount / 2);
            ctx.beginPath();
            ctx.moveTo(cx - 3, yt);
            ctx.lineTo(cx + 3, yt);
            ctx.strokeStyle = rgba(ACCENT, near ? 0.5 : 0.12);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        if (Math.abs(scrollRatio - lastScrollRatio) > 0.003) {
            spawnParticles(ty, thumbH, ACCENT);
        }
        lastScrollRatio = scrollRatio;

        // Particles drift upward
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy -= 0.08;   // upward acceleration (no gravity pull down)
            p.life -= 0.035;
            if (p.life <= 0) {
                particles.splice(i, 1);
                continue;
            }
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.cyan
                ? rgba(ACCENT, p.life * 0.9)
                : `rgba(255,255,255,${p.life * 0.6})`;
            ctx.fill();
        }

        // Lightning bolt every 7 frames
        if (frame % 7 === 0) createBolt(ty, thumbH);

        if (boltLife > 0 && boltPts.length > 1) {
            ctx.save();
            ctx.shadowColor = ACCENT;
            ctx.shadowBlur = 10;
            ctx.strokeStyle = rgba(ACCENT, boltLife * 0.85);
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = boltLife;
            ctx.beginPath();
            ctx.moveTo(boltPts[0].x, boltPts[0].y);
            for (const p of boltPts) ctx.lineTo(p.x, p.y);
            ctx.stroke();
            if (boltBranch) {
                const a = Math.random() * Math.PI - Math.PI / 2;
                ctx.beginPath();
                ctx.moveTo(boltBranch.x, boltBranch.y);
                ctx.lineTo(
                    boltBranch.x + Math.cos(a) * 12,
                    boltBranch.y + Math.sin(a) * 12
                );
                ctx.lineWidth = 0.7;
                ctx.globalAlpha = boltLife * 0.45;
                ctx.stroke();
            }
            ctx.restore();
            boltLife -= 0.16;
        }

        // Thumb body
        ctx.save();
        ctx.shadowColor = ACCENT;
        ctx.shadowBlur = 14;

        // Outer glow fill
        roundedRect(cx - 4, ty, 8, thumbH, 3);
        ctx.fillStyle = rgba(ACCENT, 0.15);
        ctx.fill();

        // Solid thumb
        roundedRect(cx - 3, ty + 1, 6, thumbH - 2, 2);
        ctx.fillStyle = rgba(ACCENT, 0.85);
        ctx.fill();

        // CENTERED arrow — pointing down (toward scroll direction)
        ctx.beginPath();
        ctx.moveTo(cx, midY + 5);
        ctx.lineTo(cx - 5, midY - 4);
        ctx.lineTo(cx + 5, midY - 4);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();

        // Pulsing dot at center of arrow
        const pulse = Math.sin(t * 3) * 0.3 + 0.6;
        ctx.beginPath();
        ctx.arc(cx, midY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = rgba(ACCENT, pulse);
        ctx.fill();

        ctx.restore();

        // Gloss highlights on thumb
        const glossFracs = [0.2, 0.5, 0.8];
        for (const frac of glossFracs) {
            ctx.beginPath();
            ctx.arc(cx - 1, ty + thumbH * frac, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${0.12 * (1 - frac) + 0.06})`;
            ctx.fill();
        }

        animationId = requestAnimationFrame(draw);
    }

    function start() {
        if (!animationId) animationId = requestAnimationFrame(draw);
    }

    function stop() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    window.addEventListener('resize', () => {
        stop();
        resizeCanvas();
        updateScrollRatio();
        start();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else start();
    });

    resizeCanvas();
    updateScrollRatio();
    start();
})();

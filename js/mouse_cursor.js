
        // (function() {
        //     // Detect touch device - skip entire cursor script on touch support
        //     if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches) {
        //         return;
        //     }

        //     const dot = document.getElementById('cursor-dot');
        //     const ring = document.getElementById('cursor-ring');
            
        //     if (!dot || !ring) return;

        //     // Enable cursor-none style on body
        //     document.body.classList.add('custom-cursor-enabled');

        //     let dotX = 0, dotY = 0;
        //     let ringX = 0, ringY = 0;
        //     let isHovered = false;
        //     let hasMoved = false;

        //     // Track real mouse position
        //     window.addEventListener('mousemove', (e) => {
        //         dotX = e.clientX;
        //         dotY = e.clientY;
                
        //         // Show elements on first mousemove
        //         if (!hasMoved) {
        //             hasMoved = true;
        //             dot.style.opacity = '1';
        //             ring.style.opacity = '1';
        //         }
        //     });

        //     // Smooth linear interpolation (lerp) for the ring position
        //     function updateCursor() {
        //         // Lerp formula: ringX += (dotX - ringX) * 0.12
        //         ringX += (dotX - ringX) * 0.12;
        //         ringY += (dotY - ringY) * 0.12;

        //         dot.style.transform = `translate(-50%, -50%) translate3d(${dotX}px, ${dotY}px, 0)`;
        //         ring.style.transform = `translate(-50%, -50%) translate3d(${ringX}px, ${ringY}px, 0)`;

        //         requestAnimationFrame(updateCursor);
        //     }
        //     requestAnimationFrame(updateCursor);

        //     // Hover interactions on clickable elements
        //     const clickables = document.querySelectorAll('a, button, [role="button"], input, textarea, .project-card, .btn, .social-links a');
            
        //     clickables.forEach(el => {
        //         el.addEventListener('mouseenter', () => {
        //             isHovered = true;
        //             dot.style.width = '12px';
        //             dot.style.height = '12px';
        //             ring.style.width = '56px';
        //             ring.style.height = '56px';
        //             ring.style.opacity = '0.5';
        //         });

        //         el.addEventListener('mouseleave', () => {
        //             isHovered = false;
        //             dot.style.width = '8px';
        //             dot.style.height = '8px';
        //             ring.style.width = '36px';
        //             ring.style.height = '36px';
        //             ring.style.opacity = '1';
        //         });
        //     });

        //     // Mousedown / Mouseup scaling
        //     window.addEventListener('mousedown', () => {
        //         dot.style.width = '5px';
        //         dot.style.height = '5px';
        //         ring.style.width = '28px';
        //         ring.style.height = '28px';
        //     });

        //     window.addEventListener('mouseup', () => {
        //         if (isHovered) {
        //             dot.style.width = '12px';
        //             dot.style.height = '12px';
        //             ring.style.width = '56px';
        //             ring.style.height = '56px';
        //             ring.style.opacity = '0.5';
        //         } else {
        //             dot.style.width = '8px';
        //             dot.style.height = '8px';
        //             ring.style.width = '36px';
        //             ring.style.height = '36px';
        //             ring.style.opacity = '1';
        //         }
        //     });

        //     // Window boundary handling
        //     document.addEventListener('mouseleave', () => {
        //         dot.style.opacity = '0';
        //         ring.style.opacity = '0';
        //     });

        //     document.addEventListener('mouseenter', () => {
        //         if (hasMoved) {
        //             dot.style.opacity = '1';
        //             ring.style.opacity = '1';
        //         }
        //     });
        // })();

        (function () {
    const dot   = document.getElementById('cursor-dot');
    const r1    = document.getElementById('cursor-ring');
    const r2    = document.getElementById('cursor-ring-2');
    const line  = document.getElementById('cursor-line');

    let mx = 0, my = 0, rx = 0, ry = 0, angle = 0, visible = false;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
        if (!visible) {
            visible = true;
            [dot, r1, r2, line].forEach(el => el.style.opacity = '1');
        }
    });

    document.addEventListener('mouseleave', () => {
        visible = false;
        [dot, r1, r2, line].forEach(el => el.style.opacity = '0');
    });

    (function loop() {
        angle = (angle + 2) % 360;
        rx += (mx - rx) * 0.08;
        ry += (my - ry) * 0.08;

        r1.style.left = rx + 'px';
        r1.style.top  = ry + 'px';
        r2.style.left = rx + 'px';
        r2.style.top  = ry + 'px';

        const rad = angle * Math.PI / 180;
        const lx  = rx + Math.cos(rad) * 25;
        const ly  = ry + Math.sin(rad) * 25;
        const len = Math.hypot(lx - rx, ly - ry);

        line.style.left      = rx + 'px';
        line.style.top       = ry + 'px';
        line.style.width     = len + 'px';
        line.style.transform = `translate(-0%, -50%) rotate(${angle}deg)`;

        requestAnimationFrame(loop);
    })();
})();
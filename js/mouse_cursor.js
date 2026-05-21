(function () {
    const dot  = document.getElementById('cursor-dot');
    const r1   = document.getElementById('cursor-ring');
    const r2   = document.getElementById('cursor-ring-2');
    const line = document.getElementById('cursor-line');

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

    document.addEventListener('mousedown', () => {
        dot.style.width  = '4px';
        dot.style.height = '4px';
        r1.style.width   = '22px';
        r1.style.height  = '22px';
        r2.style.width   = '11px';
        r2.style.height  = '11px';
    });

    document.addEventListener('mouseup', () => {
        dot.style.width  = '8px';
        dot.style.height = '8px';
        r1.style.width   = '40px';
        r1.style.height  = '40px';
        r2.style.width   = '21px';
        r2.style.height  = '21px';
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
        const lx  = rx + Math.cos(rad) * 10;
        const ly  = ry + Math.sin(rad) * 10;
        const len = Math.hypot(lx - rx, ly - ry);

        line.style.left      = rx + 'px';
        line.style.top       = ry + 'px';
        line.style.width     = len + 'px';
        line.style.transform = `translate(0, -50%) rotate(${angle}deg)`;

        requestAnimationFrame(loop);
    })();
})();
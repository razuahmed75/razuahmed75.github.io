
        (function() {
            // Detect touch device - skip entire cursor script on touch support
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches) {
                return;
            }

            const dot = document.getElementById('cursor-dot');
            const ring = document.getElementById('cursor-ring');
            
            if (!dot || !ring) return;

            // Enable cursor-none style on body
            document.body.classList.add('custom-cursor-enabled');

            let dotX = 0, dotY = 0;
            let ringX = 0, ringY = 0;
            let isHovered = false;
            let hasMoved = false;

            // Track real mouse position
            window.addEventListener('mousemove', (e) => {
                dotX = e.clientX;
                dotY = e.clientY;
                
                // Show elements on first mousemove
                if (!hasMoved) {
                    hasMoved = true;
                    dot.style.opacity = '1';
                    ring.style.opacity = '1';
                }
            });

            // Smooth linear interpolation (lerp) for the ring position
            function updateCursor() {
                // Lerp formula: ringX += (dotX - ringX) * 0.12
                ringX += (dotX - ringX) * 0.12;
                ringY += (dotY - ringY) * 0.12;

                dot.style.transform = `translate(-50%, -50%) translate3d(${dotX}px, ${dotY}px, 0)`;
                ring.style.transform = `translate(-50%, -50%) translate3d(${ringX}px, ${ringY}px, 0)`;

                requestAnimationFrame(updateCursor);
            }
            requestAnimationFrame(updateCursor);

            // Hover interactions on clickable elements
            const clickables = document.querySelectorAll('a, button, [role="button"], input, textarea, .project-card, .btn, .social-links a');
            
            clickables.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    isHovered = true;
                    dot.style.width = '12px';
                    dot.style.height = '12px';
                    ring.style.width = '56px';
                    ring.style.height = '56px';
                    ring.style.opacity = '0.5';
                });

                el.addEventListener('mouseleave', () => {
                    isHovered = false;
                    dot.style.width = '8px';
                    dot.style.height = '8px';
                    ring.style.width = '36px';
                    ring.style.height = '36px';
                    ring.style.opacity = '1';
                });
            });

            // Mousedown / Mouseup scaling
            window.addEventListener('mousedown', () => {
                dot.style.width = '5px';
                dot.style.height = '5px';
                ring.style.width = '28px';
                ring.style.height = '28px';
            });

            window.addEventListener('mouseup', () => {
                if (isHovered) {
                    dot.style.width = '12px';
                    dot.style.height = '12px';
                    ring.style.width = '56px';
                    ring.style.height = '56px';
                    ring.style.opacity = '0.5';
                } else {
                    dot.style.width = '8px';
                    dot.style.height = '8px';
                    ring.style.width = '36px';
                    ring.style.height = '36px';
                    ring.style.opacity = '1';
                }
            });

            // Window boundary handling
            document.addEventListener('mouseleave', () => {
                dot.style.opacity = '0';
                ring.style.opacity = '0';
            });

            document.addEventListener('mouseenter', () => {
                if (hasMoved) {
                    dot.style.opacity = '1';
                    ring.style.opacity = '1';
                }
            });
        })();
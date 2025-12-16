document.querySelectorAll('.hover-img').forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.dataset.hover;
    const originalWidth = img.style.width;
    const originalHeight = img.style.height;

    img.addEventListener('mouseenter', () => {
        img.src = hoverSrc;
        img.style.width = '100%';
        img.style.height = '220px';
    });

    img.addEventListener('mouseleave', () => {
        img.src = originalSrc;
        img.style.width = originalWidth;
        img.style.height = originalHeight;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card-hover').forEach(card => {
        const img = card.querySelector('.hover-img');
        if (!img) return;

        const originalSrc = img.src;
        const hoverSrc = img.dataset.hover;
        const originalWidth = img.style.width;
        const originalHeight = img.style.height;

        card.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
            img.style.width = '100%';
            img.style.height = '220px';
        });

        card.addEventListener('mouseleave', () => {
            img.src = originalSrc;
            img.style.width = originalWidth;
            img.style.height = originalHeight;
        });
    });
});

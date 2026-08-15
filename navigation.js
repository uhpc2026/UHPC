document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = [...document.querySelectorAll('.desktop-dropdown')];
    const closeTimers = new WeakMap();

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            window.clearTimeout(closeTimers.get(dropdown));
            dropdowns.forEach(other => {
                if (other !== dropdown) other.removeAttribute('open');
            });
            dropdown.setAttribute('open', '');
        });

        dropdown.addEventListener('mouseleave', () => {
            const timer = window.setTimeout(() => dropdown.removeAttribute('open'), 160);
            closeTimers.set(dropdown, timer);
        });

        dropdown.addEventListener('toggle', () => {
            if (!dropdown.open) return;
            dropdowns.forEach(other => {
                if (other !== dropdown) other.removeAttribute('open');
            });
        });
        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => dropdown.removeAttribute('open'));
        });
    });

    document.addEventListener('pointerdown', event => {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) dropdown.removeAttribute('open');
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        dropdowns.forEach(dropdown => dropdown.removeAttribute('open'));
    });
});

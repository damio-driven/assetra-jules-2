const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);

            // Handle specific animations like the vertical line
            if (entry.target.classList.contains('gold-line-vertical-container')) {
                entry.target.querySelector('.gold-line-vertical').classList.add('visible');
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe reveal elements
    const revealElements = document.querySelectorAll('.reveal-up, .gold-line-vertical-container');
    revealElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
    });

    const closeMenu = () => {
        mobileMenu.classList.add('translate-x-full');
    };

    closeMenuBtn.addEventListener('click', closeMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Stat counter animation (simple)
    const stats = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                statObserver.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => statObserver.observe(stat));
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

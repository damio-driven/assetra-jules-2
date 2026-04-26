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

            if (entry.target.classList.contains('scroll-indicator-container')) {
                entry.target.querySelector('.scroll-indicator').classList.add('visible');
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Observe reveal elements
    const revealElements = document.querySelectorAll('.reveal-up, .scroll-indicator-container');
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

    // Stat counter animation
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

    // Form simple validation visually
    const form = document.querySelector('form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Invio in corso...';
            btn.style.opacity = '0.7';
            setTimeout(() => {
                btn.innerHTML = 'Messaggio Inviato';
                btn.style.backgroundColor = '#1A1A18';
                btn.style.color = '#FFFFFF';
                btn.style.borderColor = '#1A1A18';
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style = '';
                }, 3000);
            }, 1000);
        });
    }
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

document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal on scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Typewriter effect
    const runTypewriter = () => {
        const typewriterElements = document.querySelectorAll('.hero-headline');
        typewriterElements.forEach(el => {
            const fullHTML = el.getAttribute(`data-${document.documentElement.lang || 'it'}`);
            // Simple check to separate text from the span dot
            let textPart = fullHTML;
            let hasAccent = false;
            if (fullHTML.includes('<span')) {
                textPart = fullHTML.split('<span')[0];
                hasAccent = true;
            }

            el.innerHTML = '';
            let i = 0;
            const type = () => {
                if (i < textPart.length) {
                    el.innerHTML += textPart.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else if (hasAccent) {
                    el.innerHTML += '<span class="text-accent">.</span>';
                }
            };
            setTimeout(type, 500);
        });
    };

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-desktop');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Language Toggle logic
    const langBtn = document.getElementById('lang-switch');
    let currentLang = localStorage.getItem('assetra-lang') || 'it';

    const updateLanguage = (lang) => {
        document.querySelectorAll('[data-it]').forEach(el => {
            const content = el.getAttribute(`data-${lang}`);
            if (content.includes('<')) {
                el.innerHTML = content;
            } else {
                el.textContent = content;
            }
        });

        // Special handling for the select sector placeholder
        const sectorSelect = document.getElementById('sector');
        if (sectorSelect) {
            const placeholder = sectorSelect.querySelector('option[disabled]');
            if (placeholder) {
                placeholder.textContent = placeholder.getAttribute(`data-${lang}`);
            }
        }

        if (langBtn) {
            langBtn.textContent = lang === 'it' ? 'EN' : 'IT';
        }
        document.documentElement.lang = lang;
        localStorage.setItem('assetra-lang', lang);

        // Trigger event for cookie banner or other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    };

    // Initialize language
    updateLanguage(currentLang);
    runTypewriter();

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'it' ? 'en' : 'it';
            updateLanguage(currentLang);
            // We don't necessarily want to re-run typewriter on every toggle
            // as it might be annoying, but for now it's fine or we just let innerHTML handle it.
        });
    }

    // Contact form submission placeholder
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = currentLang === 'it' ? 'INVIATO!' : 'SENT!';
            btn.disabled = true;
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }
});

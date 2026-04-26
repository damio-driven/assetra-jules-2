document.addEventListener('DOMContentLoaded', () => {
    // Determine language
    let lang = localStorage.getItem('assetra-lang') || 'it';

    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="container cookie-container">
            <div class="cookie-text">
                <h3 id="cookie-title"></h3>
                <p id="cookie-desc"></p>
            </div>
            <div class="cookie-actions">
                <button id="cookie-accept-all" class="btn btn-accent btn-sm"></button>
                <button id="cookie-accept-necessary" class="btn btn-ghost-gold btn-sm"></button>
                <button id="cookie-settings" class="btn btn-ghost-gold btn-sm"></button>
            </div>
        </div>
        <div id="cookie-modal" class="cookie-modal">
            <div class="cookie-modal-content">
                <h2 id="modal-title"></h2>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" checked disabled>
                        <span id="opt-necessary-label"></span>
                    </label>
                    <p id="opt-necessary-desc"></p>
                </div>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" id="opt-analytical">
                        <span id="opt-analytical-label"></span>
                    </label>
                    <p id="opt-analytical-desc"></p>
                </div>
                <div class="cookie-option">
                    <label>
                        <input type="checkbox" id="opt-marketing">
                        <span id="opt-marketing-label"></span>
                    </label>
                    <p id="opt-marketing-desc"></p>
                </div>
                <div class="modal-actions">
                    <button id="cookie-save-prefs" class="btn btn-accent btn-sm"></button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    const translations = {
        it: {
            title: "La tua Privacy",
            desc: "Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico.",
            all: "ACCETTA TUTTI",
            necessary: "SOLO NECESSARI",
            prefs: "PREFERENZE",
            modalTitle: "Impostazioni Cookie",
            optNecessary: "Necessari",
            optNecessaryDesc: "Essenziali per il funzionamento del sito.",
            optAnalytical: "Analitici",
            optAnalyticalDesc: "Ci aiutano a capire come gli utenti interagiscono con il sito.",
            optMarketing: "Marketing",
            optMarketingDesc: "Permettono di visualizzare contenuti social e pubblicità mirata.",
            save: "SALVA PREFERENZE"
        },
        en: {
            title: "Your Privacy",
            desc: "We use cookies to improve your experience and analyze traffic.",
            all: "ACCEPT ALL",
            necessary: "ONLY NECESSARY",
            prefs: "PREFERENCES",
            modalTitle: "Cookie Settings",
            optNecessary: "Necessary",
            optNecessaryDesc: "Essential for the website to function.",
            optAnalytical: "Analytical",
            optAnalyticalDesc: "Help us understand how visitors interact with the site.",
            optMarketing: "Marketing",
            optMarketingDesc: "Allow displaying social content and targeted ads.",
            save: "SAVE PREFERENCES"
        }
    };

    const updateBannerText = (l) => {
        const t = translations[l];
        document.getElementById('cookie-title').textContent = t.title;
        document.getElementById('cookie-desc').textContent = t.desc;
        document.getElementById('cookie-accept-all').textContent = t.all;
        document.getElementById('cookie-accept-necessary').textContent = t.necessary;
        document.getElementById('cookie-settings').textContent = t.prefs;
        document.getElementById('modal-title').textContent = t.modalTitle;
        document.getElementById('opt-necessary-label').textContent = t.optNecessary;
        document.getElementById('opt-necessary-desc').textContent = t.optNecessaryDesc;
        document.getElementById('opt-analytical-label').textContent = t.optAnalytical;
        document.getElementById('opt-analytical-desc').textContent = t.optAnalyticalDesc;
        document.getElementById('opt-marketing-label').textContent = t.optMarketing;
        document.getElementById('opt-marketing-desc').textContent = t.optMarketingDesc;
        document.getElementById('cookie-save-prefs').textContent = t.save;
    };

    updateBannerText(lang);

    window.addEventListener('languageChanged', (e) => {
        lang = e.detail;
        updateBannerText(lang);
    });

    const consent = localStorage.getItem('assetra_cookie_consent');
    if (!consent) {
        setTimeout(() => banner.classList.add('show'), 1000);
    }

    const saveConsent = (level, customData = null) => {
        const consentData = customData || {
            necessary: true,
            analytical: level === 'all',
            marketing: level === 'all',
            timestamp: new Date().getTime()
        };
        localStorage.setItem('assetra_cookie_consent', JSON.stringify(consentData));
        banner.classList.remove('show');
        document.getElementById('cookie-modal').classList.remove('active');

        if (consentData.marketing) {
            enableMarketingFeatures();
        } else {
            disableMarketingFeatures();
        }
    };

    document.getElementById('cookie-accept-all').addEventListener('click', () => saveConsent('all'));
    document.getElementById('cookie-accept-necessary').addEventListener('click', () => saveConsent('necessary'));
    document.getElementById('cookie-settings').addEventListener('click', () => {
        document.getElementById('cookie-modal').classList.add('active');
    });

    document.getElementById('cookie-save-prefs').addEventListener('click', () => {
        const customData = {
            necessary: true,
            analytical: document.getElementById('opt-analytical').checked,
            marketing: document.getElementById('opt-marketing').checked,
            timestamp: new Date().getTime()
        };
        saveConsent(null, customData);
    });

    function enableMarketingFeatures() {
        document.querySelectorAll('.social-placeholder').forEach(placeholder => {
            const icon = placeholder.querySelector('.social-icon');
            const type = icon ? icon.textContent : 'Social';
            placeholder.innerHTML = `
                <div class="social-feed-active">
                    <div class="social-icon">${type}</div>
                    <p data-it="Feed di ${type} caricato correttamente." data-en="${type} feed loaded successfully.">${lang === 'it' ? 'Feed di ' + type + ' caricato.' : type + ' feed loaded.'}</p>
                    <div class="social-mock-content">
                        <div class="mock-post"></div>
                        <div class="mock-post"></div>
                    </div>
                </div>
            `;
        });
    }

    function disableMarketingFeatures() {
        // Just leave as placeholder or revert
    }

    if (consent) {
        const data = JSON.parse(consent);
        if (data.marketing) enableMarketingFeatures();
    }
});

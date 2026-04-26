// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.createElement('div');
    consentBanner.id = 'cookie-banner';
    consentBanner.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background-color: var(--color-surface); border-top: 1px solid var(--color-border); padding: 20px; z-index: 9999; display: flex; flex-direction: column; justify-content: space-between; align-items: center; box-shadow: 0 -4px 10px rgba(0,0,0,0.05); font-family: 'DM Sans', sans-serif;">
            <div style="flex: 1; margin-bottom: 15px; max-width: 800px; text-align: center;">
                <p style="font-size: 14px; margin: 0; line-height: 1.5; color: var(--color-text);">
                    Questo sito utilizza cookie tecnici e, previo tuo consenso, cookie di profilazione e marketing per mostrarti contenuti in linea con le tue preferenze.
                    Leggi la nostra <a href="cookie-policy.html" style="text-decoration: underline;">Cookie Policy</a>.
                </p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                <button id="btn-accept-all" style="padding: 10px 24px; background-color: var(--color-text); color: white; border: none; cursor: pointer; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Accetta Tutti</button>
                <button id="btn-accept-necessary" style="padding: 10px 24px; background-color: transparent; border: 1px solid var(--color-text); color: var(--color-text); cursor: pointer; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Solo Necessari</button>
            </div>
        </div>
    `;

    if (!localStorage.getItem('assetra_cookie_consent')) {
        document.body.appendChild(consentBanner);

        document.getElementById('btn-accept-all').addEventListener('click', () => {
            localStorage.setItem('assetra_cookie_consent', JSON.stringify({ necessary: true, analytics: true, marketing: true }));
            consentBanner.remove();
            loadMarketingScripts();
        });

        document.getElementById('btn-accept-necessary').addEventListener('click', () => {
            localStorage.setItem('assetra_cookie_consent', JSON.stringify({ necessary: true, analytics: false, marketing: false }));
            consentBanner.remove();
        });
    } else {
        const consent = JSON.parse(localStorage.getItem('assetra_cookie_consent'));
        if (consent.marketing) {
            loadMarketingScripts();
        }
    }

    function loadMarketingScripts() {
        console.log('Marketing cookies accepted.');
    }
});
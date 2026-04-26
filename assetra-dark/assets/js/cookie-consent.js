// Cookie Consent Logic
document.addEventListener('DOMContentLoaded', () => {
    const consentBanner = document.createElement('div');
    consentBanner.id = 'cookie-banner';
    // Style applied directly for simplicity since it's injected
    consentBanner.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background-color: var(--color-surface); border-top: 1px solid var(--color-border); padding: 20px; z-index: 9999; display: flex; flex-direction: column; justify-content: space-between; align-items: center; box-shadow: 0 -4px 10px rgba(0,0,0,0.1);">
            <div style="flex: 1; margin-bottom: 15px; max-width: 800px; text-align: center;">
                <p style="font-size: 14px; margin: 0; line-height: 1.5; color: var(--color-text);">
                    Utilizziamo cookie necessari per il funzionamento del sito e, con il tuo consenso, cookie analitici e di marketing per migliorare la tua esperienza e mostrare contenuti personalizzati (come i social feed).
                    Consulta la nostra <a href="cookie-policy.html" style="text-decoration: underline; color: var(--color-accent);">Cookie Policy</a>.
                </p>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button id="btn-accept-all" style="padding: 10px 20px; background-color: var(--color-accent); color: white; border: none; cursor: pointer; font-size: 14px; font-weight: bold;">Accetta Tutti</button>
                <button id="btn-accept-necessary" style="padding: 10px 20px; background-color: transparent; border: 1px solid var(--color-text); color: var(--color-text); cursor: pointer; font-size: 14px;">Solo Necessari</button>
            </div>
        </div>
    `;

    // Check if consent is already saved
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
        console.log('Marketing cookies accepted. Social feeds can be loaded here.');
        // In a real scenario, this is where you'd inject the LinkedIn/Instagram script tags.
    }
});
(function() {
  const CONSENT_KEY = 'assetra_cookie_consent';

  const defaultConsent = {
    necessary: true,
    analytical: false,
    marketing: false
  };

  function getConsent() {
    const saved = localStorage.getItem(CONSENT_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  function setConsent(consent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }));
  }

  function init() {
    const banner = document.querySelector('.cookie-banner');
    const acceptAllBtn = document.getElementById('cookie-accept-all');
    const necessaryBtn = document.getElementById('cookie-necessary');
    const customizeBtn = document.getElementById('cookie-customize');

    if (!getConsent()) {
      banner.classList.add('active');
    }

    acceptAllBtn.addEventListener('click', () => {
      const consent = { necessary: true, analytical: true, marketing: true };
      setConsent(consent);
      banner.classList.remove('active');
    });

    necessaryBtn.addEventListener('click', () => {
      setConsent(defaultConsent);
      banner.classList.remove('active');
    });

    // Simple customization could be added here or in a modal
    customizeBtn.addEventListener('click', () => {
      // For now, let's just treat it as necessary only or open a modal if implemented
      alert('Personalizzazione in arrivo.');
    });
  }

  window.addEventListener('DOMContentLoaded', init);
})();

(function() {
  function checkConsentAndLoad() {
    const saved = localStorage.getItem('assetra_cookie_consent');
    const consent = saved ? JSON.parse(saved) : null;
    const placeholders = document.querySelectorAll('.social-embed-placeholder');

    if (consent && consent.marketing) {
      placeholders.forEach(el => {
        const type = el.getAttribute('data-type');
        el.innerHTML = `<div class="social-content">Feed ${type} caricato (Simulazione)</div>`;
        el.classList.add('loaded');
      });
    } else {
      placeholders.forEach(el => {
        el.innerHTML = `
          <div class="social-locked">
            <p>Accetta i cookie marketing per visualizzare il feed social.</p>
          </div>
        `;
      });
    }
  }

  window.addEventListener('cookieConsentChanged', checkConsentAndLoad);
  window.addEventListener('DOMContentLoaded', checkConsentAndLoad);
})();

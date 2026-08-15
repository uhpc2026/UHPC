(function () {
    'use strict';

    function sendEvent(eventName, destinationType) {
        if (typeof window.gtag !== 'function') return;

        window.gtag('event', eventName, {
            cta_type: destinationType,
            page_path: window.location.pathname,
            transport_type: 'beacon'
        });
    }

    document.addEventListener('click', function (event) {
        var link = event.target.closest('a[href]');
        if (!link) return;

        var href = link.getAttribute('href') || '';
        var normalizedHref = href.toLowerCase();

        if (normalizedHref.indexOf('lin.ee/') !== -1 || normalizedHref.indexOf('line.me/') !== -1) {
            sendEvent('line_click', 'line');
            return;
        }

        if (normalizedHref.indexOf('forms.gle/') !== -1 || normalizedHref.indexOf('docs.google.com/forms/') !== -1) {
            sendEvent('booking_form_click', 'google_form');
            return;
        }

        if (normalizedHref.indexOf('google.com/maps') !== -1) {
            sendEvent('map_click', 'google_maps');
            return;
        }

        if (normalizedHref.indexOf('tel:') === 0) {
            sendEvent('phone_click', 'telephone');
            return;
        }

        if (normalizedHref.indexOf('mailto:') === 0) {
            sendEvent('email_click', 'email');
            return;
        }

        if (/booking\.html(?:[?#].*)?$/.test(normalizedHref)) {
            sendEvent('booking_page_click', 'booking_page');
        }
    });
})();

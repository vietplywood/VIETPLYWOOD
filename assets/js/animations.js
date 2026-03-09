(function () {
    'use strict';

    // Accessibility check
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- 1. Hero Stagger Reveal (Page Load) ---
    if (!prefersReducedMotion) {
        var heroEls = document.querySelectorAll('.hero-reveal');
        heroEls.forEach(function (el, i) {
            setTimeout(function () {
                el.classList.add('visible');
            }, 150 * i);
        });
    } else {
        document.querySelectorAll('.hero-reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- 2. Fade In Up (Scroll) ---
    var fadeInSelector = '.animate-fade-in';
    var fadeInEls = document.querySelectorAll(fadeInSelector);

    if (fadeInEls.length > 0 && !prefersReducedMotion) {
        var fadeObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    var parent = el.parentElement;
                    var siblings = parent ? parent.querySelectorAll(fadeInSelector) : [el];
                    var index = Array.prototype.indexOf.call(siblings, el);
                    if (index < 0) index = 0;

                    el.style.animationDelay = (index * 120) + 'ms';
                    el.classList.add('in-view');
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeInEls.forEach(function (el) {
            fadeObserver.observe(el);
        });
    } else {
        fadeInEls.forEach(function (el) {
            el.classList.add('in-view');
        });
    }

    // --- 3. Float (Continuous) ---
    var floatEls = document.querySelectorAll('.float-animation');

    if (floatEls.length > 0 && !prefersReducedMotion) {
        var floatObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('float-active');
                } else {
                    entry.target.classList.remove('float-active');
                }
            });
        }, {
            threshold: 0.1
        });

        floatEls.forEach(function (el) {
            floatObserver.observe(el);
        });
    }

    // --- 5. Glow Pulse for CTA (One-time, 3s delay) ---
    var ctaBtns = document.querySelectorAll('.cta-btn');

    if (ctaBtns.length > 0 && !prefersReducedMotion) {
        var ctaObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var btn = entry.target;
                    observer.unobserve(btn);

                    setTimeout(function () {
                        btn.classList.add('glow-pulse');
                        btn.addEventListener('animationend', function () {
                            btn.classList.remove('glow-pulse');
                        }, { once: true });
                    }, 3000);
                }
            });
        }, {
            threshold: 0.3
        });

        ctaBtns.forEach(function (btn) {
            ctaObserver.observe(btn);
        });
    }

    // --- 7. Header Shadow on Scroll ---
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        var scrollThreshold = 50;

        var updateNavbarShadow = function () {
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };

        // Use passive scroll listener for performance
        window.addEventListener('scroll', updateNavbarShadow, { passive: true });
        updateNavbarShadow();
    }
})();

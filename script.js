// ============================================
// LOLA FALEYE — "LIQUID GLASS DUALITY"
// Script: Theme Toggle, Navigation, Animations
// ============================================

// --- Theme Toggle ---
function getStoredTheme() {
    return localStorage.getItem('lola-theme') || 'dark';
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lola-theme', theme);
}

// Apply theme immediately (before DOMContentLoaded) to prevent flash
applyTheme(getStoredTheme());

// --- DOM Ready ---
window.addEventListener('DOMContentLoaded', () => {

    // 1. THEME TOGGLE BUTTON
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }

    // 2. HAMBURGER MENU
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        });

        // Close on link click
        mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // 3. ACTIVE NAV LINK
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // 4. CUSTOM CURSOR (Desktop only)
    const cursor = document.querySelector('.cursor');
    if (cursor && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        const interactives = document.querySelectorAll('a, button, input, textarea, select');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // 5. GSAP ANIMATIONS
    // Pre-lock all animated elements: set visibility visible (overriding CSS hidden)
    // but keep opacity 0 so they're invisible until animated
    const elementsToHide = ['.header', '.glass-orb', '.portrait-img', '.main-title', '.hero-bottom', '.page-hero', '.about-block', '.project-card']
        .filter(sel => document.querySelector(sel));

    if (elementsToHide.length > 0) {
        gsap.set(elementsToHide, { opacity: 0, visibility: "visible" });
    }

    // Spatial transforms
    if (document.querySelector('.header')) gsap.set('.header', { y: -20 });
    if (document.querySelector('.portrait-img')) gsap.set('.portrait-img', { scale: 1.1, y: 50 });
    if (document.querySelector('.main-title')) gsap.set('.main-title', { y: 100 });
    if (document.querySelector('.hero-bottom')) gsap.set('.hero-bottom', { y: 20 });
    if (document.querySelector('.glass-orb')) gsap.set('.glass-orb', { scale: 0.8 });
    if (document.querySelector('.page-hero')) gsap.set('.page-hero', { y: 30 });
    if (document.querySelector('.about-block')) gsap.set('.about-block', { y: 30 });

    // REVEAL BODY
    gsap.set('body', { visibility: "visible" });

    // TIMELINE
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header always animates
    if (document.querySelector('.header')) {
        tl.to('.header', { y: 0, opacity: 1, duration: 1, delay: 0.2 });
    }

    // Hero page animations
    if (document.querySelector('.hero')) {
        tl.to('.glass-orb', { opacity: 0.4, scale: 1, duration: 2.5, stagger: 0.4, ease: "power2.out" }, "-=0.5")
            .to('.portrait-img', { y: 0, scale: 1, opacity: 1, duration: 1.5, ease: "power4.out" }, "-=2")
            .to('.main-title', { y: 0, opacity: 1, duration: 1.2, stagger: 0.2 }, "-=1.2")
            .to('.hero-bottom', { y: 0, opacity: 1, duration: 1 }, "-=0.5");

        // Parallax (desktop only, no touch)
        if (window.matchMedia('(pointer: fine) and (min-width: 769px)').matches) {
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.addEventListener('mousemove', (e) => {
                    const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
                    const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

                    gsap.to('.orb-1', { x: xPos * 2.5, y: yPos * 2.5, duration: 2, ease: "power2.out" });
                    gsap.to('.orb-2', { x: -xPos * 2, y: -yPos * 2, duration: 2.5, ease: "power2.out" });
                    gsap.to('.text-back', { x: xPos * 3, y: yPos * 3, duration: 1 });
                    gsap.to('.text-front', { x: -xPos * 2, y: -yPos * 2, duration: 1 });
                    gsap.to('.portrait-img', { x: -xPos * 1, y: -yPos * 1, duration: 1 });
                });

                heroContent.addEventListener('mouseleave', () => {
                    gsap.to(['.orb-1', '.orb-2', '.text-back', '.text-front', '.portrait-img'], {
                        x: 0, y: 0, duration: 1.5, ease: "power3.out"
                    });
                });
            }
        }
    }

    // Inner page hero animation
    if (document.querySelector('.page-hero')) {
        tl.to('.page-hero', { y: 0, opacity: 1, duration: 1 }, "-=0.5");
    }

    // ScrollTrigger animations for inner pages
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // About blocks
        document.querySelectorAll('.about-block').forEach((block, i) => {
            gsap.to(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: i * 0.1,
                ease: "power3.out"
            });
        });

        // Project cards
        document.querySelectorAll('.project-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: i * 0.15,
                    ease: "power3.out"
                }
            );
        });

        // Detail sections
        document.querySelectorAll('.detail-section').forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Connect form
        if (document.querySelector('.connect-grid')) {
            gsap.from('.connect-grid', {
                scrollTrigger: {
                    trigger: '.connect-grid',
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }
    }
});

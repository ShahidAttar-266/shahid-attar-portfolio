// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate GSAP with Lenis
gsap.registerPlugin(ScrollTrigger);
/*
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);
*/

// Custom Cursor implementation
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });
});

const hoverElements = document.querySelectorAll('a, button, .cursor-pointer');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Update local time
function updateTime() {
    const timeDisplay = document.querySelector('.time-display');
    if(timeDisplay) {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
}
setInterval(updateTime, 1000);
updateTime();

// Preloader & Hero Initial Animation
window.addEventListener('load', () => {
    const masterTimeline = gsap.timeline();

    // Preloader out
    masterTimeline.to('.preloader-text span', {
        y: '0%',
        duration: 0.8,
        ease: 'power4.out',
        delay: 0.2
    })
    .to('#custom-preloader', {
        y: '-100%',
        duration: 1,
        ease: 'expo.inOut',
        delay: 0.5
    })
    // Hero elements in
    .fromTo('.hero-content h1, .hero-content span', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1
    }, "-=0.2")
    .fromTo('.hero-content .rounded-\\[3rem\\]', {
        scale: 0.9,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
    }, "-=0.8")
    .fromTo('nav.fixed, .fixed.left-0', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
    }, "-=0.5");
});

// Card Scroll Effects (Stacking effect like in reference)
const cards = gsap.utils.toArray('.card-pin');
cards.forEach((card, i) => {
    ScrollTrigger.create({
        trigger: card,
        start: 'top top+=100', // when the top of the card hits 100px from top of viewport
        endTrigger: '.cards-container',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
        id: `card-pin-${i}`
    });

    if(i > 0) {
        gsap.to(cards[i - 1], {
            scale: 0.95 - (0.02 * i),
            opacity: 1 - (0.1 * i),
            scrollTrigger: {
                trigger: card,
                start: 'top top+=100',
                end: 'top top',
                scrub: true,
            }
        });
    }
});

// Marquee Animation
gsap.to('.marquee-track', {
    xPercent: -50,
    ease: "none",
    duration: 15,
    repeat: -1
});

// General Fade-up on Scroll for Text and Sections
gsap.utils.toArray('.about-section h3, .about-section p, .service-item, .experience-section h2, .experience-section > div > div > div, .faq-section h2, .faq-section > div > div').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. INTRO ANIMATION: HERO TEXT
    // Seleccionamos el título principal
    const heroTitle = document.querySelector('.titulo-principal h1');
    if (heroTitle) {
        // Simple fade-in and slide-up effect on load
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'opacity 1.5s ease-out, transform 1.5s ease-out';

        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }

    // 2. SCROLL REVEAL ANIMATION (Intersection Observer)
    // Elements to reveal: sections, gallery items
    const revealElements = document.querySelectorAll('section, .galeria__item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden'); // Add initial hidden class
        revealObserver.observe(el);
    });

    // 3. PARALLAX EFFECT FOR BACKGROUND STARS (Subtle enhancement)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // Move stars slower than scrolling speed
        const body = document.body;
        // We are manipulating the 'background-position-y' we set in CSS animation?
        // Actually, CSS animation is running. Let's shift the whole body pseudo element context if possible
        // Or simpler: Parallax on content to make it float

        const heroVideo = document.querySelector('.header__video');
        if (heroVideo) {
            heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // 4. SMOOTH SCROLL FOR ANCHOR LINKS (If any exist or are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

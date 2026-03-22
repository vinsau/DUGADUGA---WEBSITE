// ==================== SCROLL ANIMATIONS ====================
// Add scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections with staggered animations
const allSections = document.querySelectorAll('.section');
allSections.forEach((section, index) => {
    section.classList.add('fade-in-hidden');

    // Set animation delay for staggered effect
    section.style.animationDelay = `${index * 0.15}s`;

    // Alternate slide directions for visual interest
    if (index % 2 === 0) {
        section.classList.add('slide-in-left');
    } else {
        section.classList.add('slide-in-right');
    }

    observer.observe(section);
});

// ==================== CARD TILT EFFECT ==================== // Micro-interactions with mouse tracking
const cards = document.querySelectorAll('.section');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Only apply on larger screens
        if (window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateX = ((y - centerY) / centerY) * 2;
        const rotateY = ((x - centerX) / centerX) * 2;

        card.style.transform = `
            perspective(1000px)
            rotateX(${-rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ==================== TYPING EFFECT FOR HOME SECTION ====================
const homeHeading = document.querySelector('#home h1');
if (homeHeading) {
    const originalText = homeHeading.textContent;
    homeHeading.textContent = '';
    homeHeading.style.opacity = '1';

    let charIndex = 0;

    function typeWriter() {
        if (charIndex < originalText.length) {
            homeHeading.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Announce completion to screen readers
            homeHeading.setAttribute('aria-label', originalText);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ==================== LAZY LOADING FOR IMAGES ====================
const lazyImages = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

lazyImages.forEach(img => {
    img.classList.add('lazy-img');
    imageObserver.observe(img);
});

// ==================== PARALLAX EFFECT FOR BACKGROUND ====================
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            // Only apply parallax on desktop
            if (window.innerWidth > 768) {
                document.body.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
            }

            ticking = false;
        });

        ticking = true;
    }
});

// ==================== SHIMMER EFFECT ON LOAD ====================
// Add shimmer effect to first section on page load
window.addEventListener('load', function() {
    const firstSection = document.querySelector('.section');
    if (firstSection) {
        firstSection.classList.add('shimmer');

        // Remove shimmer class after animation completes
        setTimeout(() => {
            firstSection.classList.remove('shimmer');
        }, 3000);
    }
});

// ==================== ENHANCED SCROLL ANIMATIONS ====================
// Floating animation for images (already in CSS, but can be controlled here)
const sectionImages = document.querySelectorAll('.image img');

// Pause floating animation when image is hovered
sectionImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.animationPlayState = 'paused';
    });

    img.addEventListener('mouseleave', () => {
        img.style.animationPlayState = 'running';
    });
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c👋 Welcome to Angel Rose Dugaduga\'s Autobiography!',
    'color: #b794f6; font-size: 20px; font-weight: bold;');
console.log('%c✨ Built with Spring Boot, Thymeleaf, and JavaScript',
    'color: #7c3aed; font-size: 14px;');
console.log('%c💜 Featuring the Lavender Dreams color palette',
    'color: #c084fc; font-size: 14px;');

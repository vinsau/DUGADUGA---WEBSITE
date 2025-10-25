// ==================== MOBILE NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ==================== SMOOTH SCROLLING ====================
// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80; // Account for fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in-hidden');
    observer.observe(section);
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
// Highlight active navigation link based on scroll position
const sections = document.querySelectorAll('.section');

function highlightNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==================== IMAGE GALLERY LIGHTBOX ====================
const galleryImages = document.querySelectorAll('.gallery img');

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
    <span class="close-lightbox">&times;</span>
    <img class="lightbox-content" id="lightbox-img">
    <div class="lightbox-caption"></div>
    <button class="lightbox-nav prev">&#10094;</button>
    <button class="lightbox-nav next">&#10095;</button>
`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const prevBtn = document.querySelector('.lightbox-nav.prev');
const nextBtn = document.querySelector('.lightbox-nav.next');

let currentImageIndex = 0;
const imagesArray = Array.from(galleryImages);

// Open lightbox
galleryImages.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        currentImageIndex = index;
        showLightbox(this);
    });
});

function showLightbox(img) {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightboxFunc() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close lightbox
closeLightbox.addEventListener('click', closeLightboxFunc);
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Navigate through images
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    showLightbox(imagesArray[currentImageIndex]);
});

nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    showLightbox(imagesArray[currentImageIndex]);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') closeLightboxFunc();
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    }
});

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.innerHTML = '&#8593;';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
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
});

lazyImages.forEach(img => {
    img.classList.add('lazy-img');
    imageObserver.observe(img);
});

// ==================== PARALLAX EFFECT FOR BACKGROUND ====================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.body;
    
    if (window.innerWidth > 768) {
        parallaxElements.style.backgroundPositionY = -(scrolled * 0.3) + 'px';
    }
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c👋 Welcome to Angel Rose Dugaduga\'s Autobiography!', 
    'color: #6a0dad; font-size: 20px; font-weight: bold;');
console.log('%c✨ Built with HTML, CSS, and JavaScript', 
    'color: #333; font-size: 14px;');

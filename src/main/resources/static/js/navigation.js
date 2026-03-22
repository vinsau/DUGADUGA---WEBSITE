// ==================== MOBILE NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu when hamburger is clicked
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Update ARIA attributes
        hamburger.setAttribute('aria-expanded', isExpanded);

        // Prevent body scroll when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';

            // Create backdrop blur
            const backdrop = document.createElement('div');
            backdrop.className = 'menu-backdrop';
            backdrop.setAttribute('aria-hidden', 'true');
            document.body.appendChild(backdrop);

            // Close on backdrop click
            backdrop.addEventListener('click', closeMobileMenu);

            // Trap focus in menu
            trapFocus(navMenu);
        } else {
            document.body.style.overflow = 'auto';
            const backdrop = document.querySelector('.menu-backdrop');
            if (backdrop) backdrop.remove();
        }
    });
}

// Close mobile menu function
function closeMobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';

        const backdrop = document.querySelector('.menu-backdrop');
        if (backdrop) backdrop.remove();
    }
}

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        closeMobileMenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!hamburger || !navMenu) return;

    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
        if (hamburger) hamburger.focus();
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

            // Announce to screen readers
            announceToScreenReader(`Navigated to ${targetElement.getAttribute('aria-labelledby') || targetId.substring(1)} section`);

            // Set focus to target for keyboard users
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus();
            setTimeout(() => targetElement.removeAttribute('tabindex'), 1000);
        }
    });
});

// ==================== ACTIVE NAV LINK HIGHLIGHTING ====================
// Highlight active navigation link based on scroll position
const sections = document.querySelectorAll('.section');

function highlightNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Highlight on page load
highlightNavLink();

// ==================== ACCESSIBILITY HELPERS ====================
// Trap focus within an element
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

// Announce to screen readers
function announceToScreenReader(message) {
    const statusElement = document.getElementById('status-message') || createStatusElement();
    statusElement.textContent = message;

    // Clear after 3 seconds
    setTimeout(() => {
        statusElement.textContent = '';
    }, 3000);
}

// Create status element for screen readers
function createStatusElement() {
    const statusElement = document.createElement('div');
    statusElement.id = 'status-message';
    statusElement.className = 'sr-only';
    statusElement.setAttribute('role', 'status');
    statusElement.setAttribute('aria-live', 'polite');
    statusElement.setAttribute('aria-atomic', 'true');
    document.body.appendChild(statusElement);
    return statusElement;
}

// ==================== SCROLL TO TOP BUTTON ====================
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.innerHTML = '&#8593;';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollToTopBtn.setAttribute('title', 'Back to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
let scrollTimeout;
window.addEventListener('scroll', function() {
    // Debounce for performance
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }, 100);
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Announce to screen readers
    if (typeof announceToScreenReader === 'function') {
        announceToScreenReader('Scrolled to top of page');
    }

    // Focus on skip link or first focusable element
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.focus();
    }
});

// Keyboard support for scroll to top button
scrollToTopBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
    }
});

// ==================== ENHANCED HOVER EFFECTS ====================
// Add hover sound effect (visual only, no actual sound)
const interactiveElements = document.querySelectorAll('a, button, .gallery img');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ==================== PAGE VISIBILITY ====================
// Pause animations when page is not visible
let isPageVisible = true;

document.addEventListener('visibilitychange', function() {
    isPageVisible = !document.hidden;

    // Pause/resume animations based on visibility
    const animatedElements = document.querySelectorAll('.image img');
    animatedElements.forEach(el => {
        el.style.animationPlayState = isPageVisible ? 'running' : 'paused';
    });
});

// ==================== FORM VALIDATION (for future contact form) ====================
// Placeholder for future form validation
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.setAttribute('aria-invalid', 'true');
            showError(input, 'This field is required');
        } else {
            input.setAttribute('aria-invalid', 'false');
            hideError(input);
        }
    });

    return isValid;
}

function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        errorElement.style.color = 'var(--dark-purple)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
        errorElement.style.display = 'block';
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
}

function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.remove();
    }
}

// ==================== SMOOTH PAGE TRANSITIONS ====================
// Add fade-in effect to body on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 10);
});

// ==================== PERFORMANCE MONITORING ====================
// Log performance metrics (development only)
if (window.performance && console.time) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

        console.log('%c⚡ Page Performance',
            'color: #b794f6; font-size: 16px; font-weight: bold;');
        console.log(`Page load time: ${pageLoadTime}ms`);

        // Log resource timing (images, scripts, etc.)
        if (window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            console.log(`Total resources loaded: ${resources.length}`);
        }
    });
}

// ==================== TOUCH GESTURES ====================
// Pull to refresh indicator (visual only)
let touchStartYPos = 0;
let isPulling = false;

document.addEventListener('touchstart', function(e) {
    if (window.pageYOffset === 0) {
        touchStartYPos = e.touches[0].clientY;
    }
}, { passive: true });

document.addEventListener('touchmove', function(e) {
    if (window.pageYOffset === 0) {
        const touchY = e.touches[0].clientY;
        const pullDistance = touchY - touchStartYPos;

        if (pullDistance > 50 && !isPulling) {
            isPulling = true;
            showPullIndicator();
        }
    }
}, { passive: true });

document.addEventListener('touchend', function() {
    if (isPulling) {
        isPulling = false;
        hidePullIndicator();
    }
    touchStartYPos = 0;
}, { passive: true });

function showPullIndicator() {
    let indicator = document.querySelector('.pull-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'pull-indicator';
        indicator.textContent = '↓ Refreshing...';
        indicator.setAttribute('aria-live', 'polite');
        document.body.appendChild(indicator);
    }
    indicator.classList.add('show');
}

function hidePullIndicator() {
    const indicator = document.querySelector('.pull-indicator');
    if (indicator) {
        indicator.classList.remove('show');
        setTimeout(() => indicator.remove(), 300);
    }
}

// ==================== CLICK RIPPLE EFFECT ====================
// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        ripple.setAttribute('aria-hidden', 'true');

        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';

        e.target.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==================== VIEWPORT HEIGHT FIX FOR MOBILE ====================
// Fix for mobile browsers where viewport height changes with address bar
function setVhProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVhProperty();
window.addEventListener('resize', setVhProperty);

// ==================== INITIALIZATION ====================
console.log('%c✅ Interactions module loaded',
    'color: #7c3aed; font-size: 12px;');

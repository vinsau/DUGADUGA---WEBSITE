// ==================== IMAGE GALLERY LIGHTBOX ====================
const galleryImages = document.querySelectorAll('.gallery img');

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.setAttribute('aria-label', 'Image lightbox');
lightbox.innerHTML = `
    <span class="close-lightbox" role="button" aria-label="Close lightbox" tabindex="0">&times;</span>
    <img class="lightbox-content" id="lightbox-img" alt="">
    <div class="lightbox-caption"></div>
    <button class="lightbox-nav prev" aria-label="Previous image">&#10094;</button>
    <button class="lightbox-nav next" aria-label="Next image">&#10095;</button>
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
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');

    // Click handler
    img.addEventListener('click', function() {
        currentImageIndex = index;
        showLightbox(this);
    });

    // Keyboard handler for accessibility
    img.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            currentImageIndex = index;
            showLightbox(this);
        }
    });
});

function showLightbox(img) {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt;
    document.body.style.overflow = 'hidden'; // Prevent scrolling

    // Focus the Close button for accessibility
    closeLightbox.focus();

    // Announce to screen readers
    announceToScreenReader(`Image ${currentImageIndex + 1} of ${imagesArray.length}: ${img.alt}`);
}

function closeLightboxFunc() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling

    // Return focus to the image that opened the lightbox
    if (imagesArray[currentImageIndex]) {
        imagesArray[currentImageIndex].focus();
    }

    announceToScreenReader('Lightbox closed');
}

// Close lightbox - Click handler
closeLightbox.addEventListener('click', closeLightboxFunc);

// Close lightbox - Keyboard handler
closeLightbox.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeLightboxFunc();
    }
});

// Close when clicking on backdrop
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

// Navigate to previous image
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    showLightbox(imagesArray[currentImageIndex]);
}

// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    showLightbox(imagesArray[currentImageIndex]);
}

// Previous button
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showPreviousImage();
});

// Next button
nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    showNextImage();
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'flex') {
        switch(e.key) {
            case 'Escape':
                closeLightboxFunc();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevBtn.click();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextBtn.click();
                break;
        }
    }
});

// ==================== TOUCH SWIPE SUPPORT ====================
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const horizontalDiff = touchStartX - touchEndX;
    const verticalDiff = Math.abs(touchStartY - touchEndY);

    // Only trigger swipe if horizontal movement is greater than vertical
    if (Math.abs(horizontalDiff) > swipeThreshold && Math.abs(horizontalDiff) > verticalDiff) {
        if (horizontalDiff > 0) {
            // Swipe left - next image
            showNextImage();
            showSwipeFeedback('left');
        } else {
            // Swipe right - previous image
            showPreviousImage();
            showSwipeFeedback('right');
        }
    }
}

// ==================== SWIPE VISUAL FEEDBACK ====================
function showSwipeFeedback(direction) {
    const feedback = document.createElement('div');
    feedback.className = 'swipe-feedback show';
    feedback.textContent = direction === 'left' ? '←' : '→';
    feedback.style[direction === 'left' ? 'right' : 'left'] = '20px';
    feedback.setAttribute('aria-hidden', 'true');

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => feedback.remove(), 300);
    }, 500);
}

// ==================== GALLERY TOUCH SWIPE ====================
// Touch swipe for gallery navigation (when not in lightbox)
const galleryContainer = document.querySelector('.gallery');

if (galleryContainer) {
    let galleryTouchStartX = 0;
    let galleryTouchEndX = 0;

    galleryContainer.addEventListener('touchstart', (e) => {
        galleryTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    galleryContainer.addEventListener('touchend', (e) => {
        galleryTouchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    }, { passive: true });

    function handleGallerySwipe() {
        const swipeThreshold = 100;
        const difference = galleryTouchStartX - galleryTouchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            // Scroll gallery horizontally
            const scrollAmount = difference > 0 ? 300 : -300;
            galleryContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }
}

// ==================== HELPER FUNCTION ====================
// Announce to screen readers (if not already defined in navigation.js)
if (typeof announceToScreenReader === 'undefined') {
    function announceToScreenReader(message) {
        let statusElement = document.getElementById('status-message');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = 'status-message';
            statusElement.className = 'sr-only';
            statusElement.setAttribute('role', 'status');
            statusElement.setAttribute('aria-live', 'polite');
            statusElement.setAttribute('aria-atomic', 'true');
            document.body.appendChild(statusElement);
        }
        statusElement.textContent = message;

        // Clear after 3 seconds
        setTimeout(() => {
            statusElement.textContent = '';
        }, 3000);
    }
}

// Add these variables at the top of your script
let currentMediaIndex = 0;
let touchStartX = 0;

// Modify the showMedia function
function showMedia(item, index) {
    currentMediaIndex = index !== undefined ? index : mediaItems.findIndex(media => media.src === item.src);
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightboxContent');
    content.innerHTML = '';

    const mediaItem = mediaItems[currentMediaIndex];
    
    if(mediaItem.type === 'image') {
        content.innerHTML = `
            <img src="${mediaItem.src}" 
                 class="lightbox-media" 
                 alt="Enlarged view - ${mediaItem.alt}">
        `;
    } else {
        content.innerHTML = `
            <video controls autoplay class="lightbox-media">
                <source src="${mediaItem.src}" type="video/mp4">
                Your browser does not support videos.
            </video>
        `;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add navigation functions
function navigateMedia(direction) {
    currentMediaIndex += direction;
    
    if(currentMediaIndex < 0) {
        currentMediaIndex = mediaItems.length - 1;
    } else if(currentMediaIndex >= mediaItems.length) {
        currentMediaIndex = 0;
    }
    
    showMedia(mediaItems[currentMediaIndex], currentMediaIndex);
}

// Add touch event handlers
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if(Math.abs(diffX) > 50) {
        if(diffX > 0) {
            navigateMedia(1); // Swipe left
        } else {
            navigateMedia(-1); // Swipe right
        }
    }
}

// Update event listeners
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    
    // Add arrow click handlers
    document.getElementById('leftArrow').addEventListener('click', () => navigateMedia(-1));
    document.getElementById('rightArrow').addEventListener('click', () => navigateMedia(1));
    
    // Add touch event listeners
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('touchstart', handleTouchStart);
    lightbox.addEventListener('touchend', handleTouchEnd);
});

// Modify the card event listener in initGallery
card.addEventListener('click', () => {
    const index = mediaItems.findIndex(media => 
        media.src === item.src && media.alt === item.alt
    );
    showMedia(item, index);
});
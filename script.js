document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navBurgerIcon = document.querySelector('#burgerIcon');
    const navCloseIcon = document.querySelector('#closeIcon');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('open');

        if (navLinks.classList.contains('active')) {
            navBurgerIcon.classList.add('hidden-menu-icon');
            navCloseIcon.classList.remove('hidden-menu-icon');
        } else {
            navBurgerIcon.classList.remove('hidden-menu-icon');
            navCloseIcon.classList.add('hidden-menu-icon');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            navBurgerIcon.classList.remove('hidden-menu-icon');
            navCloseIcon.classList.add('hidden-menu-icon');
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            navBurgerIcon.classList.remove('hidden-menu-icon');
            navCloseIcon.classList.add('hidden-menu-icon');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu after clicking link
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});




let currentIndex = 0;

function showMediaByIndex(index) {
    const item = mediaItems[index];
    const content = document.getElementById('lightboxContent');
    content.innerHTML = '';

    if (item.type === 'image') {
        content.innerHTML = `
            <img src="${item.src}" class="lightbox-media" alt="Enlarged view - ${item.alt}">
        `;
    } else {
        content.innerHTML = `
            <video controls autoplay class="lightbox-media">
                <source src="${item.src}" type="video/mp4">
                Your browser does not support videos.
            </video>
        `;
    }

    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
    currentIndex = index;
}

// function showMedia(item) {
//     const index = mediaItems.findIndex(m => m.src === item.src);
//     if (index !== -1) showMediaByIndex(index);
// }

function nextMedia() {
    currentIndex = (currentIndex + 1) % mediaItems.length;
    showMediaByIndex(currentIndex);
}

function prevMedia() {
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    showMediaByIndex(currentIndex);
}

// Swipe support
let startX = 0;
document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
document.getElementById('lightbox').addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextMedia();
    else if (endX - startX > 50) prevMedia();
});

// Arrow buttons
document.getElementById('nextMedia').addEventListener('click', nextMedia);
document.getElementById('prevMedia').addEventListener('click', prevMedia);
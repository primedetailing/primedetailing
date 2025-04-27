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


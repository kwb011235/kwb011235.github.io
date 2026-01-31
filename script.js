/**
 * Portfolio Website JavaScript
 * Author: Kyle Bailey
 *
 * Features:
 * - Typing effect animation
 * - Navbar scroll behavior
 * - Mobile navigation toggle
 * - Back to top button
 * - Smooth scroll for anchor links
 * - Scroll reveal animations
 * - Active navigation highlighting
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initTypingEffect();
    initNavbar();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initScrollAnimations();
    initActiveNavigation();
    initExperienceToggles();
    setCurrentYear();
});

/**
 * Typing Effect
 * Creates a typewriter effect for the hero section titles
 */
function initTypingEffect() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    // Array of titles to cycle through
    const titles = [
        'Analytics Specialist',
        'Data Scientist',
        'Financial Modeling Expert',
        'Machine Learning Engineer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            // Remove character
            typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Add character
            typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Check if word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    type();
}

/**
 * Navbar Scroll Behavior
 * Adds background and shadow to navbar when scrolling
 * Shows/hides nav logo based on hero name visibility
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLogo = document.querySelector('.nav-logo');
    const heroName = document.querySelector('.hero-name');
    if (!navbar) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class based on scroll position
        if (scrollTop > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide nav logo based on hero name visibility
        if (navLogo && heroName) {
            const heroNameRect = heroName.getBoundingClientRect();
            // Show nav logo when hero name is scrolled out of view
            if (heroNameRect.bottom < 0) {
                navLogo.classList.add('visible');
            } else {
                navLogo.classList.remove('visible');
            }
        }

        lastScrollTop = scrollTop;
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();
}

/**
 * Mobile Menu Toggle
 * Handles hamburger menu for mobile devices
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Back to Top Button
 * Shows/hides button based on scroll position and scrolls to top on click
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    const scrollThreshold = 300;

    function handleScroll() {
        if (window.pageYOffset > scrollThreshold) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    // Show/hide button on scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check
    handleScroll();
}

/**
 * Smooth Scroll
 * Enables smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            // Skip if it's just '#'
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                // Get navbar height for offset
                const navbar = document.getElementById('navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                // Calculate target position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Reveal Animations
 * Animates elements when they come into view
 */
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .contact-card, .highlight-item, .about-expertise'
    );

    // Add fade-in class to elements
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Create Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger animation
                entry.target.classList.add('visible');

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Stagger animation for grids
    const grids = document.querySelectorAll('.skills-grid, .projects-grid, .contact-methods');
    grids.forEach(grid => {
        grid.classList.add('stagger-children');

        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    gridObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        gridObserver.observe(grid);
    });
}

/**
 * Active Navigation Highlighting
 * Highlights the current section in the navigation
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollPosition = window.pageYOffset;
        const navbar = document.getElementById('navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current section's link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Highlight on scroll
    window.addEventListener('scroll', highlightNavigation, { passive: true });

    // Initial highlight
    highlightNavigation();
}

/**
 * Experience Toggle
 * Handles show more/less functionality for work experience cards
 */
function initExperienceToggles() {
    const toggleButtons = document.querySelectorAll('.experience-toggle');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const details = this.nextElementSibling;
            const toggleText = this.querySelector('.toggle-text');

            if (isExpanded) {
                // Collapse
                this.setAttribute('aria-expanded', 'false');
                details.classList.remove('expanded');
                toggleText.textContent = 'Show More';
            } else {
                // Expand
                this.setAttribute('aria-expanded', 'true');
                details.classList.add('expanded');
                toggleText.textContent = 'Show Less';
            }
        });
    });
}

/**
 * Set Current Year
 * Updates the footer with the current year
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Utility: Debounce Function
 * Limits how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Milliseconds to wait
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle Function
 * Ensures a function is called at most once in a specified time period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Milliseconds between calls
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Console Welcome Message
 * Displays a welcome message in the browser console
 */
console.log(
    '%c Welcome to Kyle Bailey\'s Portfolio! ',
    'background: linear-gradient(135deg, #00C853, #4CAF50); color: #000; font-size: 14px; padding: 10px; border-radius: 5px; font-weight: bold;'
);
console.log(
    '%c Built with HTML, CSS, and JavaScript ',
    'color: #00C853; font-size: 12px;'
);

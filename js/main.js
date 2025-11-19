// UrbanKonnect - Main JavaScript

(function() {
    'use strict';

    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // Sticky Header on Scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Number Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Initialize counters when they come into view
    const counterElements = document.querySelectorAll('.stat-number, .achievement-number');
    if (counterElements.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.textContent === '0') {
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(element => {
            counterObserver.observe(element);
        });
    }

    // Typed.js for Hero Section
    if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
        new Typed('#typed', {
            strings: ['UrbanKonnect', 'SEO Excellence', 'Social Media Growth', 'Digital Success'],
            typeSpeed: 80,
            backSpeed: 60,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Swiper Slider for Testimonials
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-slider')) {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: false
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 40
                }
            }
        });
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');

    if (cookieConsent && acceptCookies) {
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookiesAccepted')) {
            cookieConsent.style.display = 'block';
        }

        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.display = 'none';
        });
    }

    // Newsletter Form Submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (validateEmail(email)) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    });

    // Email Validation Helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Search Form Functionality
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input[type="text"]').value;
            if (query.trim() !== '') {
                console.log('Searching for:', query);
                // Implement actual search functionality here
                alert('Search functionality will be implemented with backend integration.');
            }
        });
    });

    // Mobile Menu Close on Link Click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    // Close the mobile menu after clicking any link
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            });
        });
    }

    // Add Active Class to Current Nav Item
    const currentLocation = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentLocation.includes(linkPath)) {
            link.classList.add('active');
        }
    });

    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Futuristic Preloader with Loading Animation
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const percentageElement = preloader.querySelector('.loading-percentage');
        const loadingBarFill = preloader.querySelector('.loading-bar-fill');
        const loadingStatus = preloader.querySelector('.loading-status');

        let currentPercentage = 0;
        const targetPercentage = 100;
        const loadingDuration = 5000; // 5 seconds
        const updateInterval = 30; // Update every 30ms
        const increment = (targetPercentage / (loadingDuration / updateInterval));

        const statusMessages = [
            'Initializing Systems...',
            'Loading Assets...',
            'Connecting Servers...',
            'Preparing Interface...',
            'Almost Ready...',
            'Launch Complete!'
        ];

        let statusIndex = 0;

        // Animate loading percentage
        const loadingInterval = setInterval(() => {
            currentPercentage += increment;

            if (currentPercentage >= targetPercentage) {
                currentPercentage = targetPercentage;
                clearInterval(loadingInterval);

                // Hide preloader after a short delay
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800); // Match the fade-out animation duration
                }, 300);
            }

            // Update percentage display
            percentageElement.textContent = Math.floor(currentPercentage) + '%';
            loadingBarFill.style.width = currentPercentage + '%';

            // Update status message based on percentage
            const newStatusIndex = Math.floor((currentPercentage / 100) * (statusMessages.length - 1));
            if (newStatusIndex !== statusIndex && newStatusIndex < statusMessages.length) {
                statusIndex = newStatusIndex;
                loadingStatus.textContent = statusMessages[statusIndex];
            }
        }, updateInterval);

        // Ensure preloader is hidden after window load
        window.addEventListener('load', function() {
            // If the interval is still running, speed it up
            if (currentPercentage < targetPercentage) {
                clearInterval(loadingInterval);
                currentPercentage = targetPercentage;
                percentageElement.textContent = '100%';
                loadingBarFill.style.width = '100%';
                loadingStatus.textContent = statusMessages[statusMessages.length - 1];

                setTimeout(() => {
                    preloader.classList.add('hidden');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800);
                }, 300);
            }
        });
    }

    // Accordion Enhanced Functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add smooth scroll to accordion if it's out of view
            setTimeout(() => {
                const rect = this.getBoundingClientRect();
                if (rect.top < 100) {
                    this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 350);
        });
    });

    // Form Field Auto-resize for Textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    // Copy to Clipboard Functionality (if needed)
    const copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const text = this.getAttribute('data-copy');
            navigator.clipboard.writeText(text).then(() => {
                alert('Copied to clipboard!');
            });
        });
    });

    // Social Share Buttons
    const shareBtns = document.querySelectorAll('.share-btn');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const url = window.location.href;
            const title = document.title;

            // Determine which social platform
            if (this.querySelector('.fa-facebook-f')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            } else if (this.querySelector('.fa-twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
            } else if (this.querySelector('.fa-linkedin-in')) {
                window.open(`https://www.linkedin.com/shareArticle?url=${url}&title=${title}`, '_blank');
            } else if (this.querySelector('.fa-whatsapp')) {
                window.open(`https://wa.me/?text=${title} ${url}`, '_blank');
            }
        });
    });

    // Detect External Links and Add Target Blank
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Console Welcome Message
    console.log('%cUrbanKonnect', 'color: #E67E22; font-size: 24px; font-weight: bold;');
    console.log('%cKonnecting Brands to Digital Excellence', 'color: #2C3E50; font-size: 14px;');
    console.log('%cWebsite by UrbanKonnect | www.urbankonnect.com', 'color: #3498DB; font-size: 12px;');

    // Performance Monitoring (Development)
    if (window.performance && console) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page Load Time: ${pageLoadTime}ms`);
    }

    // Service Worker Registration (for PWA - optional)
    if ('serviceWorker' in navigator) {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('Service Worker registered:', registration);
        // }).catch(error => {
        //     console.log('Service Worker registration failed:', error);
        // });
    }

})();

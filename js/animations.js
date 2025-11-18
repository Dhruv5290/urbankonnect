// UrbanKonnect - Animation Scripts

(function() {
    'use strict';

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .hero-background');

        parallaxElements.forEach(element => {
            if (element) {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Reveal Animation on Scroll (alternative to AOS)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');

    if (progressBars.length > 0 && 'IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = width;
                    progressObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.setAttribute('data-width', width);
            bar.style.width = '0';
            progressObserver.observe(bar);
        });
    }

    // Hover Effect for Service Cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Stagger Animation for Grid Items
    function staggerAnimation(selector, delay = 100) {
        const items = document.querySelectorAll(selector);

        if (items.length > 0 && 'IntersectionObserver' in window) {
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * delay);
                        staggerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'all 0.6s ease';
                staggerObserver.observe(item);
            });
        }
    }

    // Apply stagger animation to various elements
    staggerAnimation('.service-card', 100);
    staggerAnimation('.portfolio-item', 150);
    staggerAnimation('.team-card', 120);

    // Image Reveal Animation
    const imageContainers = document.querySelectorAll('.image-reveal');

    if (imageContainers.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        imageContainers.forEach(container => {
            imageObserver.observe(container);
        });
    }

    // Text Typing Animation
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Apply typing animation to specific elements
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        if ('IntersectionObserver' in window) {
            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const text = entry.target.textContent;
                        typeWriter(entry.target, text);
                        typingObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            typingObserver.observe(element);
        }
    });

    // Mouse Follow Effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Cursor Glow Effect (optional)
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    document.body.appendChild(cursorGlow);

    function moveCursorGlow() {
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        requestAnimationFrame(moveCursorGlow);
    }

    // Uncomment to enable cursor glow
    // moveCursorGlow();

    // Scroll Progress Indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress';
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressIndicator.style.width = scrolled + '%';
    });

    // Magnetic Button Effect
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // Ripple Effect on Click
    document.querySelectorAll('.ripple-effect').forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Infinite Scroll Animation for Client Logos
    const clientLogos = document.querySelector('.clients-grid');
    if (clientLogos) {
        // Clone logos for seamless loop
        const logosContent = clientLogos.innerHTML;
        clientLogos.innerHTML += logosContent;

        let scrollAmount = 0;
        const scrollSpeed = 0.5;

        function scrollLogos() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= clientLogos.scrollWidth / 2) {
                scrollAmount = 0;
            }
            clientLogos.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scrollLogos);
        }

        // Uncomment to enable auto-scroll
        // scrollLogos();
    }

    // Fade In Elements on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }

    // Smooth Height Transition
    function smoothHeight(element) {
        element.style.height = 'auto';
        const height = element.offsetHeight + 'px';
        element.style.height = '0px';

        setTimeout(() => {
            element.style.height = height;
        }, 0);

        setTimeout(() => {
            element.style.height = 'auto';
        }, 300);
    }

    // Number Counter with Easing
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const current = Math.floor(easedProgress * (end - start) + start);

            element.textContent = current;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    // Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

})();

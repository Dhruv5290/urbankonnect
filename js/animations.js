// UrbanKonnect - Premium 3D Animation Scripts

(function() {
    'use strict';

    // ===== Enhanced Parallax Effect =====
    let ticking = false;
    let lastScrollY = 0;

    function updateParallax() {
        const scrolled = window.pageYOffset;

        // Hero Section Parallax
        const heroElements = document.querySelectorAll('.hero-image, .hero-background');
        heroElements.forEach(element => {
            if (element) {
                const speed = element.classList.contains('hero-background') ? 0.5 : 0.3;
                element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            }
        });

        // Floating shapes parallax
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && heroSection.querySelector('::before, ::after')) {
            const speed = 0.2;
            heroSection.style.setProperty('--parallax-offset', `${scrolled * speed}px`);
        }

        ticking = false;
    }

    function requestParallaxTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestParallaxTick, { passive: true });

    // ===== 3D Card Tilt Effect =====
    function add3DTiltEffect(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * 8;  // Max 8deg rotation
            const rotateY = ((centerX - x) / centerX) * 8;

            this.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
                scale3d(1.02, 1.02, 1.02)
            `;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
        });
    }

    // Apply 3D tilt to cards
    const tiltCards = document.querySelectorAll(
        '.service-card, .portfolio-card, .case-study-card, .blog-card, .value-card, .why-card'
    );

    tiltCards.forEach(card => {
        add3DTiltEffect(card);
        card.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // ===== Advanced Scroll Reveal with 3D =====
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateZ(0) rotateX(0)';
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(60px) translateZ(-50px) rotateX(-15deg)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            revealObserver.observe(element);
        });
    }

    // ===== Progress Bar Animation with 3D =====
    const progressBars = document.querySelectorAll('.progress-bar');

    if (progressBars.length > 0 && 'IntersectionObserver' in window) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || bar.style.width;

                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transform = 'translateZ(5px)';
                    }, 100);

                    progressObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.setAttribute('data-width', width);
            bar.style.width = '0';
            bar.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
            progressObserver.observe(bar);
        });
    }

    // ===== Enhanced Hover Effects for Service Cards =====
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');

        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'perspective(1000px) rotateY(360deg) scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
            }
        });
    });

    // ===== Stagger Animation for Grid Items with 3D =====
    function staggerAnimation3D(selector, delay = 120) {
        const items = document.querySelectorAll(selector);

        if (items.length > 0 && 'IntersectionObserver' in window) {
            const staggerObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) translateZ(0) scale(1)';
                        }, index * delay);
                        staggerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            items.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(50px) translateZ(-30px) scale(0.95)';
                item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                staggerObserver.observe(item);
            });
        }
    }

    // Apply stagger animations
    staggerAnimation3D('.service-card', 120);
    staggerAnimation3D('.portfolio-card', 150);
    staggerAnimation3D('.team-card', 130);
    staggerAnimation3D('.achievement-card', 100);
    staggerAnimation3D('.value-card', 110);

    // ===== Image Reveal Animation with 3D Depth =====
    const imageContainers = document.querySelectorAll('.image-reveal');

    if (imageContainers.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.style.clipPath = 'inset(0 0 0 0)';
                    entry.target.style.transform = 'scale(1) translateZ(0)';
                    imageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        imageContainers.forEach(container => {
            container.style.clipPath = 'inset(0 100% 0 0)';
            container.style.transform = 'scale(1.2) translateZ(-50px)';
            container.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            imageObserver.observe(container);
        });
    }

    // ===== Number Counter with Easing and 3D Effect =====
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const current = Math.floor(easedProgress * (end - start) + start);

            element.textContent = current;
            element.style.transform = `scale(${1 + (easedProgress * 0.1)})`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.style.transform = 'scale(1)';
            }
        };

        window.requestAnimationFrame(step);
    }

    // Observe and animate counters
    const counters = document.querySelectorAll('.stat-number, .achievement-number');

    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const target = parseInt(element.getAttribute('data-count')) ||
                                 parseInt(element.textContent);

                    element.classList.add('counting');
                    animateValue(element, 0, target, 2000);
                    counterObserver.unobserve(element);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counter.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            counterObserver.observe(counter);
        });
    }

    // ===== Mouse Follow Cursor Glow Effect =====
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursorGlow.style.left = cursorX + 'px';
            cursorGlow.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ===== Scroll Progress Indicator =====
    const progressIndicator = document.querySelector('.scroll-progress');
    if (!progressIndicator) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-progress';
        document.body.appendChild(indicator);
    }

    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        const indicator = document.querySelector('.scroll-progress');
        if (indicator) {
            indicator.style.width = scrolled + '%';
        }
    }, { passive: true });

    // ===== Magnetic Button Effect =====
    const magneticButtons = document.querySelectorAll('.btn, .nav-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });

    // ===== Ripple Effect on Button Click =====
    document.querySelectorAll('.btn, .service-link').forEach(element => {
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

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== 3D Floating Animation for Icons =====
    const floatingIcons = document.querySelectorAll('.service-icon, .contact-icon, .process-icon');

    floatingIcons.forEach((icon, index) => {
        const delay = index * 0.5;
        const duration = 4 + (index % 3);

        icon.style.animation = `float3D ${duration}s ease-in-out ${delay}s infinite`;
    });

    // ===== Infinite Scroll Animation for Logos (if exists) =====
    const clientLogos = document.querySelector('.clients-grid');
    if (clientLogos && clientLogos.children.length > 0) {
        const logosContent = clientLogos.innerHTML;
        clientLogos.innerHTML += logosContent;

        let scrollAmount = 0;
        const scrollSpeed = 0.8;

        function scrollLogos() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= clientLogos.scrollWidth / 2) {
                scrollAmount = 0;
            }
            clientLogos.style.transform = `translateX(-${scrollAmount}px)`;
            requestAnimationFrame(scrollLogos);
        }

        // Uncomment to enable
        // scrollLogos();
    }

    // ===== Fade In Elements on Scroll =====
    const fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateZ(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        fadeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px) translateZ(-20px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            fadeObserver.observe(element);
        });
    }

    // ===== Enhanced Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Loading Animation =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');

        // Fade in hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '0';
            setTimeout(() => {
                heroSection.style.transition = 'opacity 1s ease';
                heroSection.style.opacity = '1';
            }, 100);
        }
    });

    // ===== Parallax Layers for Multiple Elements =====
    function createParallaxLayers() {
        const layers = [
            { selector: '.parallax-slow', speed: 0.3 },
            { selector: '.parallax-medium', speed: 0.5 },
            { selector: '.parallax-fast', speed: 0.7 }
        ];

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;

            layers.forEach(layer => {
                const elements = document.querySelectorAll(layer.selector);
                elements.forEach(element => {
                    element.style.transform = `translate3d(0, ${scrolled * layer.speed}px, 0)`;
                });
            });
        }, { passive: true });
    }

    createParallaxLayers();

    // ===== 3D Perspective on Page Sections =====
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.transformStyle = 'preserve-3d';
    });

    // ===== Enhanced Image Lazy Loading with 3D Effect =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.style.opacity = '0';

                        img.onload = function() {
                            img.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            img.style.opacity = '1';
                            img.style.transform = 'scale(1) translateZ(0)';
                        };
                    }

                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            img.style.transform = 'scale(1.1) translateZ(-30px)';
            imageObserver.observe(img);
        });
    }

    // ===== Glow Effect on Hover for Special Elements =====
    const glowElements = document.querySelectorAll('.glow-on-hover');
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('glowing');
        });

        element.addEventListener('mouseleave', function() {
            this.classList.remove('glowing');
        });
    });

    // ===== Card Stack Effect on Scroll =====
    function createStackEffect() {
        const cards = document.querySelectorAll('.stack-card');

        if (cards.length > 0 && 'IntersectionObserver' in window) {
            const stackObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const card = entry.target;
                        const delay = index * 100;

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) rotateX(0) scale(1)';
                        }, delay);
                    }
                });
            }, { threshold: 0.2 });

            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = `translateY(${50 + (index * 20)}px) rotateX(-10deg) scale(0.95)`;
                card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
                stackObserver.observe(card);
            });
        }
    }

    createStackEffect();

    // ===== Particle Effect on Mouse Move (Optional) =====
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particleFade 1s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    // Add particle fade animation
    if (!document.querySelector('#particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes particleFade {
                from {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                to {
                    transform: translateY(-50px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Uncomment to enable particle effect on mouse move
    // let particleTimeout;
    // document.addEventListener('mousemove', function(e) {
    //     clearTimeout(particleTimeout);
    //     particleTimeout = setTimeout(() => {
    //         if (Math.random() > 0.8) {
    //             createParticle(e.clientX, e.clientY);
    //         }
    //     }, 50);
    // });

    // ===== Performance Optimization =====
    // Add will-change property only when needed
    function optimizePerformance() {
        const animatedElements = document.querySelectorAll(
            '.service-card, .portfolio-card, .team-card'
        );

        animatedElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform, box-shadow';
            });

            element.addEventListener('mouseleave', function() {
                this.style.willChange = 'auto';
            });
        });
    }

    optimizePerformance();

    // ===== Disable Animations on Reduced Motion =====
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        document.body.classList.add('reduced-motion');
    }

    console.log('UrbanKonnect Premium 3D Animations Loaded ✨');

})();

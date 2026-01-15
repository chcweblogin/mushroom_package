document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple fade in on scroll observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    });

    // Horizontal Scroll on Mouse Wheel for Products with Smooth Momentum
    const productGrid = document.querySelector('.products-grid');

    if (productGrid) {
        let currentScroll = 0;
        let targetScroll = 0;
        let isAnimating = false;

        // Initialize scroll position
        // We wait a tick to ensure layout is done
        setTimeout(() => {
            currentScroll = productGrid.scrollLeft;
            targetScroll = productGrid.scrollLeft;
        }, 100);

        productGrid.addEventListener('wheel', (e) => {
            // Check boundaries
            const maxScroll = productGrid.scrollWidth - productGrid.clientWidth;

            // Allow vertical scrolling if we are at the edges
            const isAtLeft = targetScroll <= 0;
            const isAtRight = targetScroll >= maxScroll;
            const isGoingLeft = e.deltaY < 0;
            const isGoingRight = e.deltaY > 0;

            if ((isAtLeft && isGoingLeft) || (isAtRight && isGoingRight)) {
                return; // Let default happening (vertical scroll)
            }

            e.preventDefault();

            // Accumulate delta to target (multiplier for speed)
            targetScroll += e.deltaY * 1.5;

            // Clamp target
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

            if (!isAnimating) {
                isAnimating = true;
                requestAnimationFrame(animateScroll);
            }
        }, { passive: false });

        function animateScroll() {
            // Linear interpolation (Lerp) for smoothness
            // factor 0.08 determines the "weight" - lower is heavier/smoother
            currentScroll += (targetScroll - currentScroll) * 0.08;

            productGrid.scrollLeft = currentScroll;

            // Stop animation when close enough
            if (Math.abs(targetScroll - currentScroll) > 0.5) {
                requestAnimationFrame(animateScroll);
            } else {
                productGrid.scrollLeft = targetScroll;
                isAnimating = false;
            }
        }
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                newsletterForm.reset();
            }
        });
    }

    // Contact Form - handled natively by HTML
    // No JS needed for FormSubmit standard integration
});

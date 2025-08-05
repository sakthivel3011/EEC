// Enhanced JavaScript for Energy and Environment Conservation Club Website

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.querySelector('.navbar');
    const backToTopButton = document.getElementById('backToTop');
    const mobileMenuToggle = document.getElementById('mobileMenu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll events
    function handleScroll() {
        // Add background to navbar when scrolling
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTopButton.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopButton.classList.remove('visible');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle functionality
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle aria-expanded attribute
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Statistics counter animation
    function animateCounters() {
        const statsSection = document.querySelector('.about-section');
        const statNumbers = document.querySelectorAll('.about-stat-value');
        
        if (!statsSection) return;
        
        const statsPosition = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (statsPosition.top < windowHeight && statsPosition.bottom >= 0 && !statsSection.classList.contains('counted')) {
            statsSection.classList.add('counted');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                let current = 0;
                const increment = Math.ceil(target / 60); // Complete in ~1 second at 60fps
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = current;
                    }
                }, 16);
            });
        }
    }
    
    // Add scroll listener for stats animation
    window.addEventListener('scroll', animateCounters);
    // Also check once on page load
    animateCounters();

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if href is just #
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission with validation
    const form = document.getElementById('membershipForm');
    const loader = document.getElementById('formLoader');
    const formSuccess = document.getElementById('formSuccess');

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Reset error state
            input.classList.remove('error');
            
            // Check required fields
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            }
            
            // Validate email format
            if (input.type === 'email' && input.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('error');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show';
        
        if (type === 'success') {
            toast.style.backgroundColor = '#4caf50';
        } else {
            toast.style.backgroundColor = '#f44336';
        }
        
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            showToast('Please fill all required fields correctly', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        loader.style.display = 'flex';
        
        // Simulate form submission (replace with actual fetch)
        setTimeout(() => {
            loader.style.display = 'none';
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset form after 5 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                formSuccess.style.display = 'none';
                submitBtn.disabled = false;
            }, 5000);
        }, 2000);
    });

    // Initialize AOS with custom settings
    AOS.init({
        duration: 1000,
        easing: 'ease-out-quart',
        once: false,
        mirror: true,
        offset: 120,
        delay: 100,
        anchorPlacement: 'top-bottom',
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    // Set custom easing for animations
    document.documentElement.style.setProperty('--aos-easing', 'cubic-bezier(0.16, 1, 0.3, 1)');

    // Add hero content animation after page load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animated');
        }, 500);
    }
});

// Handle splash screen and loader
document.addEventListener('DOMContentLoaded', function() {
    const kecSplash = document.getElementById('kecSplash');
    const regularLoader = document.querySelector('.eec-loader');
    
    setTimeout(() => {
        kecSplash.style.opacity = '0';
        setTimeout(() => {
            kecSplash.style.display = 'none';
            regularLoader.style.display = 'flex';
            
            setTimeout(() => {
                regularLoader.style.opacity = '0';
                setTimeout(() => {
                    regularLoader.style.display = 'none';
                }, 500);
            }, 1000);
        }, 800);
    }, 2500);
});
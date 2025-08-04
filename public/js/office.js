   // Add scroll animation
        const animateElements = document.querySelectorAll('.animate-up');
        
        const animateOnScroll = () => {
            animateElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Initial check
        animateOnScroll();
        
        // Check on scroll
        window.addEventListener('scroll', animateOnScroll);



      
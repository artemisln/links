document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
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
    
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    window.addEventListener('scroll', updateActiveNav);
    
    updateActiveNav();
    
    const experienceItems = document.querySelectorAll('.experience-item');
    const projectItems = document.querySelectorAll('.project-item');
    
    function addHoverEffects() {
        const items = [...experienceItems, ...projectItems];
        
        items.forEach(item => {
            item.addEventListener('mouseenter', function() {
                items.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.style.opacity = '0.5';
                    }
                });
            });
            
            item.addEventListener('mouseleave', function() {
                items.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }
    
    if (window.innerWidth >= 1024) {
        addHoverEffects();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            addHoverEffects();
        }
    });
    
    const links = document.querySelectorAll('.link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    function addMouseSpotlight() {
        const spotlight = document.querySelector('.spotlight');
        
        document.addEventListener('mousemove', (e) => {
            if (spotlight) {
                const x = e.clientX;
                const y = e.clientY;
                spotlight.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
            }
        });
    }
    
    addMouseSpotlight();
    
    function addScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        const elements = document.querySelectorAll('.section, .experience-item, .project-item');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    setTimeout(addScrollReveal, 500);
});

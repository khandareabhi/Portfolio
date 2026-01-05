// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelector('input[type="text"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message active';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 2rem; color: #28a745; margin-bottom: 10px;"></i>
            <h3 style="color: #155724; margin-bottom: 10px;">Message Sent Successfully!</h3>
            <p style="color: #0c4128;">Thank you ${name}! I'll get back to you soon at ${email}.</p>
        `;
        
        // Insert success message
        this.parentNode.insertBefore(successMessage, this);
        
        // Hide form and show success message
        this.style.display = 'none';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            this.reset();
            this.style.display = 'block';
            successMessage.remove();
        }, 5000);
        
        // Log to console (in production, send to backend)
        console.log('Contact Form Submission:', { name, email, subject, message });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate position with offset for fixed navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        }
    });
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items animation on scroll
const skillItems = document.querySelectorAll('.skill-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add delay for staggered animation
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

// Initialize skill items with hidden state
skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(item);
});

// Animate sections on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Update footer year
const footerYear = document.querySelector('.footer p');
if (footerYear && footerYear.textContent.includes('2024')) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Abhishek Khandare. All rights reserved.`;
}

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active nav item
    updateActiveNav();
    
    // Add fade-in class to home section
    document.querySelector('#home').classList.add('fade-in');
    
    // Log page load
    console.log('Portfolio loaded successfully!');
    
    // Update page title
    document.title = 'Abhishek Khandare | Full-Stack Java Developer';
});

// Project links placeholder alert for demo links
document.querySelectorAll('.project-link[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectName = this.closest('.project-card').querySelector('.project-title').textContent;
        alert(`🚧 ${projectName} demo will be available soon!\n\nCurrently, only GitHub repository is available.`);
    });
});

// View Resume button functionality
document.querySelectorAll('a[href="#view-resume"]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Resume will be available soon! You can contact me at khandareabhishek0@gmail.com for my resume.');
        
        // If you have a resume PDF, replace the above alert with:
        // window.open('path/to/your/resume.pdf', '_blank');
    });
});

// Set up all external links to open in new tab
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (link.hostname !== window.location.hostname) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    }
});

// LeetCode stats update (if you want to dynamically update)
const leetCodeStats = {
    totalSolved: 67,
    easy: 40,
    medium: 20,
    hard: 7
};

// You can update this dynamically if you have an API
// For now, it's hardcoded as per your information
console.log('LeetCode Stats:', leetCodeStats);

// Add hover effect for achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, just show an alert
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});


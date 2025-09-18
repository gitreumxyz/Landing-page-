// Mobile menu functionality
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const hamburgers = menuBtn.querySelectorAll('.hamburger');
    
    mobileNav.classList.toggle('show');
    
    // Animate hamburger to X
    if (mobileNav.classList.contains('show')) {
        hamburgers[0].style.transform = 'rotate(45deg) translateY(6px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
}

// Smooth scrolling to sections
function scrollToSection(sectionId) {
    // Close mobile menu if open
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const hamburgers = menuBtn.querySelectorAll('.hamburger');
    
    if (mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        hamburgers[0].style.transform = 'none';
        hamburgers[1].style.opacity = '1';
        hamburgers[2].style.transform = 'none';
    }
    
    if (sectionId === '') {
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = document.querySelector('.navigation').offsetHeight;
            const elementPosition = element.offsetTop - navHeight;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Form submission handling
function handleSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submitBtn');
    const submitIcon = document.getElementById('submitIcon');
    const checkIcon = document.getElementById('checkIcon');
    
    if (email) {
        // Show success state
        submitBtn.disabled = true;
        submitIcon.style.display = 'none';
        checkIcon.style.display = 'block';
        
        // Show success message (you can integrate with a toast library or create custom notification)
        showNotification('Thank you! We\'ll be in touch soon.');
        
        // Clear the form
        document.getElementById('email').value = '';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.disabled = false;
            submitIcon.style.display = 'block';
            checkIcon.style.display = 'none';
        }, 3000);
    }
}

// Simple notification system
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #22c55e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navigation');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(17, 17, 17, 0.8)';
    }
});

// Add intersection observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-item, .event-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Add click handlers for buttons that should open external links
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for external buttons
    const learnMoreBtns = document.querySelectorAll('.event-card .btn-primary');
    learnMoreBtns.forEach(btn => {
        if (btn.textContent.includes('Learn More')) {
            btn.addEventListener('click', function() {
                // Replace with actual event URL
                window.open('#', '_blank');
            });
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu
    if (event.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const hamburgers = menuBtn.querySelectorAll('.hamburger');
        
        if (mobileNav.classList.contains('show')) {
            mobileNav.classList.remove('show');
            hamburgers[0].style.transform = 'none';
            hamburgers[1].style.opacity = '1';
            hamburgers[2].style.transform = 'none';
        }
    }
});

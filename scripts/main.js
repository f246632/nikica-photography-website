// Nikica Karas Photography Website JavaScript
// Author: Claude Code
// Features: Portfolio filtering, contact forms, natural animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initPortfolioFilter();
    initContactForm();
    initSmoothScrolling();
    initAnimations();
    initNaturalEffects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Header scroll effect with natural feel
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            header.style.background = 'rgba(254, 254, 254, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(45, 80, 22, 0.1)';
        } else {
            header.style.background = 'rgba(254, 254, 254, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
        }

        lastScrollTop = scrollTop;
    });
}

// Portfolio filtering functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach((item, index) => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    // Staggered animation for natural feel
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, index * 100);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Portfolio item hover effects
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px) rotate(1deg)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Add form validation styling
    addFormValidation();
}

async function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const submitButton = e.target.querySelector('button[type="submit"]');

    // Validate required fields
    const requiredFields = ['name', 'email', 'service'];
    let isValid = true;

    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#E6E0D4';
        }
    });

    if (!isValid) {
        showNotification('Molimo popunite sva obavezna polja označena *', 'error');
        return;
    }

    // Validate email format
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
        showNotification('Molimo unesite valjanu email adresu', 'error');
        return;
    }

    // Show loading state
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-leaf fa-spin"></i> Šalje se...';
    submitButton.disabled = true;

    try {
        // Simulate email sending to careass@gmail.com
        await simulateEmailSend(formData);

        // Show success modal
        showSuccessModal();

        // Reset form with natural animation
        resetFormWithAnimation(e.target);

        showNotification('Poruka uspješno poslana! Nikica će vam se javiti uskoro. 🌿📸', 'success');

    } catch (error) {
        console.error('Error sending form:', error);
        showNotification('Greška prilikom slanja. Molimo pokušajte ponovno ili nazovite direktno.', 'error');
    } finally {
        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Simulate email sending (in real implementation, this would call your backend)
async function simulateEmailSend(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Log form data for demo purposes
            console.log('Email sent to careass@gmail.com with booking request:');
            console.log('='.repeat(50));
            console.log(`Photographer: Nikica Karas`);
            console.log(`Contact: +385 92 372 0382`);
            console.log('');

            for (let [key, value] of formData.entries()) {
                const fieldName = getFieldDisplayName(key);
                console.log(`${fieldName}: ${value}`);
            }

            console.log('='.repeat(50));
            console.log('Professional photographer ready for your shoot! 📸');

            // Simulate success
            resolve('Email sent successfully to Nikica');
        }, 2000);
    });
}

function getFieldDisplayName(key) {
    const fieldNames = {
        'name': 'Ime i prezime',
        'email': 'Email',
        'phone': 'Telefon',
        'service': 'Vrsta snimanja',
        'location': 'Lokacija',
        'date': 'Željeni datum',
        'message': 'Opis snimanja'
    };
    return fieldNames[key] || key;
}

// Modal functionality
function showSuccessModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';

        // Add natural entrance animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8) translateY(-50px)';
        modalContent.style.opacity = '0';

        setTimeout(() => {
            modalContent.style.transform = 'scale(1) translateY(0)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 100);

        // Close modal when clicking X or outside
        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = closeModal;

        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        };
    }
}

function closeModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8) translateY(-50px)';
        modalContent.style.opacity = '0';

        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Reset form with natural animation
function resetFormWithAnimation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach((input, index) => {
        setTimeout(() => {
            input.style.transform = 'scale(0.95)';
            input.style.opacity = '0.5';

            setTimeout(() => {
                input.value = '';
                input.style.transform = 'scale(1)';
                input.style.opacity = '1';
                input.style.borderColor = '#E6E0D4';
            }, 150);
        }, index * 50);
    });
}

// Notification system with natural design
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.nature-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `nature-notification nature-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add natural styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 2001;
        max-width: 400px;
        padding: 1.2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(45, 80, 22, 0.15);
        transform: translateX(100%) rotate(3deg);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        background: ${getNotificationColor(type)};
        color: white;
        border-left: 4px solid rgba(255,255,255,0.3);
    `;

    // Style the content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.8rem;
        font-weight: 500;
    `;

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in with natural movement
    setTimeout(() => {
        notification.style.transform = 'translateX(0) rotate(0deg)';
    }, 100);

    // Auto remove after 6 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 6000);

    // Manual close
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.opacity = '1';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.opacity = '0.8';
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%) rotate(-3deg)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #4a7c59, #2d5016)',
        error: 'linear-gradient(135deg, #e74c3c, #c0392b)',
        info: 'linear-gradient(135deg, #8B4513, #6F4E37)',
        warning: 'linear-gradient(135deg, #D2691E, #B8860B)'
    };
    return colors[type] || colors.info;
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                // Natural scroll with easing
                scrollToWithEasing(targetPosition, 1000);
            }
        });
    });
}

function scrollToWithEasing(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Natural easing function
        const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Animation on scroll with natural timing
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Natural staggered animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotate(0deg)';
                }, index * 150);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .stat, .drone-feature, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) rotate(-2deg)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// Natural effects for photographer's personality
function initNaturalEffects() {
    // Add subtle hover effects to frames
    const frames = document.querySelectorAll('.photographer-frame, .nature-frame, .drone-placeholder');

    frames.forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            frame.style.transform = frame.style.transform.includes('scale') ?
                frame.style.transform :
                frame.style.transform + ' scale(1.05)';
        });

        frame.addEventListener('mouseleave', () => {
            frame.style.transform = frame.style.transform.replace(' scale(1.05)', '');
        });
    });

    // Add natural parallax effect to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');

        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add gentle floating animation to photographer frame
    const photographerFrame = document.querySelector('.photographer-frame');
    if (photographerFrame) {
        let floatDirection = 1;
        setInterval(() => {
            const currentTransform = photographerFrame.style.transform || 'rotate(-3deg)';
            const newY = floatDirection * 3;
            photographerFrame.style.transform = currentTransform + ` translateY(${newY}px)`;
            floatDirection *= -1;
        }, 3000);
    }
}

// Form validation enhancements
function addFormValidation() {
    const inputs = document.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });

        // Add natural focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4a7c59';
            this.style.boxShadow = '0 0 0 3px rgba(74, 124, 89, 0.1)';
        });

        input.addEventListener('blur', function() {
            if (!this.classList.contains('error')) {
                this.style.borderColor = '#E6E0D4';
                this.style.boxShadow = 'none';
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Ovo polje je obavezno';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Unesite valjanu email adresu';
        }
    }

    // Phone validation (Croatian format)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^(\+385|0)[0-9]{8,9}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = 'Unesite valjan broj telefona';
        }
    }

    // Update field appearance with natural colors
    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = '#4a7c59';
        removeFieldError(field);
    } else {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: block;
        font-weight: 500;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s ease;
    `;

    field.parentNode.appendChild(errorDiv);

    // Animate in
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 50);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.style.opacity = '0';
        existingError.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            existingError.remove();
        }, 300);
    }
}

// Utility functions
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

// Phone number formatting for Croatian numbers
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.startsWith('385')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        value = '+385' + value.substring(1);
    }

    input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
});

// Export for global access
window.NikicaPhotography = {
    showNotification,
    closeModal,
    validateField,
    formatPhoneNumber
};

// Natural console greeting
console.log(`
📸 Nikica Karas Photography Website
====================================
Professional photographer from beautiful Croatia!

📍 Locations: Opatija • Krk • Ogulin
📞 Contact: +385 92 372 0382
📧 Email: careass@gmail.com

Services:
🏠 Apartment photography
👤 Portrait photography
🎉 Event photography
🚁 Drone photography
🌲 Nature & landscape

Built with professional excellence! 📸
`);
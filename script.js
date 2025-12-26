// =========================================
// 1. INITIALIZE ICONS
// =========================================
// This looks for <i> tags with data-lucide attributes and renders SVGs
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// =========================================
// 2. NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// =========================================
// 3. SMOOTH SCROLLING FOR ANCHOR LINKS
// =========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks && navLinks.classList.contains('mobile-menu-open')) {
                navLinks.classList.remove('mobile-menu-open');
            }

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =========================================
// 4. MOBILE MENU TOGGLE
// =========================================
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-menu-open');
    });
}

// =========================================
// 5. 'LEARN MORE' POPUP LOGIC
// =========================================
const popup = document.getElementById('initiative-popup');
const popupTitle = document.getElementById('popup-title');
const popupDescription = document.getElementById('popup-description');
const popupImg = document.getElementById('popup-img');
const popupKeyImpacts = document.getElementById('popup-key-impacts');
const readMoreBtn = document.getElementById('read-more-btn');
const expandedDetails = document.querySelector('.expanded-details');
const popupCloseBtn = document.getElementById('popup-close-btn');

const learnMoreButtons = document.querySelectorAll('.initiative-card .btn-primary');

function openPopup(card) {
    if(!popup) return;

    const title = card.querySelector('h3').innerText;
    const description = card.querySelector('.init-intro').innerText;
    const imgSrc = card.querySelector('.init-img-container img').src;
    const impactsList = card.querySelectorAll('.key-impacts li');
    const moreInfo = card.dataset.moreInfo;

    if(popupTitle) popupTitle.innerText = title;
    if(popupDescription) popupDescription.innerText = description;
    if(popupImg) popupImg.src = imgSrc;
    
    if(popupKeyImpacts) {
        popupKeyImpacts.innerHTML = '';
        impactsList.forEach(item => {
            const newLi = document.createElement('li');
            newLi.innerHTML = item.innerHTML;
            const icon = newLi.querySelector('i');
            if (icon && typeof lucide !== 'undefined') {
                lucide.createIcons({
                    nodes: [icon],
                    attrs: { 'class': 'bullet-icon' }
                });
            }
            popupKeyImpacts.appendChild(newLi);
        });
    }

    if(expandedDetails) {
        expandedDetails.innerHTML = moreInfo || "<p>More details coming soon.</p>";
        expandedDetails.style.display = 'none';
    }
    
    if(readMoreBtn) {
        readMoreBtn.innerText = 'Read more';
        readMoreBtn.style.display = 'block';
    }

    popup.style.display = 'flex';
}

function closePopup() {
    if(popup) popup.style.display = 'none';
    if(expandedDetails) expandedDetails.style.display = 'none';
    if(readMoreBtn) readMoreBtn.innerText = 'Read more';
}

function toggleReadMore() {
    if (expandedDetails.style.display === 'none') {
        expandedDetails.style.display = 'block';
        readMoreBtn.innerText = 'Read less';
    } else {
        expandedDetails.style.display = 'none';
        readMoreBtn.innerText = 'Read more';
    }
}

learnMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.initiative-card');
        if (card) openPopup(card);
    });
});

if(readMoreBtn) readMoreBtn.addEventListener('click', toggleReadMore);
if(popupCloseBtn) popupCloseBtn.addEventListener('click', closePopup);

if(popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });
}

// =========================================
// 6. TESTIMONIAL SLIDER
// =========================================
const testimonials = [
    {
        quote: "Liz's dedication to community service and her grace under pressure make her a true role model for the youth.",
        author: "Jane Doe",
        title: "CEO, Community Foundation"
    },
    {
        quote: "Working with Liz on the environmental campaign was inspiring.",
        author: "John Smith",
        title: "Environmental Activist"
    },
    {
        quote: "As a mentor, Liz has a profound impact on young women.",
        author: "Emily White",
        title: "Mentee"
    }
];

let currentTestimonial = 0;
const testimonialQuote = document.querySelector('.testimonial-quote-center');
const testimonialAuthor = document.querySelector('.testimonial-author-center h4');
const testimonialTitle = document.querySelector('.testimonial-author-center p');
const prevBtn = document.querySelector('.testimonial-nav-center .prev');
const nextBtn = document.querySelector('.testimonial-nav-center .next');

function showTestimonial(index) {
    if(testimonialQuote && testimonials[index]) {
        const testimonial = testimonials[index];
        testimonialQuote.textContent = testimonial.quote;
        testimonialAuthor.textContent = testimonial.author;
        testimonialTitle.textContent = testimonial.title;
    }
}

if(prevBtn && nextBtn){
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}

// =========================================
// 7. DARK MODE TOGGLE
// =========================================
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const body = document.body;

const applyTheme = () => {
    if(!themeToggleBtn) return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

const toggleTheme = () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i data-lucide="moon"></i>';
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i data-lucide="sun"></i>';
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
};

if(themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
document.addEventListener('DOMContentLoaded', applyTheme);

// =========================================
// 9. BACK TO TOP BUTTON
// =========================================
const backToTopBtn = document.getElementById('back-to-top-btn');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

if(backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// 10. DYNAMIC COPYRIGHT YEAR (FIXED)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const year = new Date().getFullYear();
    const footerText = document.querySelector('.footer-section p');
    if (footerText) {
        // FIXED: Added backticks around the template literal
        footerText.textContent = `© ${year} Liz Wakesho Mwashori. All rights reserved.`;
    }

    // =========================================
    // 11. PARTNER & FOCUS MODALS
    // =========================================
    const modalButtons = document.querySelectorAll('.open-partner-modal, .open-focus-modal');
    const closeButtons = document.querySelectorAll('.close-partner-modal, .close-focus-modal');
    
    modalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-overlay') || e.target.classList.contains('modal')) {
            const modal = e.target.closest('.modal') || e.target;
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // =========================================
    // 12. SCROLL ANIMATIONS
    // =========================================
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('progress-bar')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('visible');
                }
                if (entry.target.classList.contains('metric-number')) {
                    const target = +entry.target.getAttribute('data-target');
                    const speed = 200;
                    const updateCount = () => {
                        const count = +entry.target.innerText.replace('+', '');
                        const inc = target / speed;
                        if (count < target) {
                            entry.target.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20);
                        } else {
                            entry.target.innerText = target + "+";
                        }
                    };
                    updateCount();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.progress-bar, .timeline-item, .metric-number').forEach(el => observer.observe(el));
});
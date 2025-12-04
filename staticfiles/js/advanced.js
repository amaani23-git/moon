// ============================================
// ADVANCED INTERACTIVITY & ANIMATIONS
// ============================================

// Initialize all features on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  initializeAdvancedFeatures();
  initializeParticleEffects();
  initializeScrollAnimations();
  initializeFormEnhancements();
  initializeAuthForms();
});

// ============================================
// AUTH FORMS: password strength, toggle, validation
// ============================================
function initializeAuthForms() {
  // Add form-control class to auth form inputs for consistent styling
  ['#registerForm', '#loginForm', '.form-container .form-group form', '.login-container form'].forEach(sel => {
    document.querySelectorAll(sel).forEach(form => {
      form.querySelectorAll('input, textarea, select').forEach(input => {
        if (!input.classList.contains('form-control')) input.classList.add('form-control');
      });
    });
  });

  // Register page strength meter (non-modal)
  const regStrength = document.getElementById('registerPasswordStrength');
  const regPassword = document.querySelector('input[name="password1"]');
  if (regStrength && regPassword) {
    regPassword.addEventListener('input', () => {
      updatePasswordStrength(regPassword.value, regStrength);
    });
  }

  // Toggle password visibility buttons
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.closest('.form-group').querySelector('input[type="password"], input');
      if (!input) return;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        if (icon) { icon.classList.remove('bi-eye'); icon.classList.add('bi-eye-slash'); }
      } else {
        input.type = 'password';
        if (icon) { icon.classList.remove('bi-eye-slash'); icon.classList.add('bi-eye'); }
      }
    });
  });

  // Add client-side validation for auth forms
  const authForms = document.querySelectorAll('#registerForm, .form-container form, .login-container form');
  authForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // simple check: required inputs
      const requiredInputs = form.querySelectorAll('input[required]');
      let ok = true;
      requiredInputs.forEach(inp => {
        if (!inp.value.trim()) {
          inp.classList.add('invalid');
          ok = false;
        }
      });
      if (!ok) {
        e.preventDefault();
        showNotification('error', 'Please fill all required fields correctly');
      }
    });
  });
}

function updatePasswordStrength(password, strengthEl) {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password)
  };

  const meterSections = strengthEl.querySelectorAll('.meter-section');
  const requirementsList = strengthEl.querySelectorAll('.strength-requirements li');
  let strength = 0;
  Object.entries(requirements).forEach(([key, met], i) => {
    const reqEl = requirementsList[i];
    if (met) {
      reqEl.classList.add('met');
      strength++;
    } else {
      reqEl.classList.remove('met');
    }
  });

  meterSections.forEach((sec, idx) => {
    sec.className = 'meter-section';
    if (idx < strength) {
      sec.classList.add(
        strength <= 2 ? 'weak' :
        strength <= 3 ? 'medium' :
        strength <= 4 ? 'strong' : 'very-strong'
      );
    }
  });

  return strength;
}

// ============================================
// PARTICLE EFFECTS ON CLICK
// ============================================
function initializeParticleEffects() {
  document.addEventListener('click', function(e) {
    if (e.target.matches('button, a, .service-cta, .submit-service-request')) {
      createParticles(e.pageX, e.pageY);
    }
  });

  function createParticles(x, y) {
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      
      const tx = (Math.random() - 0.5) * 100;
      const ty = (Math.random() - 0.5) * 100 - 50;
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(particle);
      
      setTimeout(() => particle.remove(), 2000);
    }
  }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('.service-card, .stat-card, .image-card').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
}

// ============================================
// FORM ENHANCEMENTS
// ============================================
function initializeFormEnhancements() {
  // Service Form
  const serviceForm = document.querySelector('.service-form');
  if (serviceForm) {
    handleServiceForm(serviceForm);
  }

  // Contact Form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    handleContactForm(contactForm);
  }

  // Add form index for staggered animations
  document.querySelectorAll('.form-group').forEach((group, index) => {
    group.style.setProperty('--form-index', index);
  });
}

function handleServiceForm(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-service-request');
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification('success', 'Service request submitted successfully!');
      form.reset();
      
      // Reset all select elements color
      form.querySelectorAll('select').forEach(select => {
        select.style.color = '#666';
      });
    } catch (error) {
      showNotification('error', 'Failed to submit request. Please try again.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // Select field styling
  form.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', function() {
      this.style.color = this.value ? '#333' : '#666';
    });
  });

  // Input field focus effects
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.01)';
    });
    
    field.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });
}

function handleContactForm(form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.submit-btn');
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showNotification('success', 'Message sent successfully! We\'ll get back to you soon.');
      form.reset();
    } catch (error) {
      showNotification('error', 'Failed to send message. Please try again.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(type, message) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 10px;">×</button>
  `;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Auto remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// ============================================
// STATISTICS COUNTER WITH ANIMATION
// ============================================
function initializeStatistics() {
  const stats = document.querySelectorAll('.stat-number');
  const options = {
    threshold: 0.6,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-target') || 0);
        animateCounter(target, 0, finalValue, 2000);
        observer.unobserve(target);
      }
    });
  }, options);

  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const current = Math.floor(progress * (end - start) + start);
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.classList.add('animate');
    }
  };
  window.requestAnimationFrame(step);
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================
function enhanceSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================
function initializeRippleEffect() {
  document.querySelectorAll('button, .service-cta, .submit-service-request').forEach(button => {
    button.addEventListener('click', function(e) {
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
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ============================================
// IMAGE GALLERY ENHANCEMENTS
// ============================================
function enhanceImageGallery() {
  const cards = document.querySelectorAll('.image-card');
  
  cards.forEach((card, index) => {
    card.style.setProperty('--item-index', index);
    
    // Like button
    const likeBtn = card.querySelector('.like');
    if (likeBtn) {
      likeBtn.addEventListener('click', function() {
        this.classList.toggle('liked');
        const count = this.querySelector('.like-count');
        let value = parseInt(count.textContent);
        count.textContent = this.classList.contains('liked') ? value + 1 : Math.max(0, value - 1);
      });
    }

    // Dislike button
    const dislikeBtn = card.querySelector('.dislike');
    if (dislikeBtn) {
      dislikeBtn.addEventListener('click', function() {
        this.classList.toggle('disliked');
        const count = this.querySelector('.dislike-count');
        let value = parseInt(count.textContent);
        count.textContent = this.classList.contains('disliked') ? value + 1 : Math.max(0, value - 1);
      });
    }

    // Comment functionality
    const commentBtn = card.querySelector('.comment-btn');
    const commentInput = card.querySelector('.comment-box input');
    if (commentBtn && commentInput) {
      commentBtn.addEventListener('click', function() {
        const text = commentInput.value.trim();
        if (text) {
          const commentList = card.querySelector('.comment-list');
          const comment = document.createElement('div');
          comment.className = 'comment';
          comment.textContent = text;
          commentList.appendChild(comment);
          commentInput.value = '';
        }
      });

      // Allow Enter key to submit comment
      commentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          commentBtn.click();
        }
      });
    }

    // Share button
    const shareBtn = card.querySelector('.share');
    if (shareBtn) {
      shareBtn.addEventListener('click', function() {
        const title = card.querySelector('strong').textContent;
        const url = window.location.href + '#' + title.replace(/\s+/g, '-').toLowerCase();
        
        if (navigator.share) {
          navigator.share({
            title: 'Niique Investors - ' + title,
            url: url
          });
        } else {
          navigator.clipboard.writeText(url);
          showNotification('success', 'Link copied to clipboard!');
        }
      });
    }
  });
}

// ============================================
// SERVICE FEATURES ANIMATION
// ============================================
function enhanceServiceFeatures() {
  document.querySelectorAll('.service-features').forEach(list => {
    const items = list.querySelectorAll('li');
    items.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
  });
}

// ============================================
// ADVANCED FEATURES INITIALIZATION
// ============================================
function initializeAdvancedFeatures() {
  initializeStatistics();
  enhanceSmoothScroll();
  initializeRippleEffect();
  enhanceImageGallery();
  enhanceServiceFeatures();
  initializeKeyboardNavigation();
  initializeThemeToggle();
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
function initializeKeyboardNavigation() {
  document.addEventListener('keydown', function(e) {
    // Escape to close any open modals
    if (e.key === 'Escape') {
      const modal = document.getElementById('authModal');
      if (modal && modal.classList.contains('show')) {
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn && closeBtn.click();
      }
    }

    // Tab navigation highlighting
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });

  // Remove keyboard navigation styling when using mouse
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
  });
}

// ============================================
// THEME TOGGLE (Optional Dark Mode)
// ============================================
function initializeThemeToggle() {
  // Check for saved theme preference or default to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', theme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initializeScrollToTop() {
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-to-top';
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #61dafb, #2575fc);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Call scroll to top initialization
window.addEventListener('load', initializeScrollToTop);

// ============================================
// PERFORMANCE: Lazy Loading for Images
// ============================================
function initializeLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// ============================================
// FORM VALIDATION WITH REAL-TIME FEEDBACK
// ============================================
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        if (this.classList.contains('invalid')) {
          validateField(this);
        }
      });
    });

    form.addEventListener('submit', function(e) {
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        showNotification('error', 'Please fill all required fields correctly');
      }
    });
  });
}

function validateField(field) {
  let isValid = true;
  
  if (field.required && !field.value.trim()) {
    isValid = false;
  } else if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(field.value);
  }
  
  if (isValid) {
    field.classList.remove('invalid');
  } else {
    field.classList.add('invalid');
  }
  
  return isValid;
}

// Initialize form validation on load
window.addEventListener('load', initializeFormValidation);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    initializeLazyLoading();
  });
} else {
  setTimeout(() => {
    initializeLazyLoading();
  }, 2000);
}

// ============================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ============================================
window.showNotification = showNotification;

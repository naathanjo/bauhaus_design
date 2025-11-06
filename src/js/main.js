// Main JavaScript for Bauhaus Revival Portfolio

// ========================================
// THEME TOGGLE
// ========================================
(function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const themeIcon = themeToggle?.querySelector('.theme-icon');

  // Get stored theme or default to light
  const storedTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  // Theme toggle event listener
  themeToggle?.addEventListener('click', function () {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Announce theme change to screen readers
    announceThemeChange(newTheme);
  });

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '☀' : '🌙';
    }
  }

  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = `Theme changed to ${theme} mode`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
})();

// ========================================
// MOBILE MENU TOGGLE
// ========================================
(function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  menuToggle?.addEventListener('click', function () {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    // Toggle menu state
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Prevent body scroll when menu is open
    if (!isExpanded) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (!menuToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('active');
      navMenu?.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
      menuToggle.focus();
    }
  });

  // Close menu when window is resized above mobile breakpoint
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768) {
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
      }
    }, 250);
  });
})();

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Only handle internal anchor links
      if (href !== '#' && href !== '') {
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Focus the target element for accessibility
          target.focus();
        }
      }
    });
  });
})();

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
(function initScrollAnimations() {
  // Only run if user hasn't requested reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Optionally stop observing after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with fade-in class
  document.querySelectorAll('.fade-in, .section, .card').forEach(el => {
    observer.observe(el);
  });
})();

// ========================================
// HEADER SCROLL BEHAVIOR
// ========================================
(function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  let scrollTimer;

  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimer);
    
    scrollTimer = setTimeout(function () {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Add shadow when scrolled
      if (currentScroll > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      // Hide/show header on scroll (optional)
      // Uncomment if you want auto-hiding header
      /*
      if (currentScroll > lastScrollTop && currentScroll > 300) {
        // Scrolling down
        header?.classList.add('header-hidden');
      } else {
        // Scrolling up
        header?.classList.remove('header-hidden');
      }
      */

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, 10);
  });
})();

// ========================================
// EXTERNAL LINKS
// ========================================
(function initExternalLinks() {
  // Add external link icon and attributes to external links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    const url = new URL(link.href);
    
    // Check if link is external
    if (url.hostname !== window.location.hostname) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Add visual indicator (optional)
      // link.classList.add('external-link');
    }
  });
})();

// ========================================
// FORM VALIDATION (if you add contact forms)
// ========================================
(function initForms() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      const isValid = validateForm(form);
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
        showError(field, 'This field is required');
      } else {
        field.classList.remove('error');
        hideError(field);
      }
    });

    return isValid;
  }

  function showError(field, message) {
    let errorElement = field.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('span');
      errorElement.classList.add('error-message');
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
  }

  function hideError(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
  }
})();

// ========================================
// UTILITIES
// ========================================

// Debounce function
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

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c✨ Bauhaus Revival Portfolio', 'font-size: 16px; font-weight: bold; color: #e31e24;');
console.log('%cForm follows function.', 'font-size: 12px; color: #004f9f;');

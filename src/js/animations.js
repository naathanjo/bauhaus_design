// Advanced Animation System for Bauhaus Revival Portfolio
// Handles scroll animations, parallax effects, and geometric element animations

// ========================================
// CONFIGURATION
// ========================================
const ANIMATION_CONFIG = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  intersectionThreshold: 0.1,
  scrollThrottle: 16, // ~60fps
  parallaxStrength: 0.3,
};

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
class ScrollReveal {
  constructor() {
    if (ANIMATION_CONFIG.reducedMotion) {
      this.makeAllVisible();
      return;
    }

    this.elements = document.querySelectorAll('[data-reveal]');
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        root: null,
        rootMargin: '0px',
        threshold: ANIMATION_CONFIG.intersectionThreshold,
      }
    );

    this.init();
  }

  init() {
    this.elements.forEach(el => {
      el.classList.add('reveal-hidden');
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        
        setTimeout(() => {
          entry.target.classList.add('reveal-visible');
          entry.target.classList.remove('reveal-hidden');
        }, delay);

        // Optionally stop observing after reveal
        if (!entry.target.dataset.revealRepeat) {
          this.observer.unobserve(entry.target);
        }
      } else if (entry.target.dataset.revealRepeat) {
        entry.target.classList.remove('reveal-visible');
        entry.target.classList.add('reveal-hidden');
      }
    });
  }

  makeAllVisible() {
    this.elements = document.querySelectorAll('[data-reveal]');
    this.elements.forEach(el => {
      el.classList.add('reveal-visible');
    });
  }
}

// ========================================
// PARALLAX SCROLLING
// ========================================
class ParallaxEffect {
  constructor() {
    if (ANIMATION_CONFIG.reducedMotion) return;

    this.elements = document.querySelectorAll('[data-parallax]');
    this.ticking = false;

    if (this.elements.length > 0) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this), {
      passive: true,
    });
    this.update();
  }

  handleScroll() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.update();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  update() {
    const scrollY = window.pageYOffset;

    this.elements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || ANIMATION_CONFIG.parallaxStrength;
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Only apply parallax if element is in viewport
      if (
        elementTop + elementHeight >= scrollY &&
        elementTop <= scrollY + viewportHeight
      ) {
        const offset = (scrollY - elementTop) * speed;
        el.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
  }
}

// ========================================
// GEOMETRIC ELEMENT ANIMATIONS
// ========================================
class GeometricAnimations {
  constructor() {
    if (ANIMATION_CONFIG.reducedMotion) return;

    this.shapes = document.querySelectorAll('.shape--animate, .bg-circle, .bg-square, .bg-triangle');
    this.init();
  }

  init() {
    this.shapes.forEach((shape, index) => {
      // Stagger the animation start
      const delay = index * 0.15;
      shape.style.animationDelay = `${delay}s`;

      // Add random movement variation
      this.addRandomMovement(shape, index);
    });

    // Mouse tracking for parallax on hover
    this.addMouseTracking();
  }

  addRandomMovement(shape, index) {
    const animations = ['float', 'rotate', 'pulse'];
    const randomAnimation = animations[index % animations.length];
    
    // Add CSS class for animation
    shape.classList.add(`animate-${randomAnimation}`);
  }

  addMouseTracking() {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;

      this.shapes.forEach((shape, index) => {
        const speed = (index + 1) * 5;
        const x = currentX * speed;
        const y = currentY * speed;

        shape.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(updatePosition);
    };

    updatePosition();
  }
}

// ========================================
// SMOOTH SCROLL TO TOP
// ========================================
class ScrollToTop {
  constructor() {
    this.button = this.createButton();
    this.init();
  }

  createButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.innerHTML = '↑';
    document.body.appendChild(button);
    return button;
  }

  init() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.button.classList.add('visible');
      } else {
        this.button.classList.remove('visible');
      }
    });

    // Scroll to top on click
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

// ========================================
// STAGGERED GRID ANIMATIONS
// ========================================
class StaggeredGrid {
  constructor() {
    if (ANIMATION_CONFIG.reducedMotion) return;

    this.grids = document.querySelectorAll('[data-stagger]');
    this.init();
  }

  init() {
    this.grids.forEach(grid => {
      const items = grid.children;
      const staggerDelay = parseInt(grid.dataset.staggerDelay) || 100;

      Array.from(items).forEach((item, index) => {
        item.style.animationDelay = `${index * staggerDelay}ms`;
        item.classList.add('stagger-item');
      });
    });
  }
}

// ========================================
// PAGE TRANSITION ANIMATIONS
// ========================================
class PageTransitions {
  constructor() {
    if (ANIMATION_CONFIG.reducedMotion) return;

    this.init();
  }

  init() {
    // Fade in page content on load
    document.body.classList.add('page-loaded');

    // Handle internal link clicks
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"]');
    
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Don't animate anchor links or external links
        if (href.startsWith('#') || link.hasAttribute('target')) {
          return;
        }

        // Add fade out class
        document.body.classList.add('page-transitioning');
      });
    });
  }
}

// ========================================
// CURSOR EFFECTS (Optional Enhancement)
// ========================================
class CursorEffect {
  constructor() {
    if (ANIMATION_CONFIG.reducedMotion) return;
    if ('ontouchstart' in window) return; // Skip on touch devices

    this.cursor = this.createCursor();
    this.cursorDot = this.createCursorDot();
    this.init();
  }

  createCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    return cursor;
  }

  createCursorDot() {
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(dot);
    return dot;
  }

  init() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant position for dot
      this.cursorDot.style.left = `${mouseX}px`;
      this.cursorDot.style.top = `${mouseY}px`;
    });

    // Smooth follow for cursor ring
    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      this.cursor.style.left = `${cursorX}px`;
      this.cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('cursor-hover');
        this.cursorDot.classList.add('cursor-hover');
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('cursor-hover');
        this.cursorDot.classList.remove('cursor-hover');
      });
    });
  }
}

// ========================================
// INITIALIZE ALL ANIMATIONS
// ========================================
function initAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
    return;
  }

  // Initialize animation systems
  new ScrollReveal();
  new ParallaxEffect();
  new GeometricAnimations();
  new ScrollToTop();
  new StaggeredGrid();
  new PageTransitions();
  
  // Optional: Uncomment to enable custom cursor
  // new CursorEffect();

  console.log('%c🎨 Animations Initialized', 'color: #e31e24; font-weight: bold;');
}

// Start animations
initAnimations();

// Export for potential use in other scripts
export {
  ScrollReveal,
  ParallaxEffect,
  GeometricAnimations,
  ScrollToTop,
  StaggeredGrid,
  PageTransitions,
  CursorEffect,
};

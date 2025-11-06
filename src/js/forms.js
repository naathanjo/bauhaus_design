// Form Validation and Handling for Bauhaus Revival Portfolio

// ========================================
// FORM VALIDATION CLASS
// ========================================
class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = {};
    this.isValid = true;
    
    this.init();
  }

  init() {
    // Get all form fields
    const inputs = this.form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      this.fields[input.name] = input;
      
      // Add real-time validation
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });

    // Handle form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');

    // Clear previous error
    this.clearError(field);

    // Required field validation
    if (required && !value) {
      this.showError(field, 'This field is required');
      return false;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // URL validation
    if (type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        this.showError(field, 'Please enter a valid URL');
        return false;
      }
    }

    // Min length validation
    if (field.hasAttribute('minlength')) {
      const minLength = parseInt(field.getAttribute('minlength'));
      if (value.length < minLength) {
        this.showError(field, `Minimum ${minLength} characters required`);
        return false;
      }
    }

    // Max length validation
    if (field.hasAttribute('maxlength')) {
      const maxLength = parseInt(field.getAttribute('maxlength'));
      if (value.length > maxLength) {
        this.showError(field, `Maximum ${maxLength} characters allowed`);
        return false;
      }
    }

    // Pattern validation
    if (field.hasAttribute('pattern')) {
      const pattern = new RegExp(field.getAttribute('pattern'));
      if (!pattern.test(value)) {
        this.showError(field, field.getAttribute('title') || 'Invalid format');
        return false;
      }
    }

    // Mark as valid
    field.classList.add('valid');
    field.classList.remove('error');
    return true;
  }

  validateAllFields() {
    this.isValid = true;
    
    Object.values(this.fields).forEach(field => {
      // Skip honeypot field
      if (field.closest('.form-honeypot')) return;
      
      if (!this.validateField(field)) {
        this.isValid = false;
      }
    });

    return this.isValid;
  }

  showError(field, message) {
    field.classList.add('error');
    field.classList.remove('valid');

    // Remove existing error message
    this.clearError(field);

    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    // Insert error message after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
  }

  clearError(field) {
    field.classList.remove('error');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Check honeypot (spam protection)
    const honeypot = this.form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) {
      console.log('Spam detected');
      return false;
    }

    // Validate all fields
    if (!this.validateAllFields()) {
      this.showStatus('error', 'Please fix the errors above');
      return false;
    }

    // Get form data
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    // Show loading state
    this.showStatus('loading', 'Sending message...');
    this.disableForm();

    try {
      // Simulate API call (replace with actual endpoint)
      await this.submitForm(data);
      
      // Show success message
      this.showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
      this.form.reset();
      
      // Clear validation classes
      Object.values(this.fields).forEach(field => {
        field.classList.remove('valid', 'error');
      });
    } catch (error) {
      console.error('Form submission error:', error);
      this.showStatus('error', 'Failed to send message. Please try again or email me directly.');
    } finally {
      this.enableForm();
    }
  }

  async submitForm(data) {
    // Replace this with your actual form submission logic
    // Examples: Formspree, Netlify Forms, custom API endpoint
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful submission
        console.log('Form data:', data);
        resolve();
        
        // To simulate error:
        // reject(new Error('Submission failed'));
      }, 2000);
    });
  }

  showStatus(type, message) {
    let statusElement = this.form.querySelector('.form-status');
    
    if (!statusElement) {
      statusElement = document.createElement('div');
      statusElement.className = 'form-status';
      statusElement.setAttribute('role', 'status');
      statusElement.setAttribute('aria-live', 'polite');
      this.form.appendChild(statusElement);
    }

    statusElement.className = `form-status ${type}`;
    
    if (type === 'loading') {
      statusElement.innerHTML = `
        <div class="form-loading"></div>
        <span>${message}</span>
      `;
    } else {
      statusElement.textContent = message;
    }
  }

  disableForm() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
    }

    Object.values(this.fields).forEach(field => {
      field.disabled = true;
    });
  }

  enableForm() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      if (submitButton.dataset.originalText) {
        submitButton.textContent = submitButton.dataset.originalText;
      }
    }

    Object.values(this.fields).forEach(field => {
      field.disabled = false;
    });
  }
}

// ========================================
// CHARACTER COUNTER
// ========================================
class CharacterCounter {
  constructor(textarea, maxLength) {
    this.textarea = textarea;
    this.maxLength = maxLength || parseInt(textarea.getAttribute('maxlength')) || 500;
    
    this.createCounter();
    this.update();
    
    this.textarea.addEventListener('input', () => this.update());
  }

  createCounter() {
    this.counter = document.createElement('div');
    this.counter.className = 'form-counter';
    this.textarea.parentNode.insertBefore(this.counter, this.textarea.nextSibling);
  }

  update() {
    const length = this.textarea.value.length;
    const remaining = this.maxLength - length;
    
    this.counter.textContent = `${length} / ${this.maxLength}`;
    
    if (remaining <= 0) {
      this.counter.classList.add('limit-reached');
    } else {
      this.counter.classList.remove('limit-reached');
    }
  }
}

// ========================================
// FILE UPLOAD HANDLER
// ========================================
class FileUploadHandler {
  constructor(input) {
    this.input = input;
    this.label = this.input.closest('.form-file').querySelector('.form-file-label');
    this.fileNameDisplay = this.input.closest('.form-file').querySelector('.form-file-name');
    
    this.init();
  }

  init() {
    this.input.addEventListener('change', () => this.handleFileSelect());
  }

  handleFileSelect() {
    const files = Array.from(this.input.files);
    
    if (files.length === 0) {
      this.clearFileDisplay();
      return;
    }

    const fileNames = files.map(file => file.name).join(', ');
    
    if (this.fileNameDisplay) {
      this.fileNameDisplay.textContent = fileNames;
    }

    // Validate file size (example: 5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      this.showError('File size must be less than 5MB');
      this.input.value = '';
      this.clearFileDisplay();
    }
  }

  clearFileDisplay() {
    if (this.fileNameDisplay) {
      this.fileNameDisplay.textContent = '';
    }
  }

  showError(message) {
    // Show error message
    console.error(message);
    alert(message); // Replace with better UI
  }
}

// ========================================
// INITIALIZE FORM ENHANCEMENTS
// ========================================
function initForms() {
  // Initialize form validation
  document.querySelectorAll('form[data-validate]').forEach(form => {
    new FormValidator(form);
  });

  // Initialize character counters
  document.querySelectorAll('textarea[data-counter]').forEach(textarea => {
    new CharacterCounter(textarea);
  });

  // Initialize file uploads
  document.querySelectorAll('input[type="file"]').forEach(input => {
    new FileUploadHandler(input);
  });

  console.log('%c📝 Forms Initialized', 'color: #004f9f; font-weight: bold;');
}

// Wait for DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForms);
} else {
  initForms();
}

// Export for potential use in other scripts
export { FormValidator, CharacterCounter, FileUploadHandler };

// UrbanKonnect - Form Validation

(function() {
    'use strict';

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Get form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                message: document.getElementById('message').value.trim(),
                gdpr: document.getElementById('gdpr').checked,
                honeypot: document.querySelector('input[name="website"]').value
            };

            // Validate form
            if (validateContactForm(formData)) {
                // Check honeypot (spam protection)
                if (formData.honeypot !== '') {
                    console.log('Spam detected');
                    return false;
                }

                // Submit form
                submitContactForm(formData);
            }
        });
    }

    // Form Validation Function
    function validateContactForm(data) {
        let isValid = true;
        const errors = [];

        // Name validation
        if (data.name === '') {
            errors.push({ field: 'name', message: 'Name is required' });
            isValid = false;
        } else if (data.name.length < 2) {
            errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
            isValid = false;
        }

        // Email validation
        if (data.email === '') {
            errors.push({ field: 'email', message: 'Email is required' });
            isValid = false;
        } else if (!validateEmail(data.email)) {
            errors.push({ field: 'email', message: 'Please enter a valid email address' });
            isValid = false;
        }

        // Phone validation
        if (data.phone === '') {
            errors.push({ field: 'phone', message: 'Phone number is required' });
            isValid = false;
        } else if (!validatePhone(data.phone)) {
            errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
            isValid = false;
        }

        // Service validation
        if (data.service === '') {
            errors.push({ field: 'service', message: 'Please select a service' });
            isValid = false;
        }

        // Message validation
        if (data.message === '') {
            errors.push({ field: 'message', message: 'Message is required' });
            isValid = false;
        } else if (data.message.length < 10) {
            errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
            isValid = false;
        }

        // GDPR validation
        if (!data.gdpr) {
            errors.push({ field: 'gdpr', message: 'You must accept the privacy policy' });
            isValid = false;
        }

        // Display errors
        if (!isValid) {
            displayErrors(errors);
        }

        return isValid;
    }

    // Email Validation
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }

    // Phone Validation (Indian format)
    function validatePhone(phone) {
        // Remove spaces, dashes, and parentheses
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

        // Check if it's a valid Indian phone number
        const re = /^(\+91|91|0)?[6789]\d{9}$/;
        return re.test(cleanPhone);
    }

    // Display Errors
    function displayErrors(errors) {
        errors.forEach(error => {
            const field = document.getElementById(error.field);
            if (field) {
                field.classList.add('is-invalid');
                field.classList.remove('is-valid');
            }
        });

        // Show first error message
        const errorDiv = document.querySelector('.form-error');
        if (errorDiv && errors.length > 0) {
            errorDiv.querySelector('.error-message').textContent = errors[0].message;
            errorDiv.style.display = 'block';

            // Scroll to error
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Clear Errors
    function clearErrors() {
        document.querySelectorAll('.is-invalid').forEach(field => {
            field.classList.remove('is-invalid');
        });

        const errorDiv = document.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }

    // Submit Contact Form
    function submitContactForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call (replace with actual API endpoint)
        setTimeout(() => {
            // Success
            showSuccess('Thank you! Your message has been sent successfully. We\'ll contact you soon.');

            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // In production, replace setTimeout with actual fetch/ajax call:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showSuccess(result.message);
                    contactForm.reset();
                } else {
                    showError(result.message);
                }
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            })
            .catch(error => {
                showError('An error occurred. Please try again.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
            */
        }, 1500);
    }

    // Show Success Message
    function showSuccess(message) {
        const successDiv = document.querySelector('.form-success');
        if (successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Hide after 5 seconds
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Show Error Message
    function showError(message) {
        const errorDiv = document.querySelector('.form-error');
        if (errorDiv) {
            errorDiv.querySelector('.error-message').textContent = message;
            errorDiv.style.display = 'block';
            errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Real-time Validation
    const formFields = contactForm ? contactForm.querySelectorAll('.form-control, .form-select, .form-check-input') : [];

    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });

        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    // Validate Individual Field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.id;
        let isValid = true;

        switch(fieldName) {
            case 'name':
                isValid = value !== '' && value.length >= 2;
                break;
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'phone':
                isValid = validatePhone(value);
                break;
            case 'service':
                isValid = value !== '';
                break;
            case 'message':
                isValid = value !== '' && value.length >= 10;
                break;
            case 'gdpr':
                isValid = field.checked;
                break;
        }

        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
        }

        return isValid;
    }

    // Character Counter for Textarea
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('small');
        counter.className = 'form-text text-muted';
        counter.textContent = '0 / 500 characters';
        messageField.parentNode.appendChild(counter);

        messageField.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / 500 characters`;

            if (length > 500) {
                this.value = this.value.substring(0, 500);
            }
        });
    }

    // Phone Number Formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');

            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }

            // Format as XXX-XXX-XXXX
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + value.substring(10);
            }

            this.value = value;
        });
    }

    // Prevent Form Submission on Enter (except in textarea)
    if (contactForm) {
        contactForm.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        });
    }

    // Auto-save Form Data (localStorage)
    if (contactForm) {
        // Load saved data
        loadFormData();

        // Save on input
        contactForm.addEventListener('input', function() {
            saveFormData();
        });

        // Clear on successful submission
        contactForm.addEventListener('submit', function() {
            clearFormData();
        });
    }

    function saveFormData() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value
        };

        localStorage.setItem('contactFormData', JSON.stringify(formData));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);

            if (document.getElementById('name')) document.getElementById('name').value = formData.name || '';
            if (document.getElementById('email')) document.getElementById('email').value = formData.email || '';
            if (document.getElementById('phone')) document.getElementById('phone').value = formData.phone || '';
            if (document.getElementById('service')) document.getElementById('service').value = formData.service || '';
            if (document.getElementById('budget')) document.getElementById('budget').value = formData.budget || '';
            if (document.getElementById('message')) document.getElementById('message').value = formData.message || '';
        }
    }

    function clearFormData() {
        localStorage.removeItem('contactFormData');
    }

})();

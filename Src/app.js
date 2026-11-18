/**
 * Validate the registration form locally. No account data is transmitted or stored.
 */
'use strict';
const form = document.querySelector('#register-form');
const status = document.querySelector('#form-status');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const fields = [usernameInput, emailInput, passwordInput];
const validators = {
  username(input) {
    const value = input.value.trim();
    if (!value) return 'Please enter a username.';
    if (value.length < 3) return 'Your username needs at least 3 characters.';
    if (value.length > 24) return 'Your username can be at most 24 characters.';
    if (!/^[A-Za-z0-9_]+$/.test(value)) {
      return 'Use only letters, numbers and underscores.';
    }
    return '';
  },
  email(input) {
    const value = input.value.trim();
    if (!value) return 'Please enter your email address.';
    if (input.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter a valid email address, like you@example.com.';
    }
    return '';
  },
  password(input) {
    const value = input.value;
    if (!value) return 'Please enter a password.';
    if (value.length < 8) return 'Your password needs at least 8 characters.';
    const missing = [];
    if (!/[A-Z]/.test(value)) missing.push('an uppercase letter');
    if (!/[a-z]/.test(value)) missing.push('a lowercase letter');
    if (!/[0-9]/.test(value)) missing.push('a number');
    if (missing.length) {
      const last = missing.pop();
      const requirements = missing.length ? `${missing.join(', ')} and ${last}` : last;
      return `Please add ${requirements} to your password.`;
    }
    return '';
  }
};
function showError(input, message) {
  document.querySelector(`#${input.id}-error`).textContent = message;
  input.setAttribute('aria-invalid', 'true');
}
function clearError(input) {
  document.querySelector(`#${input.id}-error`).textContent = '';
  input.setAttribute('aria-invalid', 'false');
}
function validateField(input) {
  const message = validators[input.id](input);
  if (message) {
    showError(input, message);
    return false;
  }
  clearError(input);
  return true;
}
function validateAll() {
  const trimmedUsername = usernameInput.value.trim();
  if (trimmedUsername !== usernameInput.value) {
    usernameInput.value = trimmedUsername;
  }
  let firstInvalid = null;
  fields.forEach((input) => {
    if (!validateField(input) && firstInvalid === null) {
      firstInvalid = input;
    }
  });
  return firstInvalid;
}
function setStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}
function clearStatus() {
  delete status.dataset.state;
  status.textContent = '';
}
function showInvalidForm() {
  const firstInvalid = validateAll();
  if (firstInvalid) {
    firstInvalid.focus();
    setStatus('error', 'Please check the fields above and try again.');
    return;
  }
  // The username rule accepts surrounding whitespace, so retry after trimming it.
  form.requestSubmit();
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstInvalid = validateAll();
  if (firstInvalid) {
    firstInvalid.focus();
    setStatus('error', 'Please check the fields above and try again.');
    return;
  }
  setStatus(
    'success',
    'Your details look good. Nothing has been sent or saved; this is a local confirmation.'
  );
});
// Native-invalid fields block submit, so report errors after all invalid events fire.
let invalidCheckPending = false;
form.addEventListener('invalid', (event) => {
  event.preventDefault();
  if (invalidCheckPending) return;
  invalidCheckPending = true;
  setTimeout(() => {
    invalidCheckPending = false;
    showInvalidForm();
  }, 0);
}, true);
form.addEventListener('input', (event) => {
  const input = event.target;
  if (!fields.includes(input)) return;
  if (input.getAttribute('aria-invalid') === 'true') {
    validateField(input);
  }
  if (!form.querySelector('[aria-invalid="true"]')) {
    clearStatus();
  }
});

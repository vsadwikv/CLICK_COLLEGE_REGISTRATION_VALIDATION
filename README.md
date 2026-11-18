# Click College Global registration form

## Files

- `index.html` contains the form and accessible inline error messages.
- `styles.css` provides the responsive desktop and mobile layouts.
- `app.js` validates the fields in the browser.
- `assets/logo.svg` is the editable vector logo matched to the supplied reference design.

## Run locally

Open `index.html` in a modern browser. No build step, dependencies, backend, or account creation are required.

## Validation behavior

Validation runs on form submission. The form keeps native HTML validation enabled; a capturing `invalid` listener displays inline errors when the browser blocks submission before the `submit` event. All three fields are checked, and focus moves to the first invalid field.

- **Username:** required; surrounding whitespace is trimmed; 3–24 ASCII letters, numbers, or underscores.
- **Email:** required; browser email validity and an application-level email pattern are checked. The entered email is not changed.
- **Password:** required; at least 8 characters, including an uppercase letter, a lowercase letter, and a number.

Field errors clear as the user corrects the corresponding value. A valid submission displays a local confirmation only. Values are not sent or saved.

## Development checks

The page was checked in a browser at 1440 × 900 and 390 × 844. Blank fields, malformed email, short and incorrectly formatted values, multiple errors, valid input, keyboard submission, and surrounding username whitespace were exercised. No console errors or horizontal overflow appeared in those checks.

all validation_test_cases for the Desktop 1440x900 and 390x844 , are in `../EVIDENCE/`. The scrolled mobile capture keeps the inline errors and submit button visible together.

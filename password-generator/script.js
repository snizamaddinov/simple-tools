// Character sets
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

// Get elements
const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const lengthInput = document.getElementById('length-input');
const lengthSlider = document.getElementById('length-slider');

// Synchronize slider and number input
lengthInput.addEventListener('input', () => {
    lengthSlider.value = lengthInput.value;
    generatePassword();
});

lengthSlider.addEventListener('input', () => {
    lengthInput.value = lengthSlider.value;
    generatePassword();
});

// Generate password on option change
lowercaseCheckbox.addEventListener('change', generatePassword);
uppercaseCheckbox.addEventListener('change', generatePassword);
numbersCheckbox.addEventListener('change', generatePassword);
symbolsCheckbox.addEventListener('change', generatePassword);

// Generate password on page load
window.addEventListener('load', generatePassword);

// Generate button click
generateBtn.addEventListener('click', generatePassword);

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    passwordField.select();
    document.execCommand('copy');

    // Show notification
    const notification = document.getElementById('copy-notification');
    notification.classList.add('show');

    // Hide notification after 2 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
});
// Generate password function
function generatePassword() {
    const length = parseInt(lengthInput.value);
    let characterPool = '';
    let password = '';

    if (lowercaseCheckbox.checked) {
        characterPool += lowercaseChars;
    }
    if (uppercaseCheckbox.checked) {
        characterPool += uppercaseChars;
    }
    if (numbersCheckbox.checked) {
        characterPool += numberChars;
    }
    if (symbolsCheckbox.checked) {
        characterPool += symbolChars;
    }

    if (characterPool === '') {
        passwordField.value = '';
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomChar = characterPool.charAt(Math.floor(Math.random() * characterPool.length));
        password += randomChar;
    }

    passwordField.value = password;
}

// Update password when manually edited
passwordField.addEventListener('input', () => {
    // Do nothing for now, field is editable
});

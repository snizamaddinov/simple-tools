const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

const passwordField = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("generate-btn");
const lowercaseCheckbox = document.getElementById("lowercase");
const uppercaseCheckbox = document.getElementById("uppercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const lengthInput = document.getElementById("length-input");
const lengthSlider = document.getElementById("length-slider");
const copyNotification = document.getElementById("copy-notification");
const strengthText = document.getElementById("strength-text");
const strengthFill = document.getElementById("strength-fill");
const strengthContainer = document.querySelector(".strength");

let notificationTimer;

function randomCharFrom(charSet) {
    const index = Math.floor(Math.random() * charSet.length);
    return charSet.charAt(index);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getLengthValue() {
    const min = Number(lengthInput.min);
    const max = Number(lengthInput.max);
    const parsed = Number.parseInt(lengthInput.value, 10);

    if (Number.isNaN(parsed)) {
        return min;
    }

    return Math.min(max, Math.max(min, parsed));
}

function syncLengthInputs(source) {
    const value = getLengthValue();
    lengthInput.value = value;
    lengthSlider.value = value;

    if (source === "slider") {
        lengthInput.value = lengthSlider.value;
    }
}

function activeCharacterSets() {
    const sets = [];
    if (lowercaseCheckbox.checked) {
        sets.push(lowercaseChars);
    }
    if (uppercaseCheckbox.checked) {
        sets.push(uppercaseChars);
    }
    if (numbersCheckbox.checked) {
        sets.push(numberChars);
    }
    if (symbolsCheckbox.checked) {
        sets.push(symbolChars);
    }
    return sets;
}

function updateStrength(password, setCount) {
    strengthContainer.classList.remove("strength-weak", "strength-fair", "strength-good", "strength-strong");

    if (!password) {
        strengthText.textContent = "-";
        strengthFill.style.width = "0%";
        return;
    }

    let score = 0;
    const length = password.length;

    if (length >= 10) score += 1;
    if (length >= 14) score += 1;
    if (length >= 20) score += 1;
    if (setCount >= 2) score += 1;
    if (setCount >= 3) score += 1;
    if (setCount >= 4) score += 1;

    const percentage = Math.min(100, Math.round((score / 6) * 100));
    strengthFill.style.width = `${percentage}%`;

    if (score <= 1) {
        strengthText.textContent = "Weak";
        strengthContainer.classList.add("strength-weak");
    } else if (score <= 3) {
        strengthText.textContent = "Fair";
        strengthContainer.classList.add("strength-fair");
    } else if (score <= 4) {
        strengthText.textContent = "Good";
        strengthContainer.classList.add("strength-good");
    } else {
        strengthText.textContent = "Strong";
        strengthContainer.classList.add("strength-strong");
    }
}

function showCopyFeedback(message) {
    copyNotification.textContent = message;
    copyNotification.classList.add("show");

    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
        copyNotification.classList.remove("show");
    }, 1800);
}

function generatePassword() {
    syncLengthInputs();
    const length = Number.parseInt(lengthInput.value, 10);
    const sets = activeCharacterSets();

    if (sets.length === 0) {
        passwordField.value = "";
        updateStrength("", 0);
        return;
    }

    const passwordChars = [];
    const mergedPool = sets.join("");

    // Guarantee at least one character from each selected character set.
    sets.forEach((set) => {
        passwordChars.push(randomCharFrom(set));
    });

    while (passwordChars.length < length) {
        passwordChars.push(randomCharFrom(mergedPool));
    }

    const password = shuffle(passwordChars).slice(0, length).join("");
    passwordField.value = password;
    updateStrength(password, sets.length);
}

async function copyPassword() {
    const password = passwordField.value;
    if (!password) {
        showCopyFeedback("Nothing to copy");
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        showCopyFeedback("Password copied");
    } catch (error) {
        passwordField.removeAttribute("readonly");
        passwordField.select();
        document.execCommand("copy");
        passwordField.setAttribute("readonly", "readonly");
        showCopyFeedback("Password copied");
    }
}

lengthInput.addEventListener("input", () => {
    syncLengthInputs();
    generatePassword();
});

lengthSlider.addEventListener("input", () => {
    lengthInput.value = lengthSlider.value;
    generatePassword();
});

[lowercaseCheckbox, uppercaseCheckbox, numbersCheckbox, symbolsCheckbox].forEach((checkbox) => {
    checkbox.addEventListener("change", generatePassword);
});

copyBtn.addEventListener("click", copyPassword);
generateBtn.addEventListener("click", generatePassword);
window.addEventListener("load", generatePassword);

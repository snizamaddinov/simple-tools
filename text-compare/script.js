const text1Input = document.getElementById('text1');
const text2Input = document.getElementById('text2');
const compareBtn = document.getElementById('compareBtn');
const editBtn = document.getElementById('editBtn');
const resultLeft = document.getElementById('resultLeft');
const resultRight = document.getElementById('resultRight');
const inputContainer = document.getElementById('inputContainer');
const resultContainer = document.getElementById('resultContainer');

compareBtn.addEventListener('click', () => {
    const text1 = text1Input.value;
    const text2 = text2Input.value;

    if (!text1 && !text2) return;

    const diff = Diff.diffWords(text1, text2);

    resultLeft.innerHTML = '';
    resultRight.innerHTML = '';

    const leftFragment = document.createDocumentFragment();
    const rightFragment = document.createDocumentFragment();

    diff.forEach(part => {
        if (part.removed) {
            const span = document.createElement('span');
            span.className = 'removed';
            span.textContent = part.value;
            leftFragment.appendChild(span);
        } else if (!part.added) {
            leftFragment.appendChild(document.createTextNode(part.value));
        }

        if (part.added) {
            const span = document.createElement('span');
            span.className = 'added';
            span.textContent = part.value;
            rightFragment.appendChild(span);
        } else if (!part.removed) {
            rightFragment.appendChild(document.createTextNode(part.value));
        }
    });

    resultLeft.appendChild(leftFragment);
    resultRight.appendChild(rightFragment);

    inputContainer.style.display = 'none';
    resultContainer.style.display = 'flex';
});

editBtn.addEventListener('click', () => {
    resultContainer.style.display = 'none';
    inputContainer.style.display = 'flex';
});

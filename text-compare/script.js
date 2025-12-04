document.getElementById('compareBtn').addEventListener('click', compareTexts);

function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    const diff = Diff.diffWords(text1, text2);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    diff.forEach(part => {
        const span = document.createElement('span');
        if (part.added) {
            span.className = 'added';
        } else if (part.removed) {
            span.className = 'removed';
        }
        span.appendChild(document.createTextNode(part.value));
        resultDiv.appendChild(span);
    });
}

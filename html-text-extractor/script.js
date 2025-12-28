const htmlInput = document.getElementById('htmlInput');
const textOutput = document.getElementById('textOutput');
const copyBtn = document.getElementById('copyBtn');

function extractText() {
    const rawHtml = htmlInput.value;

    if (!rawHtml) {
        textOutput.value = '';
        return;
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHtml;

    textOutput.value = tempDiv.innerText;
}

htmlInput.addEventListener('input', extractText);

copyBtn.addEventListener('click', () => {
    if (!textOutput.value) return;

    textOutput.select();
    textOutput.setSelectionRange(0, 99999); 

    navigator.clipboard.writeText(textOutput.value).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        copyBtn.style.backgroundColor = '#28a745';

        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.backgroundColor = '';
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

const htmlInput = document.getElementById('htmlInput');
const htmlPreview = document.getElementById('htmlPreview');

function renderHtml() {
    const html = htmlInput.value;
    htmlPreview.srcdoc = html || '<p style="font-family: sans-serif; color: #666; padding: 8px;">Preview appears here.</p>';
}

htmlInput.addEventListener('input', renderHtml);
renderHtml();

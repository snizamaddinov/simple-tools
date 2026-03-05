const input = document.getElementById('markdownInput');
const preview = document.getElementById('preview');
const toggleHtmlBtn = document.getElementById('toggleHtmlBtn');
const copyHtmlBtn = document.getElementById('copyHtmlBtn');
const htmlPanel = document.getElementById('htmlPanel');
const htmlOutput = document.getElementById('htmlOutput');

const md = window.markdownit({
    html: false,
    linkify: true,
    breaks: true
});

function renderMarkdown() {
    const renderedHtml = md.render(input.value);
    const fullHtmlDocument = `<!DOCTYPE html>
<html>
<body>
${renderedHtml}
</body>
</html>`;

    preview.innerHTML = renderedHtml;
    htmlOutput.value = fullHtmlDocument;
}

function setHtmlPanelState(isVisible) {
    preview.classList.toggle('hidden', isVisible);
    htmlPanel.classList.toggle('hidden', !isVisible);
    toggleHtmlBtn.textContent = isVisible ? 'View Preview' : 'View HTML';
}

async function copyHtml() {
    const html = htmlOutput.value;

    try {
        await navigator.clipboard.writeText(html);
        copyHtmlBtn.textContent = 'Copied';
        setTimeout(() => {
            copyHtmlBtn.textContent = 'Copy HTML';
        }, 1200);
    } catch {
        htmlOutput.focus();
        htmlOutput.select();
        document.execCommand('copy');
        copyHtmlBtn.textContent = 'Copied';
        setTimeout(() => {
            copyHtmlBtn.textContent = 'Copy HTML';
        }, 1200);
    }
}

input.addEventListener('input', renderMarkdown);
toggleHtmlBtn.addEventListener('click', () => {
    const show = htmlPanel.classList.contains('hidden');
    setHtmlPanelState(show);
});
copyHtmlBtn.addEventListener('click', copyHtml);

setHtmlPanelState(false);
renderMarkdown();

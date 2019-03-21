export default function download(content, filename) {
    const blob = new Blob([content]);
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const a = document.createElement('a');
        a.download = filename;
        a.href = URL.createObjectURL(blob);

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

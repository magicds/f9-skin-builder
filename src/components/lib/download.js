export default function download(content, filename) {
    const a = document.createElement('a');
    a.download = filename;
    a.href = URL.createObjectURL(new Blob([content]));

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
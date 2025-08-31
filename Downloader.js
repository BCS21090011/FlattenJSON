function DownloadFile(blob, filename) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
}

function GetBlobFromURL(url) {
    return fetch(url).then((response) => response.blob());
}
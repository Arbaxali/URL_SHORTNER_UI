
// document.getElementById('urlForm').addEventListener('submit', async function(event) {
//     event.preventDefault();

//     const originalUrl = document.getElementById('originalUrl').value;
//     const resultDiv = document.getElementById('result');

//     const response = await fetch(`https://urlshortnernew.azurewebsites.net/Urlshort?originalUrl=${encodeURIComponent(originalUrl)}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//     if (response.ok) {
//         const shortUrl = await response.text();
//         // resultDiv.innerHTML = `<p>Shortened URL: <a href="https://${shortUrl}" target="_blank">${shortUrl}</a></p>`;
//         resultDiv.innerHTML = `<p>Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
//     } else {
//         resultDiv.innerHTML = `<p>Error shortening URL.</p>`;
//     }
// });
document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const originalUrl = document.getElementById('originalUrl').value;
    const loadingSpinner = document.getElementById('loading');

    const response = await fetch(`https://urlshortnernew.azurewebsites.net/Urlshort?originalUrl=${encodeURIComponent(originalUrl)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resultDiv = document.getElementById('result');
    const formContainer = document.getElementById('form-container');
    const shortUrlInput = document.getElementById('shortUrl');
    const longUrlSpan = document.getElementById('longUrl');

    loadingSpinner.style.display = 'block';

    if (response.ok) {
        const shortUrl = await response.text();
        const customShortUrl = shortUrl.replace('urlshortnernew.azurewebsites.net', 'chotaurl'); // Modify the URL format here
        shortUrlInput.value = customShortUrl;
        longUrlSpan.textContent = originalUrl;

        formContainer.style.display = 'none';
        resultDiv.style.display = 'block';
    } else {
        resultDiv.innerHTML = `<p>Error shortening URL.</p>`;
    }

    loadingSpinner.style.display = 'none';
});

document.getElementById('copyButton').addEventListener('click', function() {
    const shortUrlInput = document.getElementById('shortUrl');
    shortUrlInput.select();
    document.execCommand('copy');
});

document.getElementById('shortenAnotherButton').addEventListener('click', function() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('urlForm').reset();
});

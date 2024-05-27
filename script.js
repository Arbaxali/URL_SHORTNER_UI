document.addEventListener('DOMContentLoaded', async function() {
    await fetchVisitorCount();
});

document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const originalUrl = document.getElementById('originalUrl').value;
    const loadingSpinner = document.getElementById('loading');
    const resultDiv = document.getElementById('result');
    const formContainer = document.getElementById('form-container');
    const shortUrlInput = document.getElementById('shortUrl');
    const longUrlAnchor = document.getElementById('longUrl');

    // Show loading spinner
    loadingSpinner.style.display = 'block';
    try {
    const response = await fetch(`https://urlshortnernew.azurewebsites.net/Urlshort?originalUrl=${encodeURIComponent(originalUrl)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Hide loading spinner
    loadingSpinner.style.display = 'none';
    debugger
    if (response.ok) {
        const shortUrl = await response.text();
        shortUrlInput.value = shortUrl;

        // const shortUrlAnchor = document.createElement('a');
        // shortUrlAnchor.href = shortUrl;
        // shortUrlAnchor.textContent = shortUrl;
        // resultDiv.innerHTML = ''; // Clear any previous content
        // resultDiv.appendChild(shortUrlAnchor);
        
        longUrlAnchor.href = originalUrl;
        longUrlAnchor.textContent = originalUrl;

        formContainer.style.display = 'none';
        resultDiv.style.display = 'block';
    }  else {
        const errorResponse = await response.json();
        resultDiv.innerHTML = `<p id="error">${errorResponse.message}</p>`;
        alert(`Error: ${errorResponse.message}`);
    }

}
catch (error) {
    // Hide spinner
    spinner.style.display = 'none';
    resultDiv.innerHTML = `<p id="error">An error occurred while processing your request.</p>`;
    alert("An error occurred while processing your request.");
}
}

);



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

async function fetchVisitorCount() {
    const visitorCountDiv = document.getElementById('visitorCount');
    try {
        const response = await fetch('https://urlshortnernew.azurewebsites.net/api/visitorCount');
        if (response.ok) {
            const count = await response.text();
            visitorCountDiv.innerHTML = `<p>Total Visitors: ${count}</p>`;
        } else {
            visitorCountDiv.innerHTML = `<p>Could not fetch visitor count.</p>`;
        }
    } catch (error) {
        visitorCountDiv.innerHTML = `<p>An error occurred while fetching visitor count: ${error.message}</p>`;
    }
}
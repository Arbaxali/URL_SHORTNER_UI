
document.addEventListener('DOMContentLoaded', async function() {
    await fetchVisitorCount();
});

document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const originalUrl = document.getElementById('originalUrl').value;
    
    const resultDiv = document.getElementById('result');
    const formContainer = document.getElementById('form-container');
    const shortUrlInput = document.getElementById('shortUrl');
    const longUrlAnchor = document.getElementById('longUrl');
    const loadingSpinner = document.getElementById('loading');
    
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

        if (response.ok) {
            const shortUrl = await response.text();
            console.log(shortUrl);
            shortUrlInput.value = shortUrl;

            longUrlAnchor.href = originalUrl;
            longUrlAnchor.textContent = originalUrl;

            formContainer.style.display = 'none';
            resultDiv.style.display = 'block';
        } else {
            const errorResponse = await response.json();
            resultDiv.innerHTML = `<p id="error">${errorResponse.message}</p>`;
            alert(`Error: ${errorResponse.message}`);
            resetForm();
        }
    } catch (error) {
        // Hide spinner
        loadingSpinner.style.display = 'none';
        resultDiv.innerHTML = `<p id="error">An error occurred while processing your request.</p>`;
        alert("An error occurred while processing your request.");
        resetForm();
    }
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
    resetForm(); // Call resetForm to reload the page
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

function resetForm() {
    location.reload(); // Reload the entire page
}




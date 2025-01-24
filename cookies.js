// cookies.js

// Function to read all cookies
function readCookies() {
    const cookies = document.cookie.split(';');
    const cookieList = cookies.map(cookie => {
        const [name, value] = cookie.split('=');
        return { name: name.trim(), value: value.trim() };
    });
    console.log('Cookies:', cookieList);
    displayCookies(cookieList);
}

// Function to display cookies on the page
function displayCookies(cookieList) {
    const cookieContainer = document.getElementById('cookieContainer');
    cookieContainer.innerHTML = '';
    cookieList.forEach(cookie => {
        const cookieElement = document.createElement('p');
        cookieElement.textContent = `${cookie.name}: ${cookie.value}`;
        cookieContainer.appendChild(cookieElement);
    });
}

// Read cookies on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(readCookies, 10000); // Read cookies after 10 seconds
});

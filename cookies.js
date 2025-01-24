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

// Function to delete all cookies
function deleteCookies() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
    console.log('All cookies deleted');
    displayCookies([]);
}

// Function to refresh cookies (delete and set new ones)
function refreshCookies() {
    deleteCookies();
    document.cookie = `username=novaid${new Date().getTime()};path=/;`;
    document.cookie = `email=novaid${new Date().getTime()}@yopmail.com;path=/;`;
    console.log('Cookies refreshed');
    readCookies();
}

// Read cookies on page load
document.addEventListener('DOMContentLoaded', function() {
    readCookies();
});

// Set interval to refresh cookies every 10 seconds
setInterval(refreshCookies, 10000); // 10000 milliseconds = 10 seconds

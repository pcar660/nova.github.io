// generateUserData.js

var username, email, firstName, lastName, age, lastLogin;
var dynamicGeneration = true; // Control variable set to true by default

function generateUserData() {
    const timestamp = new Date().getTime();
    username = `novaid${timestamp}`;
    email = `${username}@yopmail.com`;
    firstName = "NovaWeb01";
    lastName = "Smith";
    lastLogin = new Date().toISOString();
    age = 30;

    const userData = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        lastLogin: lastLogin,
        age: age
    };

    console.log(userData);
    displayUserData(userData);
    sendAdobeEvent();
}

function displayUserData(userData) {
    document.getElementById('username').innerText = userData.username;
    document.getElementById('email').innerText = userData.email;
    document.getElementById('firstName').innerText = userData.firstName;
    document.getElementById('lastName').innerText = userData.lastName;
    document.getElementById('lastLogin').innerText = userData.lastLogin;
    document.getElementById('age').innerText = userData.age;
}

function sendAdobeEvent() {
    if (window._satellite) {
        window._satellite.track('userProfileGenerated', {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            lastLogin: lastLogin,
            age: age
        });
        console.log('Adobe event sent');
    } else {
        console.log('Adobe Launch not available');
    }
}

function deleteCookies() {
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
    console.log('All cookies deleted');
}

function startDynamicGeneration() {
    dynamicGeneration = true;
    generateUserData(); // Generate once immediately
    intervalId = setInterval(function() {
        if (dynamicGeneration) {
            generateUserData();
            setTimeout(readCookies, 10000); // Read cookies after 10 seconds
            setTimeout(function() {
                deleteCookies(); // Delete cookies before reloading the page
                location.reload(); // Reload the page after 20 seconds
            }, 20000);
        }
    }, 20000); // 20000 milliseconds = 20 seconds
}

function stopDynamicGeneration() {
    dynamicGeneration = false;
    clearInterval(intervalId);
}

var intervalId;

document.addEventListener('DOMContentLoaded', function() {
    generateUserData(); // Call once on page load
    startDynamicGeneration(); // Start dynamic generation by default
});

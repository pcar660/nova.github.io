// generateUserData.js

var username, email, firstName, lastName, age, lastLogin;
var dynamicGeneration = true; // Control variable

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

function startDynamicGeneration() {
    dynamicGeneration = true;
    generateUserData(); // Generate once immediately
    intervalId = setInterval(function() {
        if (dynamicGeneration) {
            generateUserData();
            location.reload(); // Reload the page
        }
    }, 10000); // 10000 milliseconds = 10 seconds
}

function stopDynamicGeneration() {
    dynamicGeneration = false;
    clearInterval(intervalId);
}

var intervalId;

document.addEventListener('DOMContentLoaded', function() {
    generateUserData(); // Call once on page load
});

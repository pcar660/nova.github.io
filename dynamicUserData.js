// dynamicUserData.js

var username, email, firstName, lastName, lastLogin, age;
var dynamicGeneration = false; // Control variable

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
}

function displayUserData(userData) {
    document.getElementById('username').innerText = userData.username;
    document.getElementById('email').innerText = userData.email;
    document.getElementById('firstName').innerText = userData.firstName;
    document.getElementById('lastName').innerText = userData.lastName;
    document.getElementById('lastLogin').innerText = userData.lastLogin;
    document.getElementById('age').innerText = userData.age;
}

function startDynamicGeneration() {
    dynamicGeneration = true;
    generateUserData(); // Generate once immediately
    intervalId = setInterval(function() {
        if (dynamicGeneration) {
            generateUserData();
        }
    }, 10000); // 10000 milliseconds = 10 seconds
}

function stopDynamicGeneration() {
    dynamicGeneration = false;
    clearInterval(intervalId);
}

var intervalId;
generateUserData(); // Call once on page load

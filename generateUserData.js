// generateUserData.js

var username, email, firstName, lastName, age, lastLogin, phoneNumber;
var dynamicGeneration = true; // Control variable set to true by default

function generateUserData() {
    const timestamp = new Date().getTime();
    username = `novaid${timestamp}`;
    email = `${username}@yopmail.com`;
    firstName = "NovaWeb01";
    lastName = "Smith";
    lastLogin = new Date().toISOString();
    age = 30;
    phoneNumber = generatePhoneNumber();

    const userData = {
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        lastLogin: lastLogin,
        age: age,
        phoneNumber: phoneNumber
    };

    console.log(userData);
    displayUserData(userData);
 
}

function generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100; // 100-999
    const centralOfficeCode = Math.floor(Math.random() * 900) + 100; // 100-999
    const lineNumber = Math.floor(Math.random() * 10000); // 0000-9999
    return `${areaCode}-${centralOfficeCode}-${lineNumber.toString().padStart(4, '0')}`;
}

function displayUserData(userData) {
    document.getElementById('username').innerText = userData.username;
    document.getElementById('email').innerText = userData.email;
    document.getElementById('firstName').innerText = userData.firstName;
    document.getElementById('lastName').innerText = userData.lastName;
    document.getElementById('lastLogin').innerText = userData.lastLogin;
    document.getElementById('age').innerText = userData.age;
    document.getElementById('phoneNumber').innerText = userData.phoneNumber;
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
    startDynamicGeneration(); // Start dynamic generation by default
});

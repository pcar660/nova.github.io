// dynamicUserData.js

var username, email, firstName, lastName, lastLogin, age;

function generateUserData() {
    const timestamp = new Date().getTime();
    username = `novaid${timestamp}`;
    email = `${username}@yopmail.com`;
    firstName = "NovaWeb01";
    lastName = "Smith";
    lastLogin = new Date().toISOString();
    age = 30;

    console.log({
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        lastLogin: lastLogin,
        age: age
    });
}

generateUserData(); // Call once on page load

setInterval(function() {
    generateUserData();
    location.reload();
}, 10000); // 10000 milliseconds = 10 seconds

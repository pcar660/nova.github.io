// Import the functions you need from the modular Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";


// Generate User Data
var username, email, firstName, lastName, age, lastLogin, phoneNumber;
var dynamicGeneration = false;
var intervalId;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSuy7pyByaME5lKuPgMWc9r1L1nMOI128",
  authDomain: "novaprojectdb.firebaseapp.com",
  databaseURL: "https://novaprojectdb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "novaprojectdb",
  storageBucket: "novaprojectdb.firebasestorage.app",
  messagingSenderId: "481843950955",
  appId: "1:481843950955:web:5e2093ef7195359ea6c82e"
};

// Initialize Firebase with the new modular SDK
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ Function to Save Data
function saveUserData(username, email, firstName, lastName, age, phoneNumber, lastLogin) {
    const userId = ref(database, 'users').push().key; // Create a unique ID for the user

    const userData = {
        profileInfo: {},
        attributes: {
            loggedIn: false,
            novaCrmId: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            age: age,
            phoneNumber: phoneNumber,
            location: "Brussels",
            isSubscribed: true,
            lastLogin: lastLogin,
            creationDate: Date.now(),
            novaWebEventID: Date.now().toString()
        }
    };

    // Save the user data to Firebase
    set(ref(database, 'users/' + userId), userData)
        .then(() => console.log("✅ User data saved successfully!"))
        .catch(error => console.error("❌ Error saving user data:", error));
}

// ✅ Example Usage
saveUserData("johndoe123", "john.doe@example.com", "John", "Doe", 30, "+1234567890", Date.now());

// Function to generate user data
function generateUserData() {
    const timestamp = new Date().getTime();
    username = `novaid${timestamp}`;
    email = `${username}@yopmail.com`;
    firstName = generateFirstName();
    lastName = generateLastName();
    lastLogin = new Date().toISOString();
    age = generateAge();
    phoneNumber = generatePhoneNumber();

    const userData = {
        username,
        email,
        firstName,
        lastName,
        lastLogin,
        age,
        phoneNumber
    };

    console.log("Generated User Data:", userData);
    displayUserData(userData);

    // Store user data in Gist
}

// Helper functions for random data generation
function generateFirstName() {
    const firstNames = ["NovaWeb01", "John", "Jane", "Alex", "Chris"];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function generateLastName() {
    const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Davis"];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generateAge() {
    return Math.floor(Math.random() * 60) + 18; // Random age between 18 and 77
}

function generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const centralOfficeCode = Math.floor(Math.random() * 900) + 100;
    const lineNumber = Math.floor(Math.random() * 10000);
    return `${areaCode}-${centralOfficeCode}-${lineNumber.toString().padStart(4, '0')}`;
}

// Function to display user data in the HTML
function displayUserData(userData) {
    const elements = ["username", "email", "firstName", "lastName", "lastLogin", "age", "phoneNumber"];

    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = userData[id];
        } else {
            console.warn(`Element with ID '${id}' not found.`);
        }
    });
}

// Function to delete all cookies
function deleteCookies() {
    document.cookie.split(';').forEach(cookie => {
        const [name] = cookie.split('=');
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    });
    console.log('All cookies deleted');
}

// Function to start dynamic data generation
function startDynamicGeneration() {
    if (dynamicGeneration) return;
    dynamicGeneration = true;

    generateUserData(); // Generate once immediately

    intervalId = setInterval(() => {
        if (dynamicGeneration) {
            generateUserData();
            setTimeout(readCookies, 10000); // Read cookies after 10 seconds
            setTimeout(() => {
                deleteCookies(); // Delete cookies before reloading
                location.reload(); // Reload page after 20 seconds
            }, 20000);
        }
    }, 20000);
}

// Function to stop dynamic data generation
function stopDynamicGeneration() {
    dynamicGeneration = false;
    clearInterval(intervalId);
}

// Attach functions to the global scope
window.startDynamicGeneration = startDynamicGeneration;
window.stopDynamicGeneration = stopDynamicGeneration;

// Run user data generation on page load
document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded. Generating user data...");
    generateUserData();
});

// Adobe Data Function
async function sendToAdobe(novaCrmId, firstName, lastName, email, phone, city, gender = null) {
    const url = "https://dcs.adobedc.net/collection/73fdb1443d451c866e0218c25c332b84f06ae5e55416f1a1b7da32ec606aa281?syncValidation=true";

    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

    const data = {
        "_id": uniqueId,
        "_capgeminiamerptrsd": { "novacrmId": novaCrmId },
        "person": {
            "name": { "firstName": firstName, "lastName": lastName },
            "gender": gender
        },
        "personalEmail": { "address": email },
        "mobilePhone": { "number": phone },
        "mailingAddress": { "city": city }
    };

    console.log("Sending data:", JSON.stringify(data, null, 2));

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "sandbox-name": "capgeminibelgium",
                "datasetId": "678b7184a9ddf22aee102b95",
                "flowId": "9d9743c5-27a7-4642-987e-0ce388756ab5",
                "imsOrgID": "9D6FC4045823262D0A495CC8@AdobeOrg",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error sending data:", error);
    }
}

// Run Adobe Data Submission
document.addEventListener("DOMContentLoaded", function () {
    sendToAdobe(username, firstName, lastName, email, phoneNumber, 'Brussels', 'male');
});

// Digital Data Object
window.digitalData = {
    "page": {
        "pageInfo": {
            "breadcrumbs": "nova:Home",
            "pageShortName": "nova:[...]:en",
            "pageName": "content:nova:Home",
            "destinationURL": "https://pcar660.github.io/nova.github.io/index.html",
            "isIframe": false,
            "contentIframe": false,
            "hierarchie1": "Nova:Home",
            "title": "Nova: A demo brand",
            "internalPageName": "en",
            "pageID": "nova:home",
            "tagging": "",
            "server": "pcar660.github.io",
            "urlShortcut": ""
        },
        "category": {
            "type": "conf:we-retail:settings:wcm:templates:hero-page",
            "version": "2023-8-3"
        },
        "attributes": {},
        "components": []
    },
    "user": [
        {
            "profile": [
                {
                    "profileInfo": {},
                    "attributes": {
                        "loggedIn": false,
                        "username": username,
                        "email": email,
                        "firstName": firstName,
                        "lastName": lastName,
                        "age": age,
                        "phoneNumber": phoneNumber,
                        "location": "Brussels",
                        "isSubscribed": true,
                        "lastLogin": lastLogin,
                        "novaWebEventID": Date.now().toString()
                    }
                }
            ]
        }
    ],
    "pageInstanceID": "nova:home",
    "language": "en"
};

window.digitalData.page.pageInfo.referringURL = document.referrer;
window.digitalData.page.pageInfo.sysEnv = navigator.userAgent;

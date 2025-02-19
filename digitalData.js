import { saveUserDataFirebase } from './firebaseFunctions.js';


// Generate User Data
var username, email, firstName, lastName, age, lastLogin, phoneNumber;
var dynamicGeneration = false;
 dynamicGeneration = localStorage.getItem('dynamicGeneration') === 'true'; // Retrieve from localStorage
var intervalId;



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
//alert("Generated User Data");
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
     const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

        // Try deleting with different path and domain combinations:
        document.cookie = name + "=; " + expires + "; path=/; domain=" + document.domain;
        document.cookie = name + "=; " + expires + "; path=/"; // Try without domain
        document.cookie = name + "=; " + expires + "; path=/; domain=." + document.domain;  //Try with dot before domain
        
        //Important: If the cookie was set with a specific path, you MUST use the same path to delete it:
        //Example: If it was set with path=/some/path, then delete it like this:
        //document.cookie = name + "=; " + expires + "; path=/some/path; domain=" + document.domain;

        console.log("Attempting to delete cookie:", name); // Log to see what's being deleted
    }
    console.log('All cookies deletion attempts finished.');
}

// Function to start dynamic data generation
function startDynamicGeneration() {
  dynamicGeneration = true;
    localStorage.setItem('dynamicGeneration', 'true'); // Store in localStorage
    //userDataGenerated = false; // Reset the flag for dynamic generation
    location.reload(); // Reload to start the interval
}

// Function to stop dynamic data generation
function stopDynamicGeneration() {
    dynamicGeneration = false;
    localStorage.setItem('dynamicGeneration', 'false'); // Store in localStorage
    clearInterval(intervalId);
    location.reload(); // Reload to stop the interval
}



// Attach functions to the global scope
window.startDynamicGeneration = startDynamicGeneration;
window.stopDynamicGeneration = stopDynamicGeneration;

// Run Adobe Data Submission
document.addEventListener("DOMContentLoaded", function () {
    saveUserDataFirebase(username, email, firstName, lastName, age, phoneNumber, Date.now());
});

// Send data to adobe profile: 

// Adobe Data Function
async function sendToAdobeProfileHTTPAPI(novaCrmId, firstName, lastName, email, phone, city, gender = null) {
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

    console.log("Sending data to adobe profile:", JSON.stringify(data, null, 2));

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



// Delete all cookie 
deleteCookies();

// call adobe profile
sendToAdobeProfileHTTPAPI(username, firstName, lastName, email, phoneNumber, 'Brussels', 'male');

// Call data gernration
generateUserData(); // Generate once immediately


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


// Set interval
if (dynamicGeneration){
intervalId = setInterval(() => {
        if (dynamicGeneration) {
           
            setTimeout(readCookies, 10000); // Read cookies after 10 seconds
            setTimeout(() => {
                deleteCookies(); // Delete cookies before reloading
                location.reload(); // Reload page after 20 seconds
            }, 20000);
        }
    }, 20000);
}


window.digitalData.page.pageInfo.referringURL = document.referrer;
window.digitalData.page.pageInfo.sysEnv = navigator.userAgent;

import { saveUserDataFirebase } from './firebaseFunctions.js';


// Generate User Data
var username, email, firstName, lastName, age, lastLogin, phoneNumber;
var dynamicGeneration = false;
let dynamicGeneration = localStorage.getItem('dynamicGeneration') === 'true'; // Retrieve from localStorage
var intervalId;



// Function to generate user data
function generateUserData(source) {
      alert(source + "--> myFunction() has been called!"); 
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
  dynamicGeneration = true;
    localStorage.setItem('dynamicGeneration', 'true'); // Store in localStorage
    //userDataGenerated = false; // Reset the flag for dynamic generation
    //location.reload(); // Reload to start the interval



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

/*
// Run user data generation on page load
document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded. Generating user data...");
    generateUserData("L3");
});

*/

/*
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
                "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3Mzg5Mzg4NDEzMjBfZjc1NjY5ZTEtY2JhYi00ZDUyLWFjMGMtNjAwNGExYzNlMzA2X3ZhNmMyIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImV4Y19hcHAiLCJ1c2VyX2lkIjoiNjRGMjI4OEY2M0M4QjY0ODBBNDk1QzlFQDY1ZmQyODg2NjNjOGI2MzY0OTVlNGYuZSIsInN0YXRlIjoie1wic2Vzc2lvblwiOlwiaHR0cHM6Ly9pbXMtbmExLmFkb2JlbG9naW4uY29tL2ltcy9zZXNzaW9uL3YxL00yRmtPV1F6Wm1VdFlUa3pZaTAwWkdKaUxUZzNaRGt0WkRJM00yRmtORE13WlRFMUxTMDJORVl5TWpnNFJqWXpRemhDTmpRNE1FRTBPVFZET1VWQU5qVm1aREk0T0RZMk0yTTRZall6TmpRNU5XVTBaaTVsXCJ9IiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiI5QzE3NTMwMDYyQkFGNTgxMEE0OTVDNTRAQWRvYmVJRCIsImN0cCI6MCwiZmciOiJaRjVRVlROVEZQUDVNSFVLRk1RVllIQUFUUT09PT09PSIsInNpZCI6IjE3MzM3MzQyNTE3OTFfYmVmNjcwOGYtZDNhMy00ZDU1LWI0NTctMzFkN2YzNGVlNWFjX3ZhNmMyIiwibW9pIjoiNDhmMjVhMjMiLCJwYmEiOiJNZWRTZWNOb0VWLExvd1NlYyIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWIubWFuYWdlLGFjY291bnRfY2x1c3Rlci5yZWFkLGFkZGl0aW9uYWxfaW5mbyxhZGRpdGlvbmFsX2luZm8uam9iX2Z1bmN0aW9uLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8ucm9sZXMsQWRvYmVJRCxhZG9iZWlvLmFwcHJlZ2lzdHJ5LnJlYWQsYWRvYmVpb19hcGksYXVkaWVuY2VtYW5hZ2VyX2FwaSxjcmVhdGl2ZV9jbG91ZCxtcHMsb3BlbmlkLG9yZy5yZWFkLHBwcy5yZWFkLHJlYWRfb3JnYW5pemF0aW9ucyxyZWFkX3BjLHJlYWRfcGMuYWNwLHJlYWRfcGMuZG1hX3RhcnRhbixzZXNzaW9uIiwiY3JlYXRlZF9hdCI6IjE3Mzg5Mzg4NDEzMjAifQ.PHvim3t4JhYYnMRhj4AFAJ31usY7Pv3enC91fSgnsaPDpgiAK7dLECifHzXEK9RHiTMGhq_iUzeUFVmZfiRweMXWHZDnDMcjysMJjBqhmeyIxI_TezTsxtXFtRumROuHzJ-fqkcmPEltoznWgl3WfkvD9Rk4EMpS90xomfdxt-5Coe1S6aGOOxWbmUq23nW55C9H2BJ39_7XbD3Lwa-1WbVeFAXfuw7epMQBXkMFTh26fS2sS_Yg8dd-aNeq43P7EKVWWnaevJwirtppNax6g7XnWo0uGsyC_JswbzW4fA2rmqGEVyLMo2JDxXJEt1wDC1hzMQ6UWWXQni8qjHcwIA" 
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
*/
// Run Adobe Data Submission
document.addEventListener("DOMContentLoaded", function () {
    //sendToAdobeProfileHTTPAPI(username, firstName, lastName, email, phoneNumber, 'Brussels', 'male');
    saveUserDataFirebase(username, email, firstName, lastName, age, phoneNumber, Date.now());
});

generateUserData("L2"); // Generate once immediately

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

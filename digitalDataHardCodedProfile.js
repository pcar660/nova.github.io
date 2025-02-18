const userDataFromCSV = [
    { address: "dwright@yopmail.com", novacrmid: "112ca06ed53d3db37e4cea49cc45b71e", firstname: "Danny", lastname: "Wright" },
    { address: "csmartman1@yopmail.com", novacrmid: "6cd0ab6bb9108c4796928eb57656a4ff", firstname: "Claudian", lastname: "Smartman" },
    { address: "xposselt2@yopmail.com", novacrmid: "bdf6eb4100666b129edbca1a86cf0129", firstname: "Xylia", lastname: "Posselt" },
    { address: "obryett3@yopmail.com", novacrmid: "ea44ebd4b5d934282576b951625a7db1", firstname: "Obie", lastname: "Bryett" },
    { address: "hvotier4@yopmail.com", novacrmid: "343d024a904dfbabdd121da98e64c374", firstname: "Henka", lastname: "Votier" },
    { address: "maitkenhead5@yopmail.com", novacrmid: "358b43da93765232189739e4f2edfa19", firstname: "Morris", lastname: "Aitkenhead" },
    { address: "hdevote6@yopmail.com", novacrmid: "4f0052eeadf66cbab0c86346064df71b", firstname: "Hermy", lastname: "Devote" },
    { address: "rgurrado7@yopmail.com", novacrmid: "1d1de82de292766821b0dc0f47349936", firstname: "Rudie", lastname: "Gurrado" },
    { address: "gcarruthers8@yopmail.com", novacrmid: "39fba7f2f233e3ce25d34eb964733d64", firstname: "Greer", lastname: "Carruthers" },
    { address: "kleynton9@yopmail.com", novacrmid: "48ee3ae6568586e16582ade132853507", firstname: "Kristel", lastname: "Leynton" },
    { address: "cblagbrougha@yopmail.com", novacrmid: "8h8w40a2dz5rnfny8iqizgi3o8pae35c", firstname: "Clem", lastname: "Blagbrough" },
    { address: "aconellyb@yopmail.com", novacrmid: "6w4xt42wzrvrklngia7zfeol19eyuozv", firstname: "Aguie", lastname: "Conelly" },
    { address: "djouhanc@yopmail.com", novacrmid: "2h9s2ja75ikibrwcmliubhylee5dfrd5", firstname: "Domenico", lastname: "Jouhan" },
    { address: "bwakelamd@yopmail.com", novacrmid: "lul10wsgu9cs8ccbtwgg86kipm3rt5ok", firstname: "Bary", lastname: "Wakelam" },
    { address: "ebluee@yopmail.com", novacrmid: "osqag3ctcx2omz46nyuq1a1qnr0k8igt", firstname: "Erick", lastname: "Blue" },
    { address: "ecarrierf@yopmail.com", novacrmid: "cvztu7981f63fzdryv35lv5orytr3nmg", firstname: "Emlynn", lastname: "Carrier" },
    { address: "eloftusg@yopmail.com", novacrmid: "4amcx0covasv4koiv4k9s65pvy1vq58g", firstname: "El", lastname: "Loftus" },
    { address: "sganifordh@yopmail.com", novacrmid: "iqloqeztrbsevbv104ehamendmp7z4v9", firstname: "Susy", lastname: "Ganiford" },
    { address: "rfiremani@yopmail.com", novacrmid: "q52sthl1omfmctooupg834kfu5xr4xr4", firstname: "Rhianna", lastname: "Fireman" },
    { address: "lshakeladej@yopmail.com", novacrmid: "olawta9hre049nhwd3j10x6li3pvkf4o", firstname: "Lurette", lastname: "Shakelade" }
  
];


import { saveUserDataFirebase } from './firebaseFunctions.js';


// Generate User Data
var username, email, firstName, lastName, age, lastLogin, phoneNumber;
var dynamicGeneration = false;
 dynamicGeneration = localStorage.getItem('dynamicGeneration') === 'true'; // Retrieve from localStorage
var intervalId;



// Function to generate user data from userDataFromCSV array
function generateUserData() {
    const randomUser = userDataFromCSV[Math.floor(Math.random() * userDataFromCSV.length)];
   
    username = randomUser.novacrmid;
    email = randomUser.address;
    firstName = randomUser.firstname;
    lastName = randomUser.lastname;
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

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"; // Clear for all paths
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + document.domain; // Clear for current domain and subdomains
    }
}

// Attach functions to the global scope
window.startDynamicGeneration = startDynamicGeneration;
window.stopDynamicGeneration = stopDynamicGeneration;

// Run Adobe Data Submission
document.addEventListener("DOMContentLoaded", function () {
    //sendToAdobeProfileHTTPAPI(username, firstName, lastName, email, phoneNumber, 'Brussels', 'male');
    saveUserDataFirebase(username, email, firstName, lastName, age, phoneNumber, Date.now());
});


// Delete all cookie 
deleteCookies();

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

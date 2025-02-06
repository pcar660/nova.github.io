// digitalData.js

// code of Genrate User data .js --------------------------------Start ----------------------------//


// generateUserData.js

var username, email, firstName, lastName, age, lastLogin, phoneNumber;
var dynamicGeneration = false; // Control variable set to true by default

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
    if (dynamicGeneration) return; // Prevent multiple intervals
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
    console.log("Page loaded. Waiting for user interaction.");
});








//---------------------------------End-------------------------..


// Profile data 

function sendToAdobe(novaCrmId, firstName, lastName, email, phone, city, gender = null) {
    const url = "https://dcs.adobedc.net/collection/73fdb1443d451c866e0218c25c332b84f06ae5e55416f1a1b7da32ec606aa281?syncValidation=true"; // Replace with actual connection ID if different

    // Generate a unique _id based on timestamp
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

    // Create JSON payload
    const data = {
        "_id": uniqueId, // Unique ID for each record
        "_capgeminiamerptrsd": {
            "novacrmId": novaCrmId
        },
        "person": {
            "name": {
                "firstName": firstName,
                "lastName": lastName
            },
            "gender": gender
        },
        "personalEmail": {
            "address": email
        },
        "mobilePhone": {
            "number": phone
        },
        "mailingAddress": {
            "city": city
        }
    };

    console.log("Sending data:", JSON.stringify(data, null, 2)); // Debugging: Log the request payload

    // Send data using Fetch API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "sandbox-name": "capgeminibelgium",
            "datasetId": "678b7184a9ddf22aee102b95",
            "flowId": "9d9743c5-27a7-4642-987e-0ce388756ab5",
            "imsOrgID": "9D6FC4045823262D0A495CC8@AdobeOrg",
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log("Success:", result))
    .catch(error => console.error("Error:", error));
}


//


// Run the generateUserData function to ensure user data is generated first
generateUserData();

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
  "product": [
    {
      "productInfo": {
        "sku": "ABC123",
        "title": "Durable Running Shoes",
        "category": "men"
      }
    }
  ],
  "cart": {
    "productsInCart": 2,
    "orderId": 675,
    "cartItems": [
      {
        "SKU": "abc123",
        "quantity": 1,
        "price": 19.99,
        "name": "Product Name A"
      },
      {
        "SKU": "XYZ",
        "quantity": 1,
        "price": 29.99,
        "name": "Product Name B"
      }
    ],
    "productInfo": {
      "purchase": [
        {
          "SKU": "abc123",
          "quantity": 1,
          "priceTotal": 19.99
        },
        {
          "SKU": "XYZ",
          "quantity": 1,
          "priceTotal": 29.99
        }
      ]
    }
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
            "novaWebEventID": Date.now().toString()  // Add the current timestamp here
          }
        }
      ]
    }
  ],
  "pageInstanceID": "nova:home",
  "language": "en"
};

sendToAdobe(username, firstName, lastName, email,phoneNumber, 'Brussesl', 'male');

window.digitalData.page.pageInfo.referringURL = document.referrer;
window.digitalData.page.pageInfo.sysEnv = navigator.userAgent;

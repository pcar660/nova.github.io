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

// Example usage:
//sendToAdobe('crmId20250202_2', 'crmId20250202_2John', 'Doe', 'crmId20250202_2.doe@yopmail.com', '+1234567890', 'New York', 'male');

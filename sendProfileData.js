function sendToAdobe(novaCrmId, firstName, lastName, email, phone, city, gender = null) {
    const url = "https://dcs.adobedc.net/collection/{CONNECTION_ID}?syncValidation=true"; // Replace with actual connection ID

    // Generate a unique _id based on timestamp
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

    // Create JSON payload
    const data = {
        "header": {
            "datasetId": "678b7184a9ddf22aee102b95",
            "flowId": "ad293e69-04eb-455b-845b-fe7b694c8395",
            "imsOrgID": "9D6FC4045823262D0A495CC8@AdobeOrg"
        },
        "body": {
            "xdmMeta": {
                "schemaRef": {
                    "id": "https://ns.adobe.com/{TENANT_ID}/schemas/{SCHEMA_ID}",
                    "contentType": "application/vnd.adobe.xed-full+json;version=1"
                }
            },
            "xdmEntity": {
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
            }
        }
    };

    console.log("Sending data:", JSON.stringify(data, null, 2)); // Debugging: Log the request payload

    // Send data using Fetch API
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log("Success:", result))
    .catch(error => console.error("Error:", error));
}

// Example usage: Call function with sample data
/*sendToAdobe(
    "23232a06ed53d3db37e4cea49cc45b71e789", // novaCrmId
    "Lanny", 
    "Lright", 
    "ppsfswright@yopmail.com.com", 
    "412-555-4555", 
    "Portland"
);*/

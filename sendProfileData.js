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
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3Mzg4NDcwMTM1NTRfOWNmZTlmYzUtMmQ1Yi00MTFiLTkzMDgtM2I2MDViNDA3NzcyX3ZhNmMyIiwidHlwZSI6ImFjY2Vzc190b2tlbiIsImNsaWVudF9pZCI6ImV4Y19hcHAiLCJ1c2VyX2lkIjoiNjRGMjI4OEY2M0M4QjY0ODBBNDk1QzlFQDY1ZmQyODg2NjNjOGI2MzY0OTVlNGYuZSIsInN0YXRlIjoie1wic2Vzc2lvblwiOlwiaHR0cHM6Ly9pbXMtbmExLmFkb2JlbG9naW4uY29tL2ltcy9zZXNzaW9uL3YxL1lqUTVZalEzTldJdE1UWXhZUzAwWVdRMkxUaGhaR010TVdObU1XTXdZalF3WXpJM0xTMDJORVl5TWpnNFJqWXpRemhDTmpRNE1FRTBPVFZET1VWQU5qVm1aREk0T0RZMk0yTTRZall6TmpRNU5XVTBaaTVsXCJ9IiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiI5QzE3NTMwMDYyQkFGNTgxMEE0OTVDNTRAQWRvYmVJRCIsImN0cCI6MCwiZmciOiJaRjJRN1ROVEZQUDVNSFVLRk1RVllIQUFUUT09PT09PSIsInNpZCI6IjE3MzM3MzQyNTE3OTFfYmVmNjcwOGYtZDNhMy00ZDU1LWI0NTctMzFkN2YzNGVlNWFjX3ZhNmMyIiwibW9pIjoiYzc0ODc1YTUiLCJwYmEiOiJNZWRTZWNOb0VWLExvd1NlYyIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWIubWFuYWdlLGFjY291bnRfY2x1c3Rlci5yZWFkLGFkZGl0aW9uYWxfaW5mbyxhZGRpdGlvbmFsX2luZm8uam9iX2Z1bmN0aW9uLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8ucm9sZXMsQWRvYmVJRCxhZG9iZWlvLmFwcHJlZ2lzdHJ5LnJlYWQsYWRvYmVpb19hcGksYXVkaWVuY2VtYW5hZ2VyX2FwaSxjcmVhdGl2ZV9jbG91ZCxtcHMsb3BlbmlkLG9yZy5yZWFkLHBwcy5yZWFkLHJlYWRfb3JnYW5pemF0aW9ucyxyZWFkX3BjLHJlYWRfcGMuYWNwLHJlYWRfcGMuZG1hX3RhcnRhbixzZXNzaW9uIiwiY3JlYXRlZF9hdCI6IjE3Mzg4NDcwMTM1NTQifQ.NjDaihllWPpy8a5qWFek_BUtlCcrCjOcwCNUY7dk1yn5nWoNAsxwl4-3bFXiQW5w1s7LzHZYH6SEKAkutlYEnmgZGKexc7rzV8UKhHpkOOFeYVGXKle98DMTevqD9hqMAKxAueWe8n5aMgMpsLQ-5WoZgKW4NidqKlYTpPVa1kb15AtW8T4l9vM3SWnf-9ZsNS2b8WTsfVAeRxI7023iSNaa9Q34CSVpkKukJPkylcxH3zuYYV5nhBgK4PcvuEKBF7eR8m31ZxLfNolecYfYjRL05K78I31-LbN0ork9TqMlGfqLLCobKywalvL1ZdHsD2vOwcGOLavYrr5qCKycjA",
            "x-adobe-flow-id": "9d9743c5-27a7-4642-987e-0ce388756ab5"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => console.log("Success:", result))
    .catch(error => console.error("Error:", error));
}

// Example usage:
//sendToAdobe('crmId20250202_2', 'crmId20250202_2John', 'Doe', 'crmId20250202_2.doe@yopmail.com', '+1234567890', 'New York', 'male');

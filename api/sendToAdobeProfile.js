// api/sendToAdobeProfile.js

export default async function handler(req, res) {
  // Make sure the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { novaCrmId, firstName, lastName, email, phone, city, gender, token } = req.body;

  // Validate incoming data
  if (!novaCrmId || !firstName || !lastName || !email || !phone || !city || !token) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Adobe profile API URL
  const url = 'https://dcs.adobedc.net/collection/73fdb1443d451c866e0218c25c332b84f06ae5e55416f1a1b7da32ec606aa281';

  // Create a unique ID for the user
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  const data = {
    "_id": uniqueId,
    "_capgeminiamerptrsd": { "novaCrmId": novaCrmId },
    "person": {
      "name": { "firstName": firstName, "lastName": lastName },
      "gender": gender || 'unknown'
    },
    "personalEmail": { "address": email },
    "mobilePhone": { "number": phone },
    "mailingAddress": { "city": city }
  };

  // Send data to Adobe Profile API
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "sandbox-name": "capgeminibelgium",
        "Authorization": `Bearer ${token}`,
        "x-adobe-flow-id": "9d9743c5-27a7-4642-987e-0ce388756ab5"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to send data to Adobe: ${response.status} ${await response.text()}`);
    }

    const result = await response.json();
    return res.status(200).json({ success: true, result });

  } catch (error) {
    console.error('Error sending data to Adobe:', error);
    return res.status(500).json({ error: 'Failed to send data to Adobe', details: error.message });
  }
}

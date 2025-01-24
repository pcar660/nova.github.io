// digitalData.js


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
            "location": "New York",
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

window.digitalData.page.pageInfo.referringURL = document.referrer;
window.digitalData.page.pageInfo.sysEnv = navigator.userAgent;

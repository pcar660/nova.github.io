
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js';
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";


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
//const database = getDatabase(app);

//  Function to Save Data
export function saveUserDataFirebase(username, email, firstName, lastName, age, phoneNumber, lastLogin) {
    const userId = Date.now().toString();//ref(database, 'users').push().key; // Create a unique ID for the user

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

          // Export the function


   


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
            creationDate: formatDateTime(),
            novaWebEventID: Date.now().toString()
        }
    };

    // Save the user data to Firebase
    set(ref(database, 'users/' + userId), userData)
        .then(() => console.log("✅ User data saved successfully!"))
        .catch(error => console.error("❌ Error saving user data:", error));
}

function formatDateTime() {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = date.getFullYear();
  let hh = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  const ampm = hh >= 12 ? 'PM' : 'AM';
  hh = hh % 12;
  hh = hh ? hh : 12; // the hour '0' should be '12'
  const formattedTime = `${String(hh).padStart(2, '0')}:${min}:${ss}${ampm}`;
  return `${dd}-${mm}-${yyyy} ${formattedTime}`;
}
          // Export the function


   

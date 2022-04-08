// Web app firebase config

var firebaseConfig = {
    apiKey: "AIzaSyBe4KUeThXbQqF7j_ld49HTjc_PtcpiIyc",
    authDomain: "comp1800-dtc10.firebaseapp.com",
    projectId: "comp1800-dtc10",
    storageBucket: "comp1800-dtc10.appspot.com",
    messagingSenderId: "428944433592",
    appId: "1:428944433592:web:e9bcb27a3c4f31a66f6f4d"
}

// Initialize Firebase app
// Initialize Firestore database if using it

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
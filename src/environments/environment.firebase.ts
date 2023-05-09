// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDaZqsdUgM2jIYqHpLwcTDwmL9vCSr1U20",
  authDomain: "projeto-dgsys.firebaseapp.com",
  databaseURL: "https://projeto-dgsys-default-rtdb.firebaseio.com",
  projectId: "projeto-dgsys",
  storageBucket: "projeto-dgsys.appspot.com",
  messagingSenderId: "596758628209",
  appId: "1:596758628209:web:218f0f221b9336e86cd8d0",
  measurementId: "G-7BGN3K52J5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
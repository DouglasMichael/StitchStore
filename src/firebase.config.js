// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy_47l5kVhYN2Ks4BVfZ-mzc9AKZ9pmA8",
  authDomain: "stitchstore-a2111.firebaseapp.com",
  projectId: "stitchstore-a2111",
  storageBucket: "stitchstore-a2111.appspot.com",
  messagingSenderId: "897956651700",
  appId: "1:897956651700:web:049afeb04f24f21d6b6de1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {    
    storage,
    app
  };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPV4Ab6FBu-5UCJiFbNXsAeGC0YdLXxDc",
  authDomain: "rhino4fun-91db0.firebaseapp.com",
  projectId: "rhino4fun-91db0",
  storageBucket: "rhino4fun-91db0.appspot.com",
  messagingSenderId: "1093431620967",
  appId: "1:1093431620967:web:e6742b436279bbf107ebc2",
  measurementId: "G-1C78KFH4GP"
};


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);

export { db };

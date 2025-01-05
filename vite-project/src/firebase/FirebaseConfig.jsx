import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDozodCKedTGs-W-a54GCYQuQHwu9dQA-o",
  authDomain: "myfirstapp-3f548.firebaseapp.com",
  projectId: "myfirstapp-3f548",
  storageBucket: "myfirstapp-3f548.firebasestorage.app",
  messagingSenderId: "1033275182418",
  appId: "1:1033275182418:web:3db01aaa00bf5e8ccd3e8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

const auth = getAuth(app);

export {fireDB , auth};
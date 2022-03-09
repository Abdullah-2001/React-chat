import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth , GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD2txMhe_Z9lL9g-wHg51-CfLUgCbSezjM",
    authDomain: "fir-chat-ab2d2.firebaseapp.com",
    databaseURL: "https://fir-chat-ab2d2-default-rtdb.firebaseio.com",
    projectId: "fir-chat-ab2d2",
    storageBucket: "fir-chat-ab2d2.appspot.com",
    messagingSenderId: "249386550972",
    appId: "1:249386550972:web:fc02d687589c07ec74f2b9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const fireStore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();  
export const storage = getStorage();
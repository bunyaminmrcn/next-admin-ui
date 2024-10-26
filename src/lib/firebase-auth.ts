import { initializeApp, getApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "test",
  authDomain: 'http://127.0.0.1:9099',
  databaseURL: "http://127.0.0.1:8080",
  projectId: "test",
};




const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth();

let initialized = false;
const initEmulator = () => {
  if (!initialized) {
    try {
      
      //connectAuthEmulator(firebaseAuth, 'http://127.0.0.1:9099')
      console.log("Connected to Emulator")
      initialized = true;
    } catch(err) {
      console.log("Error occured")
    }
    
  }
}


export { firebaseApp, firebaseAuth, initEmulator }


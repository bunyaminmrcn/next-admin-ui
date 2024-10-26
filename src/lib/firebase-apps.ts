import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
import { firebaseApp, initEmulator } from './firebase-auth';

const db = getFirestore(firebaseApp);
const functions = getFunctions(firebaseApp);

let initForAuthorizedApps = false;
const initAuthorizedAppsEmulator = () => {
    return new Promise((res, rej) => {
        if (!initForAuthorizedApps) {
            try {
                initEmulator();
                //connectFirestoreEmulator(db, '127.0.0.1', 8080)
                //connectFunctionsEmulator(functions, "127.0.0.1", 5001)
                console.log("Connected to Apps")
                initForAuthorizedApps = true;
            } catch (error) {
                console.log("Error Occured")
            }
    
    
        }
    })
    
}


export { initAuthorizedAppsEmulator, db, functions }
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    onAuthStateChanged,
    User
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKiXDHFGkgmGXco1co94CIj0XOd8Mus0o",
  authDomain: "yt-clone-88b23.firebaseapp.com",
  projectId: "yt-clone-88b23",
  appId: "1:314722351841:web:dee3884dee2d43e15595a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

/**
 * Signs the user in with a google popup.
 * @returns a promise that resolves when the user is signed in
 */

export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

/**
 * Signs the user out.
 * @returns - a promise that resolves when the user is signed out
 */

export function signOut() {
    return auth.signOut();
}

/**
 * 
 * @param callback 
 * @returns 
 */
export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}
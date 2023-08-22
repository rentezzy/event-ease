import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const FirebaseContext = createContext({ firebase, analytics, auth, firestore });
export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseContext.Provider value={{ firebase, analytics, auth, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
}
export default FirebaseContext;

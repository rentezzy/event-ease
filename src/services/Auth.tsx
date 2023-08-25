import {
  GoogleAuthProvider,
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseFormSetError } from "react-hook-form";
import FirebaseContext from "./Firebase";
import { SignInInputs } from "../ui/SignInModal";

export type TAuth = {
  user: User | null;
  initializing: boolean;
  signInEmailPassword: (
    newUser: {
      email: string;
      password: string;
    },
    onError?: UseFormSetError<SignInInputs>,
    onSuccess?: (user?: UserCredential) => void
  ) => Promise<void>;
  signInGooglePopUp: (
    onSuccess?: (user?: UserCredential) => void
  ) => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<TAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth, firestore } = useContext(FirebaseContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const authChanged = useCallback(
    (firebaseUser: User | null) => {
      if (!firebaseUser) return;
      setUser(firebaseUser);
      const docRef = doc(firestore, "users", firebaseUser.uid);
      getDoc(docRef).then((data) => {
        if (data.exists()) return;
        setDoc(docRef, {
          avatar: firebaseUser.photoURL || "",
          displayName: firebaseUser.displayName || "",
          contacts: { friends: { name: "Friends", users: [] } },
        });
      });
      setInitializing(false);
    },
    [firestore]
  );

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, authChanged);
    return subscriber;
  }, [auth, authChanged]);

  const signInEmailPassword = async (
    newUser: {
      email: string;
      password: string;
    },
    onError?: UseFormSetError<SignInInputs>,
    onSuccess?: (user?: UserCredential) => void
  ) => {
    setInitializing(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );
      if (res.user && onSuccess) return onSuccess(res);
    } catch (_error: unknown) {
      if (onError) onError("root", { message: "Wrong email or password" });
    }
  };
  const signInGooglePopUp = async (
    onSuccess?: (user?: UserCredential) => void
  ) => {
    setInitializing(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user && onSuccess) return onSuccess(res);
    } catch (error) {
      return;
    }
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        signInEmailPassword,
        signInGooglePopUp,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

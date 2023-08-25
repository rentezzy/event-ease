import { DocumentSnapshot, doc, getDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import FirebaseContext from "../../services/Firebase";
import { TUser } from "../../types/user";

const defaultUser = {
  avatar: "",
  displayName: "User",
  contacts: {
    friends: { name: "Friends" as const, users: [] },
  },
};

export const useGetUser = (uid: string, hotUpdate = false) => {
  const { firestore } = useContext(FirebaseContext);
  const [user, setUser] = useState<TUser>(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const q = useMemo(() => doc(firestore, "users", uid), [firestore, uid]);

  const then = useCallback((data: DocumentSnapshot) => {
    let items: TUser = defaultUser;

    items = data.data() as TUser;
    if (!items.avatar) items.avatar = "";
    if (!items.displayName) items.displayName = "User";

    setIsLoading(false);
    setUser(items);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (hotUpdate) {
      const unsubscribe = onSnapshot(q, then);
      return unsubscribe;
    } else {
      const userDoc = getDoc(q);
      userDoc.then(then);
    }
  }, [firestore, q, uid, hotUpdate, then]);

  return { user, isLoading };
};

// FOR DEVELOPING:
// setIsLoading(true);
// setUser({
//   avatar: "",
//   displayName: "User",
//   contacts: {
//     friends: {
//       name: "Friends",
//       users: [
//         "CHasfP6kYNVNILCCaP6DL3xbY303",
//         "AH0iSKgpPncGUjncU1NNsmvigh63",
//       ],
//     },
//     "a-90ishd-98ashd-9ashdkl": {
//       name: "Family",
//       users: [
//         "CHasfP6kYNVNILCCaP6DL3xbY303",
//         "AH0iSKgpPncGUjncU1NNsmvigh63",
//       ],
//     },
//   },
// });
// setIsLoading(false);

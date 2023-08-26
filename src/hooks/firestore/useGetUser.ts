import {
  DocumentData,
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import FirebaseContext from "../../services/Firebase";
import { TUser } from "../../types/user";
import { assignTypes } from "../../utils/typeAssign";
import { useAuth } from "../firebase/useAuth";
import { useDebounce } from "../useDebounce";

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
export const useGetUsersByName = (name: string) => {
  const nameDebounced = useDebounce(name, 300);
  const [users, setUsers] = useState<{ uid: string; displayName: string }[]>(
    []
  );
  const auth = useAuth();
  const { firestore } = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(false);
  const q = useMemo(
    () =>
      query(
        collection(firestore, "users").withConverter(assignTypes<TUser>()),
        where("displayName", ">=", nameDebounced),
        where("displayName", "<=", nameDebounced + "\uf8ff")
      ),
    [firestore, nameDebounced]
  );
  useEffect(() => {
    setIsLoading(true);
    getDocs<TUser, DocumentData>(q).then((data) => {
      const items: { uid: string; displayName: string }[] = [];
      data.forEach((user) => {
        if (user.id === auth!.user!.uid) return;
        items.push({
          displayName: user.data().displayName,
          uid: user.id,
        });
      });
      setUsers(items);
      setIsLoading(false);
    });
  }, [q, auth]);
  return { users, isLoading };
};

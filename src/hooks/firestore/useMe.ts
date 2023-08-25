import {
  DocumentReference,
  Firestore,
  doc,
  runTransaction,
} from "firebase/firestore";
import { useContext, useMemo } from "react";
import { useGetUser } from "./useGetUser";
import FirebaseContext from "../../services/Firebase";
import { useAuth } from "../firebase/useAuth";

export const useMeContacts = () => {
  const auth = useAuth();
  const { user, isLoading } = useGetUser(auth!.user!.uid, true);

  return { contacts: user.contacts, isLoading };
};
export const useMeHelpers = () => {
  const auth = useAuth();
  const { firestore } = useContext(FirebaseContext);
  const docRef = useMemo(
    () => doc(firestore, "users", auth!.user!.uid),
    [firestore, auth]
  );

  const addContact = useMemo(
    () =>
      contactHelper(
        (contacts: string[], uid: string) => [...contacts, uid],
        docRef,
        firestore
      ),
    [firestore, docRef]
  );

  const removeContact = useMemo(
    () =>
      contactHelper(
        (contacts: string[], uid: string) =>
          contacts.filter((user) => user !== uid),
        docRef,
        firestore
      ),
    [firestore, docRef]
  );
  return { addContact, removeContact };
};

const contactHelper =
  (
    cb: (a: string[], uid: string) => string[],
    docRef: DocumentReference,
    firestore: Firestore
  ) =>
  (uid: string, group: string) => {
    runTransaction(firestore, async (transaction) => {
      const document = await transaction.get(docRef);
      if (
        !document.data() ||
        !document.data()!.contacts[group] ||
        !document.data()!.contacts[group].users
      )
        return;
      const contacts = cb(document.data()!.contacts[group].users, uid);
      transaction.update(docRef, {
        contacts: {
          ...document.data()!.contacts,
          [group]: {
            name: document.data()!.contacts[group].name,
            users: contacts,
          },
        },
      });
    });
  };

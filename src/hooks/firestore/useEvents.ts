import dayjs, { Dayjs } from "dayjs";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import FirebaseContext from "../../services/Firebase";
import { TCreateEvent, TEvent } from "../../types/event";
import { useAuth } from "../firebase/useAuth";

export const useGetEventsByDay = (uid: string, day: Dayjs) => {
  const { firestore } = useContext(FirebaseContext);
  const [data, setData] = useState<TEvent[]>();
  const [isLoading, setIsLoading] = useState(false);
  const q = useMemo(
    () =>
      query(
        collection(firestore, "eventease-events"),
        where("startAtDay", "==", day.format("DD/MM/YYYY")),
        where("accepted", "array-contains", uid)
      ),
    [firestore, day, uid]
  );

  useEffect(() => {
    setIsLoading(true);
    const docs = getDocs(q);
    docs.then((data) => {
      const items: TEvent[] = [];
      data.forEach((doc) => {
        items.push({ ...doc.data(), eid: doc.id } as TEvent);
      });
      setIsLoading(false);
      setData(items);
    });
  }, [firestore, q]);
  return { data, isLoading };
};
export const useCreateEvent = () => {
  const { firestore } = useContext(FirebaseContext);
  const auth = useAuth();
  const createEvent = useCallback(
    (eventData: TCreateEvent) => {
      const event = {
        ...eventData,
        accepted: [],
        declined: [],
        createdAt: serverTimestamp(),
        createdBy: auth!.user!.uid,
        startAt: dayjs(eventData.startAt).toISOString(),
        startAtDay: dayjs(eventData.startAt).format("DD/MM/YYYY"),
        endAt: dayjs(eventData.endAt).toISOString(),
      };
      addDoc(collection(firestore, "eventease-events"), event);
    },
    [firestore, auth]
  );
  return createEvent;
};
export const useGetMyEvents = () => {
  const { firestore } = useContext(FirebaseContext);
  const [events, setEvents] = useState<TEvent[]>([]);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const q = useMemo(
    () =>
      query(
        collection(firestore, "eventease-events"),
        where("createdBy", "==", auth!.user!.uid)
      ),
    [firestore, auth]
  );
  useEffect(() => {
    setIsLoading(true);
    const docs = getDocs(q);
    docs.then((data) => {
      const items: TEvent[] = [];
      data.forEach((doc) => {
        items.push({ ...doc.data(), eid: doc.id } as TEvent);
      });
      setIsLoading(false);
      setEvents(items);
    });
  }, [firestore, q]);
  return { events, isLoading };
};
export const useGetEventsInvitations = () => {
  const { firestore } = useContext(FirebaseContext);
  const [invitations, setInvitations] = useState<TEvent[]>([]);
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const q = useMemo(
    () =>
      query(
        collection(firestore, "eventease-events"),
        where("invited", "array-contains", auth!.user!.uid)
      ),
    [firestore, auth]
  );
  const acceptInvite = (eid: string) =>
    runTransaction(firestore, async (transaction) => {
      console.log(1);
      console.log(eid);
      const docRef = doc(firestore, "eventease-events", eid);
      const document = await transaction.get(docRef);
      if (!document.exists()) return;
      const data = document.data();
      if (
        data.accepted.includes(auth!.user!.uid) ||
        data.declined.includes(auth!.user!.uid)
      )
        return;
      const invited = data.invited.filter(
        (uid: string) => uid !== auth!.user!.uid
      );
      const accepted = [...data.accepted, auth!.user!.uid];
      transaction.update(docRef, { invited, accepted });
    });
  const declineInvite = (eid: string) =>
    runTransaction(firestore, async (transaction) => {
      const docRef = doc(firestore, "eventease-events", eid);
      const document = await transaction.get(docRef);
      if (!document.exists()) return;
      const data = document.data();
      if (
        data.accepted.includes(auth!.user!.uid) ||
        data.declined.includes(auth!.user!.uid)
      )
        return;
      const invited = data.invited.filter(
        (uid: string) => uid !== auth!.user!.uid
      );
      const declined = [...data.declined, auth!.user!.uid];
      transaction.update(docRef, { invited, declined });
    });
  useEffect(() => {
    setIsLoading(true);
    const docs = onSnapshot(q, (data) => {
      const items: TEvent[] = [];
      data.forEach((doc) => {
        items.push({ ...doc.data(), eid: doc.id } as TEvent);
      });
      setIsLoading(false);
      setInvitations(items);
    });
    return docs;
  }, [firestore, q]);
  return { invitations, isLoading, acceptInvite, declineInvite };
};

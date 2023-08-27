import dayjs, { Dayjs } from "dayjs";
import {
  addDoc,
  collection,
  getDocs,
  query,
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
        where("invited", "array-contains", uid)
      ),
    [firestore, day, uid]
  );

  useEffect(() => {
    setIsLoading(true);
    const docs = getDocs(q);
    docs.then((data) => {
      const items: TEvent[] = [];
      data.forEach((doc) => {
        items.push(doc.data() as TEvent);
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

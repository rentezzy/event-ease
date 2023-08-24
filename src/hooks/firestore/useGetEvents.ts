import { Dayjs } from "dayjs";
import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import FirebaseContext from "../../services/Firebase";

export const useGetEventsByDay = (uid: string, day: Dayjs) => {
  const { firestore } = useContext(FirebaseContext);
  const [data, setData] = useState<DocumentData[]>([]);
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
  function add() {
    const docRef = addDoc(collection(firestore, "eventease-events"), {
      title: "Alex birthday!1",
      description: "An party for our Alex",
      invitationText: "Hi, i want to invite you to our party",
      createdAt: serverTimestamp(),
      startAtDay: day.format("DD/MM/YYYY"),
      startAt: day.toISOString(),
      endAt: day.add(2, "hour").toISOString(),
      theme: "default",
      invited: [uid],
    });
  }

  useEffect(() => {
    // const collectionRef = collection(firestore, "eventease-events");
    // const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    //   setIsLoading(true);
    //   const items: DocumentData[] = [];
    //   querySnapshot.forEach((doc) => items.push(doc.data()));
    //   setData(items);
    //   setIsLoading(false);
    // });
    // return unsubscribe;
    // setIsLoading(true);
    // const querySnapshot = getDocs(q);
    // querySnapshot.then((data) => {
    //   const items: DocumentData[] = [];
    //   data.forEach((doc) => {
    //     items.push(doc.data());
    //   });
    //   setIsLoading(false);
    //   setData(items);
    // });
    setData([
      {
        invitationText: "Hi, i want to invite you to our party",
        endAt: "2023-08-24T11:48:59.843Z",
        startAtDay: "24/08/2023",
        startAt: "2023-08-24T09:48:59.843Z",
        title: "Alex birthday!1",
        createdAt: {
          seconds: 1692870583,
          nanoseconds: 756000000,
        },
        description: "An party for our Alex",
        theme: "default",
        invited: ["P8l1ZIWQUUdBT5qxsAhS7VGGsZY2"],
      },
    ]);
  }, [firestore, q]);
  return { add, data, isLoading };
};

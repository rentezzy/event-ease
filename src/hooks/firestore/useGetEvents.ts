import { Dayjs } from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import FirebaseContext from "../../services/Firebase";
import { TEvent } from "../../types/event";

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
    const querySnapshot = getDocs(q);
    querySnapshot.then((data) => {
      const items: TEvent[] = [];
      data.forEach((doc) => {
        items.push(doc.data() as TEvent);
      });
      setIsLoading(false);
      setData(items);
    });
    //
    // FOR DEVELOPING:
    // setIsLoading(true);
    // setData([
    //   {
    //     invitationText: "Hi, i want to invite you to our party",
    //     endAt: "2023-08-24T11:48:59.843Z",
    //     startAtDay: "24/08/2023",
    //     startAt: "2023-08-24T09:48:59.843Z",
    //     title: "Alex birthday!1",
    //     createdAt: {
    //       seconds: 1692870583,
    //       nanoseconds: 756000000,
    //     },
    //     description: "An party for our Alex",
    //     theme: "default",
    //     invited: ["P8l1ZIWQUUdBT5qxsAhS7VGGsZY2"],
    //   },
    // ]);
    // setIsLoading(false);
  }, [firestore, q]);
  return { data, isLoading };
};

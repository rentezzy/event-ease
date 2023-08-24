import { Container, Button } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useGetEventsByDay } from "../../hooks/firestore/useGetEvents";
import { useAuth } from "../../hooks/firebase/useAuth";

function Day(props: PickersDayProps<Dayjs>) {
  const { day, ...other } = props;
  return (
    <PickersDay
      {...other}
      day={day}
      sx={{ width: "50px", height: "50px", borderRadius: "20px" }}
    />
  );
}

export const Calendar = () => {
  const auth = useAuth();
  const [value, setValue] = useState<Dayjs>(dayjs(Date.now()));
  const { add, data } = useGetEventsByDay(auth!.user!.uid, value);
  if (!auth || !auth.user) return null;
  console.log(data);
  return (
    <Container>
      <div
        style={{
          background: "#f6f6f6",
          borderRadius: "20px",
          boxShadow: "0px 0px 55px -10px rgba(0,0,0,0.25)",
          border: "1px solid #fe7f2d",
          marginTop: "50px",
        }}
      >
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue || dayjs(Date.now()))}
          showDaysOutsideCurrentMonth
          slots={{ day: Day }}
        />
      </div>
      <Button onClick={add}>asd</Button>
    </Container>
  );
};

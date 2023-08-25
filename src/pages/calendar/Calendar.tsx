import { CircularProgress, Container, Stack, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { EventCard } from "../../components/EventCard";
import { useAuth } from "../../hooks/firebase/useAuth";
import { useGetEventsByDay } from "../../hooks/firestore/useGetEvents";

function Day(props: PickersDayProps<Dayjs>) {
  const { day, ...other } = props;
  return (
    <PickersDay
      {...other}
      day={day}
      sx={{ width: "50px", height: "50px", borderRadius: "10px" }}
    />
  );
}

export const Calendar = () => {
  const auth = useAuth();
  const [value, setValue] = useState<Dayjs>(dayjs(Date.now()));
  const { data, isLoading } = useGetEventsByDay(auth!.user!.uid, value);
  if (!auth || !auth.user) return null;
  return (
    <Container>
      <Stack gap="50px">
        <div
          style={{
            background: "#f6f6f6",
            borderRadius: "10px",
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
        <Typography
          variant="h2"
          sx={{ bgcolor: "primary.main", padding: "20px" }}
        >
          Selected date: {value.format("MMMM D, YYYY")}.
        </Typography>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : data && data.length ? (
          <Stack gap="20px">
            {data.map((event) => (
              <EventCard key={event.createdAt.seconds} event={event} />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2">No events for that day.</Typography>
        )}
      </Stack>
    </Container>
  );
};

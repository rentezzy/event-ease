import { Container, Stack, Typography } from "@mui/material";
import { EventCardOwner } from "../../components/EventCard";
import { useGetMyEvents } from "../../hooks/firestore/useEvents";

export const MyEvents = () => {
  const { events } = useGetMyEvents();
  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#fe7f2d",
          marginBottom: "20px",
        }}
      >
        <Container sx={{ padding: "20px" }}>
          <Typography variant="h2">Your events!</Typography>
        </Container>
      </div>
      <Container>
        <Stack gap="20px">
          {events.map((event) => (
            <EventCardOwner key={event.createdAt.seconds} event={event} />
          ))}
        </Stack>
      </Container>
    </div>
  );
};

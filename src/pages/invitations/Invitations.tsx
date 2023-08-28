import { Container, Stack, Typography } from "@mui/material";
import { EventCardInvitation } from "../../components/EventCard";
import { useGetEventsInvitations } from "../../hooks/firestore/useEvents";

export const Invitations = () => {
  const { invitations, acceptInvite, declineInvite } =
    useGetEventsInvitations();
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
          <Typography variant="h2">Your invitations for events!</Typography>
        </Container>
      </div>
      <Container>
        <Stack gap="20px">
          {invitations.length < 1 && (
            <Typography variant="body2">
              So far no one has invited you. :(
            </Typography>
          )}
          {invitations.map((invite) => (
            <EventCardInvitation
              key={invite.eid}
              event={invite}
              acceptInvite={acceptInvite}
              declineInvite={declineInvite}
            />
          ))}
        </Stack>
      </Container>
    </div>
  );
};

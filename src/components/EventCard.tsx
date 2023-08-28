import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import dayjs from "dayjs";
import { eventTheme } from "../services/theme";
import { TEvent } from "../types/event";
import { UserNameAndAvatar } from "../ui/User";

export const EventCard = ({ event }: { event: TEvent }) => {
  const startTime = dayjs(event.startAt).format("HH:MM");
  const endTime = dayjs(event.endAt).format("HH:MM");
  return (
    <Accordion
      disableGutters={true}
      sx={{
        background: eventTheme[event.theme].background,
        border: `1px solid ${eventTheme[event.theme].primary}`,
        padding: "20px",
      }}
      elevation={5}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container padding="0 20px 0 0" alignItems="center">
          <Grid item xs>
            <Typography variant="body2" fontSize="26px">
              {event.title}
            </Typography>
          </Grid>
          <Grid item>
            <Stack gap="5px">
              <Typography>From: {startTime}</Typography>
              <Typography>To: {endTime}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingBottom: "5px" }}>
        <Divider />
        <Typography marginTop="20px" variant="subtitle1">
          {event.description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export const EventCardOwner = ({ event }: { event: TEvent }) => {
  const startTime = dayjs(event.startAt).format("MMM, DD. HH:MM");
  const endTime = dayjs(event.endAt).format("MMM, DD. HH:MM");
  return (
    <Accordion
      disableGutters={true}
      sx={{
        background: eventTheme[event.theme].background,
        border: `1px solid ${eventTheme[event.theme].primary}`,
        padding: "20px",
      }}
      elevation={3}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container padding="0 20px 0 0" alignItems="center">
          <Grid item xs>
            <Typography variant="body2" fontSize="26px">
              {event.title}
            </Typography>
          </Grid>
          <Grid item>
            <Stack gap="5px">
              <Typography>{startTime}</Typography>
              <Typography>{endTime}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingBottom: "5px" }}>
        <Divider />
        <Stack gap="20px">
          <Typography marginTop="20px" variant="subtitle1">
            {event.description}
          </Typography>
          <Accordion
            variant="outlined"
            disableGutters={true}
            sx={{
              background: eventTheme[event.theme].background,
              border: "none",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">Invitations:</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0px 40px" }}>
              <List>
                <Typography variant="body2" fontSize="20px">
                  Accepted the invitation:
                </Typography>
                {event.accepted.length < 1 && <NoOneHere />}
                {event.accepted.map((user) => (
                  <ListItem key={user}>
                    <UserNameAndAvatar uid={user} />
                  </ListItem>
                ))}
                <Typography variant="body2" fontSize="20px">
                  Haven't answered yet:
                </Typography>
                {event.invited.length < 1 && <NoOneHere />}
                {event.invited.map((user) => (
                  <ListItem key={user}>
                    <UserNameAndAvatar uid={user} />
                  </ListItem>
                ))}
                <Typography variant="body2" fontSize="20px">
                  Declined the invitation:
                </Typography>
                {event.declined.length < 1 && <NoOneHere />}
                {event.declined.map((user) => (
                  <ListItem key={user}>
                    <UserNameAndAvatar uid={user} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export const EventCardInvitation = ({
  event,
  acceptInvite,
  declineInvite,
}: {
  event: TEvent;
  acceptInvite: (eid: string) => void;
  declineInvite: (eid: string) => void;
}) => {
  const startTime = dayjs(event.startAt).format("MMM, DD. HH:MM");
  const endTime = dayjs(event.endAt).format("MMM, DD. HH:MM");
  return (
    <div
      style={{
        width: "100%",
        background: eventTheme[event.theme].background,
        border: `1px solid ${eventTheme[event.theme].primary}`,
        padding: "20px",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid>
          <Typography variant="body2">{event.title}</Typography>
          <Typography variant="subtitle2">{event.description}</Typography>
        </Grid>
        <Grid>
          <Typography variant="subtitle2">{startTime}</Typography>
          <Typography variant="subtitle2">{endTime}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ margin: "10px 0" }} />
      <Typography variant="subtitle1">{event.invitationText}</Typography>
      <Grid container justifyContent="end">
        <IconButton onClick={() => acceptInvite(event.eid)}>
          <DoneIcon color="success" />
        </IconButton>
        <IconButton onClick={() => declineInvite(event.eid)}>
          <CloseIcon color="error" />
        </IconButton>
      </Grid>
    </div>
  );
};

const NoOneHere = () => (
  <ListItem>
    <Typography variant="subtitle2" fontSize="16px">
      No one here yet.
    </Typography>
  </ListItem>
);

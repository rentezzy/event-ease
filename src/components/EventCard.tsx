import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { eventTheme } from "../services/theme";
import { TEvent } from "../types/event";

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

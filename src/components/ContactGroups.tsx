import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";

import { UserCard } from "./UserCard";
import { TContactGroup, TContacts } from "../types/user";

export const ContactGroups = ({
  contacts,
  isEditing,
}: {
  contacts: TContacts;
  isEditing: boolean;
}) => {
  const cards: JSX.Element[] = [];
  for (const key in contacts) {
    cards.push(
      <ContactCard
        key={key}
        contact={contacts[key]}
        cid={key}
        isEditing={isEditing}
      />
    );
  }
  return (
    <div>
      <Stack gap="10px">{...cards}</Stack>
    </div>
  );
};
const ContactCard = ({
  contact,
  isEditing,
  cid,
}: {
  contact: TContactGroup;
  cid: string;
  isEditing: boolean;
}) => {
  return (
    <Accordion
      square={true}
      disableGutters={true}
      variant="outlined"
      sx={{
        border: "none",
        ":before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          border: "none",
          borderBottom: "1px solid black",
          borderRadius: "0px",
        }}
      >
        <Typography variant="body2" fontSize="24px">
          {contact.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          marginLeft: "40px",
          border: "none",
        }}
      >
        <Stack gap="10px">
          {contact.users.map((user) => (
            <UserCard uid={user} key={user} isEditing={isEditing} group={cid} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

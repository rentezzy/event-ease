import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ContactGroups } from "../../components/ContactGroups";
import { useMeContacts } from "../../hooks/firestore/useMe";
import { ContactsModal } from "../../ui/ContactsModal";

export const Contacts = () => {
  const { contacts } = useMeContacts();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  return (
    <>
      <Container>
        <Grid container alignItems="center">
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography variant="subtitle1" padding="10px 15px">
                  Group name
                </Typography>
              </Grid>
              <Grid item>
                <Divider
                  sx={{ bgcolor: "primary.main" }}
                  orientation="vertical"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs></Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <Divider
                  sx={{ bgcolor: "primary.main" }}
                  orientation="vertical"
                />
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setIsEditing((prev) => !prev)}
                  sx={{ height: "50px", width: "50px" }}
                >
                  {isEditing ? (
                    <CheckBoxIcon color="success" />
                  ) : (
                    <EditIcon color="warning" />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => setIsOpened(true)}
                  sx={{ height: "50px", width: "50px" }}
                >
                  <AddIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ bgcolor: "primary.main" }} />
      <ContactsModal
        contacts={contacts}
        isOpened={isOpened}
        handleClose={() => setIsOpened(false)}
      />
      <Container>
        <ContactGroups contacts={contacts} isEditing={isEditing} />
      </Container>
    </>
  );
};

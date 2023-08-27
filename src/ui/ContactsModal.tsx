import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { useGetUsersByName } from "../hooks/firestore/useGetUser";
import { useMeHelpers } from "../hooks/firestore/useMe";
import { TContacts } from "../types/user";

export const ContactsModal = ({
  isOpened,
  handleClose,
  contacts,
}: {
  isOpened: boolean;
  handleClose: () => void;
  contacts: TContacts;
}) => {
  const [contactsItems, setContactsItems] = useState<
    { id: string; name: string }[]
  >([]);
  const [search, setSearch] = useState("");
  const [checkedUser, setCheckedUser] = useState<string[]>([]);
  const [groups, setGroups] = useState<string[]>(["friends"]);
  const { users } = useGetUsersByName(search);
  const { addContact } = useMeHelpers();
  useEffect(() => {
    const items = [];
    for (const key in contacts) {
      items.push({ id: key, name: contacts[key].name });
    }
    setContactsItems(items);
  }, [contacts]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setGroups(typeof value === "string" ? value.split(",") : value);
  };
  const handleAdd = () => {
    for (const user of checkedUser) {
      for (const group of groups) addContact(user, group);
    }
    setSearch("");
    setCheckedUser([]);
    setGroups(["friends"]);
  };
  return (
    <Dialog fullWidth open={isOpened} onClose={handleClose}>
      <DialogContent sx={{ padding: "10px" }}>
        <Stack gap="20px">
          <Typography variant="h2">Add contacts</Typography>
          <TextField
            fullWidth
            variant="standard"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
          <CheckboxList
            users={users}
            checkedUser={checkedUser}
            setCheckedUser={setCheckedUser}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Grid container alignItems="center">
          <Grid item xs>
            <Select
              multiple
              value={groups}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={contacts[value].name} />
                  ))}
                </Box>
              )}
              fullWidth
              size="small"
            >
              {contactsItems.map(
                (contact) =>
                  contact.id !== "friends" && (
                    <MenuItem key={contact.id} value={contact.id}>
                      {contact.name}
                    </MenuItem>
                  )
              )}
            </Select>
          </Grid>
          <Grid item>
            <Button onClick={handleAdd}>
              <AddIcon />
              Add
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
function CheckboxList({
  checkedUser,
  setCheckedUser,
  users,
}: {
  checkedUser: string[];
  setCheckedUser: React.Dispatch<React.SetStateAction<string[]>>;
  users: { uid: string; displayName: string }[];
}) {
  const handleToggle = (value: string) => () => {
    const currentIndex = checkedUser.indexOf(value);
    const newChecked = [...checkedUser];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedUser(newChecked);
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: 300,
        overflow: "auto",
      }}
    >
      {users.map((user) => {
        return (
          <ListItem key={user.uid} disablePadding>
            <ListItemButton
              onClick={handleToggle(user.uid)}
              dense
              sx={{ width: "20px" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checkedUser.indexOf(user.uid) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText>
                <Typography>{user.displayName}</Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

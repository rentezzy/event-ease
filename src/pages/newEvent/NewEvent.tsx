import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Controller, DefaultValues, useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateEvent } from "../../hooks/firestore/useEvents";
import { useMeContacts } from "../../hooks/firestore/useMe";
import { eventTheme } from "../../services/theme";
import { TCreateEvent } from "../../types/event";
import { UserNameAndAvatar, UserNameAndAvatarChip } from "../../ui/User";
const defaultValues: DefaultValues<TCreateEvent> = {
  startAt: dayjs(Date.now()),
  endAt: dayjs(Date.now()).add(2, "h"),
  theme: "default",
  invited: [],
};
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
    },
  },
};
const schema = yup.object().shape({
  invitationText: yup
    .string()
    .min(10, "Min length - 10 symbols")
    .required("Invitation text is required"),
  title: yup
    .string()
    .min(5, "Min length - 5 symbols")
    .required("Title is required"),
  description: yup
    .string()
    .min(10, "Min length - 10 symbols")
    .required("Description is required"),
});
const selectTheme: React.ReactNode[] = [];
for (const key in eventTheme) {
  selectTheme.push(
    <MenuItem
      value={key}
      selected={key === "default"}
      defaultChecked={key === "default"}
    >
      {eventTheme[key as keyof typeof eventTheme].name}
    </MenuItem>
  );
}
export const NewEvent = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateEvent>({
    defaultValues,
    resolver: yupResolver<TCreateEvent>(schema),
  });
  const [inviteItems, setInviteItems] = useState<React.ReactNode[]>([]);
  const { contacts } = useMeContacts();
  const createEvent = useCreateEvent();

  useEffect(() => {
    const tempItems: React.ReactNode[] = [];
    for (const key in contacts) {
      tempItems.push(<ListSubheader>{contacts[key].name}</ListSubheader>);
      for (const user of contacts[key].users) {
        tempItems.push(
          <MenuItem value={user}>
            <UserNameAndAvatar uid={user} />
          </MenuItem>
        );
      }
    }
    setInviteItems(tempItems);
  }, [contacts]);

  const onSubmit = handleSubmit((values) => createEvent(values));
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
          <Typography variant="h2">Create new event!</Typography>
        </Container>
      </div>
      <Container>
        <form onSubmit={onSubmit}>
          <div
            style={{
              background: "#f6f6f6",
              borderRadius: "10px",
              boxShadow: "0px 0px 55px -10px rgba(0,0,0,0.25)",
              border: "1px solid #fe7f2d",
              marginTop: "50px",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <Stack gap="20px">
              <Typography variant="body2">Info:</Typography>
              <Stack gap="20px" padding="0 20px">
                <div>
                  <Typography variant="body2" fontSize="18px">
                    Event title:
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    {...register("title")}
                    color={!errors.title?.message ? "primary" : "error"}
                    label={errors.title?.message}
                  />
                </div>
                <div>
                  <Typography variant="body2" fontSize="18px">
                    Event desctiption:
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    multiline
                    {...register("description")}
                    color={!errors.description?.message ? "primary" : "error"}
                    label={errors.description?.message}
                  />
                </div>
                <Grid container gap="20px">
                  <Grid item>
                    <Controller
                      control={control}
                      name="startAt"
                      render={({ field }) => (
                        <MobileDateTimePicker
                          {...field}
                          onChange={(date) => field.onChange(date)}
                          label={"Starts at"}
                          minDate={dayjs()}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Controller
                      control={control}
                      name="endAt"
                      rules={{
                        validate: {
                          min: (date, { startAt }) =>
                            date.isAfter(startAt) ||
                            "Please, enter a date after start",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <MobileDateTimePicker
                          {...field}
                          onChange={(date) => field.onChange(date)}
                          label={error?.message || "Ends at"}
                          minDate={dayjs()}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Stack>

              <Typography variant="body2">Invitation</Typography>
              <Stack gap="20px" padding="0 20px">
                <div>
                  <Typography variant="body2" fontSize="18px">
                    Event invitation text:
                  </Typography>
                  <TextField
                    fullWidth
                    variant="standard"
                    multiline
                    {...register("invitationText")}
                    color={!errors.invitationText ? "primary" : "error"}
                    label={errors.invitationText?.message}
                  />
                </div>
                <Grid container gap="20px" height="65px">
                  <Grid item>
                    <TextField
                      label="Theme"
                      {...register("theme")}
                      defaultValue="default"
                      select
                    >
                      {...selectTheme}
                    </TextField>
                  </Grid>
                  <Grid item xs>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="outlined-age-native-simple">
                        {errors.invited?.message || "Invited peoples"}
                      </InputLabel>
                      <Controller
                        control={control}
                        name="invited"
                        rules={{
                          validate: {
                            min: (peoples) =>
                              peoples.length < 1 ||
                              "Invite at least one people",
                          },
                        }}
                        render={({ field }) => {
                          return (
                            <Select
                              multiple
                              label={
                                errors?.invited?.message || "Invited peoples"
                              }
                              fullWidth
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <UserNameAndAvatarChip
                                      key={value}
                                      uid={value}
                                    />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                              {...field}
                            >
                              {...inviteItems}
                            </Select>
                          );
                        }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Stack>
              <Button type="submit">Create</Button>
            </Stack>
          </div>
        </form>
      </Container>
    </div>
  );
};

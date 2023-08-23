import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { UserCredential } from "firebase/auth";
import { forwardRef, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as NavLink } from "react-router-dom";
import * as yup from "yup";
import google from "../assets/logo/google.svg";
import woman from "../assets/woman_1.svg";
import { useAuth } from "../hooks/firebase/useAuth";
import { TAuth } from "../services/Auth";
import { SEmail, SPassword } from "../utils/validatuon";

export type SignInInputs = {
  email: string;
  password: string;
};
const schema = yup.object({
  email: SEmail,
  password: SPassword,
});

export const SignInModal = ({
  open,
  handleClose,
  onSuccess,
}: {
  open: boolean;
  handleClose: () => void;
  onSuccess?: (user?: UserCredential) => void;
}) => {
  const auth = useAuth();
  useEffect(() => {
    if (open && auth && auth.user) {
      handleClose();
      onSuccess && onSuccess();
    }
  }, [open, auth, handleClose, onSuccess]);
  if (!auth) return;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <div
          style={{
            overflow: "hidden",
            backgroundImage: `url("${woman}")`,
            backgroundPosition: "180% 30%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <DialogTitle textAlign="center">{"Sign-in"}</DialogTitle>
          <SignInForm auth={auth} onSuccess={onSuccess} />
          <div style={{ padding: "0 20px" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <hr />
              </Grid>
              <Grid item>or</Grid>
              <Grid item xs>
                <hr />
              </Grid>
            </Grid>
          </div>
          <SignInSocials auth={auth} onSuccess={onSuccess} />
          <DialogContent sx={{ fontSize: "12px", paddingTop: 0 }}>
            Still don't have an account?
            <NavLink to={"/signup"}>Sign-up here!</NavLink>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

const SignInForm = ({
  auth,
  onSuccess,
}: {
  auth: TAuth;
  onSuccess?: (user?: UserCredential) => void;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<SignInInputs>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onClick: SubmitHandler<SignInInputs> = (values) =>
    auth.signInEmailPassword({ ...values }, setError, onSuccess);

  return (
    <form onSubmit={handleSubmit(onClick)}>
      <DialogContent>
        <Stack>
          <TextField
            {...register("email", {
              onChange: () => clearErrors("root"),
              max: 100,
            })}
            label={errors.email?.message || "Email"}
            variant="standard"
            style={{ marginBottom: "10px" }}
            error={!!errors.email}
          ></TextField>
          <TextField
            {...register("password", {
              onChange: () => clearErrors("root"),
              max: 100,
            })}
            label={errors.password?.message || "Password"}
            variant="standard"
            type="password"
            error={!!errors.password}
          ></TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            {errors.root && (
              <DialogContentText color="error" paddingLeft="15px">
                {errors.root.message}
              </DialogContentText>
            )}
          </Grid>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              disabled={
                Object.keys(dirtyFields).length === 0 ||
                Object.keys(errors).length > 0
              }
            >
              Sign-in
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </form>
  );
};
const SignInSocials = ({
  auth,
  onSuccess,
}: {
  auth: TAuth;
  onSuccess?: (user?: UserCredential) => void;
}) => {
  return (
    <DialogContent>
      <Grid container justifyContent="center">
        <Grid item>
          <div onClick={() => auth.signInGooglePopUp(onSuccess)}>
            <img
              src={google}
              style={{ width: "25px", cursor: "pointer" }}
              alt=""
            />
          </div>
        </Grid>
      </Grid>
    </DialogContent>
  );
};
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

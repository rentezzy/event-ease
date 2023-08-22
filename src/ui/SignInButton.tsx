import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInModal } from "./SignInModal";

export const SignInButton = ({
  children,
  to = "asd",
}: {
  children: React.ReactNode;
  to?: string;
}) => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpened(false);
  };
  const handleOpen = () => {
    setOpened(true);
  };
  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <SignInModal
        handleClose={handleClose}
        open={opened}
        onSuccess={() => navigate(to)}
      />
    </div>
  );
};

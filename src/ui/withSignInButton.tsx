import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInModal } from "./SignInModal";

export function withSignInButton(
  Component: React.FC,
  { to = "" }: { to: string }
) {
  return function () {
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
        <div onClick={handleOpen}>
          <Component />
        </div>
        <SignInModal
          handleClose={handleClose}
          open={opened}
          onSuccess={() => navigate(to)}
        />
      </div>
    );
  };
}

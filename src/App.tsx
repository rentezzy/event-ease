import { Button } from "@mui/material";
import { useAuth } from "./hooks/firebase/useAuth";
import { SignInButton } from "./ui/SignInButton";

export function App() {
  const auth = useAuth();
  if (!auth) return <></>;
  return (
    <div>
      <SignInButton to="hello">Lets go</SignInButton>
      <Button onClick={auth.signout}>SignOut</Button>
    </div>
  );
}

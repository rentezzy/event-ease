import { useContext } from "react";
import AuthContext from "../../services/Auth";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

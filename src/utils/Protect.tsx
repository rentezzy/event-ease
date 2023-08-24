import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/firebase/useAuth";

export function Protect({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth || auth.initializing) return null;

  if (!auth.user)
    return <Navigate to="/signup" state={{ from: location }} replace />;

  return children;
}

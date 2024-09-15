import { appRoutes } from "@navigation";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "src/store";

export function AuthGuardProvider({ children }: React.PropsWithChildren) {
  const user = useAppSelector(({ auth }) => auth.currentUser);
  return user ? children : <Navigate replace to={appRoutes.login.path} />;
}

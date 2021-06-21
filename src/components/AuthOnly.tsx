import { ReactNode } from "react";
import { useAppSelector } from "../app/hooks";
import { getAuthStatus } from "../features/auth/authSlice";
import { Redirect, useRouteMatch } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const AuthOnly = (props: Props) => {
  const isAuthenticated = useAppSelector(getAuthStatus);
  const routeMatch = useRouteMatch();

  if (isAuthenticated) return <>{props.children}</>;
  return <Redirect to={"/login?to=" + routeMatch.path} />;
};

export default AuthOnly;

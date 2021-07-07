import { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface Props extends RouteProps {
  children: ReactNode;
  // component:  React.LazyExoticComponent<() => JSX.Element>;
  path: string;
}

const AuthorizedRoute = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Redirect to={"/signin?to=" + props.path} />;
  return <Route {...props}>{props.children}</Route>;
};

export default AuthorizedRoute;

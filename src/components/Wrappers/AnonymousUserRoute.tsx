import { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface Props extends RouteProps {
  children: ReactNode;
  path: string;
}

const AnonymousUserRoute = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <Route {...props}>
      {!isAuthenticated ? props.children : <Redirect to="/" />}
    </Route>
  );
};

export default AnonymousUserRoute;

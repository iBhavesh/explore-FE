import { ReactNode } from "react";
import { Redirect, Route, RouteProps, useRouteMatch } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

interface Props extends RouteProps {
  children: ReactNode;
  path: string;
}

const AuthorizedRoute = (props: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const routeMatch = useRouteMatch();
  return (
    <Route {...props}>
      {isAuthenticated ? (
        props.children
      ) : (
        <Redirect to={"/login?to=" + routeMatch.path} />
      )}
    </Route>
  );
};

export default AuthorizedRoute;

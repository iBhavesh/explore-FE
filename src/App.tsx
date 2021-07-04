import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CircularIndeterminate from "./components/UI/CircularIndeterminate";
import AnonymousUserRoute from "./components/Wrappers/AnonymousUserRoute";
import AuthorizedRoute from "./components/Wrappers/AuthorizedRoute";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const SiginPage = lazy(() => import("./pages/SigninPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotificationPage = lazy(() => import("./pages/NotificationPage"));
const RequestPage = lazy(() => import("./pages/RequestPage"));
const AccountPage = lazy(() => import("./pages/AccountPage"));

function App() {
  return (
    <Layout>
      <Switch>
        <AnonymousUserRoute exact path="/register">
          <Suspense fallback={<CircularIndeterminate />}>
            <RegisterPage />
          </Suspense>
        </AnonymousUserRoute>
        <AnonymousUserRoute exact path="/login">
          <Suspense fallback={<CircularIndeterminate />}>
            <SiginPage />
          </Suspense>
        </AnonymousUserRoute>

        <AuthorizedRoute path="/" exact>
          <Suspense fallback={<CircularIndeterminate />}>
            <HomePage />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/profile">
          <Suspense fallback={<CircularIndeterminate />}>
            <ProfilePage />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/notifications">
          <Suspense fallback={<CircularIndeterminate />}>
            <NotificationPage />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/account">
          <Suspense fallback={<CircularIndeterminate />}>
            <AccountPage />
          </Suspense>
        </AuthorizedRoute>
        <Route exact path="/requests">
          <Suspense fallback={<CircularIndeterminate />}>
            <RequestPage />
          </Suspense>
        </Route>
        <Route path="*">
          <h2>Page doesn't exist</h2>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

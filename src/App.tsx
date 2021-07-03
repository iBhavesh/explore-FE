import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import CircularIndeterminate from "./components/UI/CircularIndeterminate";
import AnonymousUserRoute from "./components/Wrappers/AnonymousUserRoute";
import AuthorizedRoute from "./components/Wrappers/AuthorizedRoute";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App() {
  return (
    <Switch>
      <AnonymousUserRoute exact path="/register">
        <Suspense fallback={<CircularIndeterminate />}>
          <RegisterPage />
        </Suspense>
      </AnonymousUserRoute>
      <AnonymousUserRoute exact path="/login">
        <Suspense fallback={<CircularIndeterminate />}>
          <LoginPage />
        </Suspense>
      </AnonymousUserRoute>
      <Layout>
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
      </Layout>
      <Route path="*">
        <h1>Route doesn't exist</h1>
      </Route>
    </Switch>
  );
}

export default App;

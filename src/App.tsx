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
const SinglePostPage = lazy(() => import("./pages/SinglePostPage"));
const ForgetPasswordPage = lazy(() => import("./pages/ForgetPasswordPage"));
const ChangePassword = lazy(() => import("./pages/ChangePasswordPage"));
const SearchResultPage = lazy(() => import("./pages/SearchResultPage"));

function App() {
  return (
    <Layout>
      <Switch>
        <AnonymousUserRoute exact path="/register">
          <Suspense fallback={<CircularIndeterminate />}>
            <RegisterPage />
          </Suspense>
        </AnonymousUserRoute>
        <AnonymousUserRoute exact path="/signin">
          <Suspense fallback={<CircularIndeterminate />}>
            <SiginPage />
          </Suspense>
        </AnonymousUserRoute>
        <AnonymousUserRoute exact path="/forget-password">
          <Suspense fallback={<CircularIndeterminate />}>
            <ForgetPasswordPage />
          </Suspense>
        </AnonymousUserRoute>
        <AuthorizedRoute path="/" exact>
          <Suspense fallback={<CircularIndeterminate />}>
            <HomePage />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/user/:userId">
          <Suspense fallback={<CircularIndeterminate />}>
            <ProfilePage />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/search">
          <Suspense fallback={<CircularIndeterminate />}>
            <SearchResultPage />
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
        <AuthorizedRoute exact path="/account/change-password">
          <Suspense fallback={<CircularIndeterminate />}>
            <ChangePassword />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/requests">
          <Suspense fallback={<CircularIndeterminate />}>
            <RequestPage />
          </Suspense>
        </AuthorizedRoute>
        <AuthorizedRoute exact path="/posts/:postId">
          <Suspense fallback={<CircularIndeterminate />}>
            <SinglePostPage />
          </Suspense>
        </AuthorizedRoute>
        <Route path="*">
          <h2>Page doesn't exist</h2>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

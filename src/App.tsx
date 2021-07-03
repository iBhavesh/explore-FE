import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthOnly from "./components/AuthOnly";
import CircularIndeterminate from "./components/UI/CircularIndeterminate";

const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <AuthOnly>
          <h1>Home</h1>
        </AuthOnly>
      </Route>
      <Route exact path="/register">
        <Suspense fallback={<CircularIndeterminate />}>
          <RegisterPage />
        </Suspense>
      </Route>
      <Route exact path="/login">
        <Suspense fallback={<CircularIndeterminate />}>
          <LoginPage />
        </Suspense>
      </Route>
      <Route path="/profile">
        <AuthOnly>Hello</AuthOnly>
      </Route>
      <Route path="*">
        <h1>Route doesn't exist</h1>
      </Route>
    </Switch>
  );
}

export default App;

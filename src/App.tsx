import { Switch, Route } from "react-router-dom";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import AuthOnly from "./components/AuthOnly";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <AuthOnly>
          <h1>Home</h1>
        </AuthOnly>
      </Route>
      <Route exact path="/login">
        <RegisterPage />
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

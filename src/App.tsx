import { Switch, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import AuthOnly from "./components/AuthOnly";
import ImageForm from "./ImageForm";

function App() {
  return (
    <Switch>
      <Route path="/upload">
        <ImageForm />
      </Route>
      <Route path="/" exact>
        <AuthOnly>
          <h1>Home</h1>
        </AuthOnly>
      </Route>
      <Route exact path="/login">
        <AuthPage />
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

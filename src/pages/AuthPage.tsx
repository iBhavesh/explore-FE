import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";

const AuthPage = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const to = useQuery().get("to");
  const history = useHistory();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(login({ authToken: "auth", refreshToken: "refresh" }));
  }, [dispatch]);

  const submitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    if (to) history.push(to);
  };
  return (
    <form onSubmit={submitHandler} method="post">
      <h1>Auth Page</h1>
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthPage;

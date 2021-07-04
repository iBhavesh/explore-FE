import { Link } from "@material-ui/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const handleSignout = () => {
    dispatch(logout());
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Explore | Account</title>
      </Helmet>
      <div>
        <h2>Hello there! Welcome to account page.</h2>
        <Link
          style={{ cursor: "pointer" }}
          variant="h5"
          underline="none"
          onClick={handleSignout}
        >
          Sign out
        </Link>
      </div>
    </HelmetProvider>
  );
};

export default AccountPage;

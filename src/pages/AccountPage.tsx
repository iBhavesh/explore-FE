import { Link } from "@material-ui/core";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const handleSignout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    document.title = "Explore | Account";
  }, []);

  return (
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
  );
};

export default AccountPage;

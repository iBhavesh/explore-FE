import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import PasswordResetForm from "../components/ForgetPassword/PasswordResetForm";
import TokenGenerationForm from "../components/ForgetPassword/TokenGenerationForm";

const useStyles = makeStyles((theme) => ({
  heading: {
    width: "100%",
    backgroundColor: "black",
    color: "white",
    padding: theme.spacing(2),
    fontFamily: "Eagle Lake",
    fontSize: "2.2rem",
    position: "absolute",
    top: 0,
    left: 0,
  },
}));

const ForgetPasswordPage = () => {
  const classes = useStyles();
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleNext = () => {
    setShowPasswordForm(true);
  };
  return (
    <>
      <Link
        component={RouterLink}
        to="/signin"
        className={classes.heading}
        variant="h5"
      >
        Explore
      </Link>
      {showPasswordForm ? (
        <PasswordResetForm />
      ) : (
        <TokenGenerationForm showPasswordForm={handleNext} />
      )}
    </>
  );
};

export default ForgetPasswordPage;

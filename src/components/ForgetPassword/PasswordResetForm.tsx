import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import axios from "axios";
import { useState } from "react";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={3} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  pageWrapper: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    borderRadius: "0.5rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: "24px",
    paddingTop: "15px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    margin: theme.spacing(3, "auto"),
    maxWidth: "40px",
  },
}));

const date = new Date();
date.setFullYear(date.getFullYear() - 13);

const initialValues = {
  password: "",
  confirm_password: "",
  reset_token: "",
};

const validationSchema = Yup.object({
  reset_token: Yup.string().required("ResetToken is required is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password should be minimim 8 characters"),
  confirm_password: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const PasswordResetForm = () => {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSnackBarClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleSnackBarClose}
        autoHideDuration={3000}
      >
        <Alert icon={false} severity="error" onClose={handleSnackBarClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.pageWrapper}>
          <Typography
            style={{ fontWeight: 500, marginLeft: 8, marginTop: 8 }}
            variant="h5"
          >
            Reset Password
          </Typography>
          <Divider />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await axios.put(
                  process.env.REACT_APP_API + "user/reset/password",
                  values
                );
                history.push("/signin");
              } catch (e) {
                let message = "Something went wrong!";
                if (typeof e.response.data == "object")
                  for (const key in e.response.data) {
                    message = e.response.data[key] + "\n";
                  }
                setErrorMessage(message);
                setOpen(true);
              }
              setSubmitting(false);
            }}
          >
            {({ submitForm, isSubmitting, touched, errors }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      id="reset_token"
                      label="Reset Token"
                      name="reset_token"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      type="password"
                      id="password"
                      label="Password"
                      name="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      variant="outlined"
                      fullWidth
                      type="password"
                      id="confirm_password"
                      label="Confirm Password"
                      name="confirm_password"
                    />
                  </Grid>
                </Grid>
                {isSubmitting ? (
                  <div className={classes.progress}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Reset
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Container>
  );
};

export default PasswordResetForm;
